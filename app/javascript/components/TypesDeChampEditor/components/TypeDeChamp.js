import React from 'react';
import PropTypes from 'prop-types';
import { sortableElement, sortableHandle } from 'react-sortable-hoc';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DescriptionInput from './DescriptionInput';
import LibelleInput from './LibelleInput';
import MandatoryInput from './MandatoryInput';
import MoveButton from './MoveButton';
import TypeDeChampCarteOption from './TypeDeChampCarteOption';
import TypeDeChampCarteOptions from './TypeDeChampCarteOptions';
import TypeDeChampDropDownOptions from './TypeDeChampDropDownOptions';
import TypeDeChampPieceJustificative from './TypeDeChampPieceJustificative';
import TypeDeChampRepetitionOptions from './TypeDeChampRepetitionOptions';
import TypeDeChampTypesSelect from './TypeDeChampTypesSelect';
import TypeDeChampApisOptions from './TypeDeChampApisOptions';
import TypeDeChampApisCheckboxes from './TypeDeChampApisCheckboxes';
import TypeDeChampTextLimitation from './TypeDeChampTextLimitation';
import TypeDeChampTexteareaLimitation from './TypeDeChampTexteareaLimitation';
import TypeDeChampCondition from './TypeDeChampCondition';
import TypeDeChampDateTime from './TypeDeChampDateTime';
import TypeDeChampRepetitionNombreLigne from './TypeDeChampRepetitionNombreLigne';
import TypeDeChampRepetitionLibelleLigne from './TypeDeChampRepetitionLibelleLigne';

const TypeDeChamp = sortableElement(
  ({ typeDeChamp, dispatch, idx: index, isFirstItem, isLastItem, state }) => {
    const isDropDown = [
      'drop_down_list',
      'multiple_drop_down_list',
      'linked_drop_down_list'
    ].includes(typeDeChamp.type_champ);
    const isFile = typeDeChamp.type_champ === 'piece_justificative';
    const isCarte = typeDeChamp.type_champ === 'carte';
    const isExplication = typeDeChamp.type_champ === 'explication';
    const isHeaderSection = typeDeChamp.type_champ === 'header_section';
    const isTitreIdentite = typeDeChamp.type_champ === 'titre_identite';
    const isRepetition = typeDeChamp.type_champ === 'repetition';
    const isApi = typeDeChamp.type_champ === 'apis';
    const isLimitationText = typeDeChamp.type_champ === 'text_limitation';
    const isLimitationTextarea =
      typeDeChamp.type_champ === 'textarea_limitation';
    const isConditionChamp = typeDeChamp.type_champ === 'condition_champ';
    const isDateTimeDefaultValue = typeDeChamp.type_champ === 'datetime';
    const canBeMandatory =
      !isHeaderSection && !isExplication && !state.isAnnotation;

    const [ref, inView] = useInView({
      threshold: 0.6
    });

    const updateHandlers = createUpdateHandlers(
      dispatch,
      typeDeChamp,
      index,
      state.prefix
    );

    const typeDeChampsTypesForRepetition = state.typeDeChampsTypes.filter(
      ([, type]) => !EXCLUDE_FROM_REPETITION.includes(type)
    );

    const typeDeChampsTypesForCondition = state.typeDeChampsTypes.filter(
      ([, type]) => !EXCLUDE_FROM_CONDITION.includes(type)
    );

    return (
      <div
        ref={ref}
        data-index={index}
        data-in-view={inView ? true : undefined}
        data-repetition={isRepetition ? true : undefined}
        data-condition={isConditionChamp ? true : undefined}
        className={`type-de-champ form flex column justify-start ${
          isHeaderSection ? 'type-header-section' : ''
        }`}
      >
        <div
          className={`flex justify-start section head ${
            !isHeaderSection ? 'hr' : ''
          }`}
        >
          <DragHandle />
          <TypeDeChampTypesSelect
            handler={updateHandlers.type_champ}
            options={state.typeDeChampsTypes}
          />
          <div className="flex justify-start delete">
            <button
              className="button small icon-only danger"
              onClick={() => {
                if (confirm('Êtes vous sûr de vouloir supprimer ce champ ?'))
                  dispatch({
                    type: 'removeTypeDeChamp',
                    params: { typeDeChamp }
                  });
              }}
            >
              <FontAwesomeIcon icon="trash" title="Supprimer" />
            </button>
          </div>
        </div>
        <div
          className={`flex justify-start section ${
            isDropDown || isFile || isCarte ? 'hr' : ''
          }`}
        >
          <div className="flex column justify-start">
            <MoveButton
              isEnabled={!isFirstItem}
              icon="arrow-up"
              title="Déplacer le champ vers le haut"
              onClick={() =>
                dispatch({
                  type: 'moveTypeDeChampUp',
                  params: { typeDeChamp }
                })
              }
            />
            <MoveButton
              isEnabled={!isLastItem}
              icon="arrow-down"
              title="Déplacer le champ vers le bas"
              onClick={() =>
                dispatch({
                  type: 'moveTypeDeChampDown',
                  params: { typeDeChamp }
                })
              }
            />
          </div>
          <div className="flex column justify-start">
            <LibelleInput handler={updateHandlers.libelle} isVisible={true} />
            <MandatoryInput
              handler={updateHandlers.mandatory}
              isVisible={canBeMandatory}
            />
          </div>
          <div className="flex justify-start">
            <DescriptionInput
              isVisible={!isHeaderSection && !isTitreIdentite}
              handler={updateHandlers.description}
            />
          </div>
        </div>
        <div className="flex justify-start section shift-left">
          <TypeDeChampDropDownOptions
            isVisible={isDropDown}
            handler={updateHandlers.drop_down_list_value}
          />
          <TypeDeChampPieceJustificative
            isVisible={isFile}
            directUploadUrl={state.directUploadUrl}
            filename={typeDeChamp.piece_justificative_template_filename}
            handler={updateHandlers.piece_justificative_template}
            url={typeDeChamp.piece_justificative_template_url}
          />
          <TypeDeChampCarteOptions isVisible={isCarte}>
            <TypeDeChampCarteOption
              label="Cadastres"
              handler={updateHandlers.cadastres}
            />
          </TypeDeChampCarteOptions>
          <TypeDeChampRepetitionOptions
            isVisible={isRepetition}
            state={{
              ...state,
              typeDeChampsTypes: typeDeChampsTypesForRepetition,
              prefix: `repetition-${index}`,
              typeDeChamps: typeDeChamp.types_de_champ || []
            }}
            typeDeChamp={typeDeChamp}
          />
          <TypeDeChampRepetitionNombreLigne
            isVisible={isRepetition}
            handler={updateHandlers.nombre_ligne}
          />
          <TypeDeChampRepetitionLibelleLigne
            isVisible={isRepetition}
            handler={updateHandlers.libelle_ligne}
          />
          <TypeDeChampApisOptions
            isVisible={isApi}
            handler={updateHandlers.api_name}
            listApis={state.listeApisData}
          />
          <TypeDeChampApisCheckboxes
            isVisible={isApi}
            handler={updateHandlers.api_checkbox}
            listApis={state.listeApisData}
            api_name={updateHandlers.api_name}
            listChecked={state.data_checked}
          />
          <TypeDeChampTextLimitation
            isVisible={isLimitationText}
            handler={updateHandlers.limitation}
          />
          <TypeDeChampTexteareaLimitation
            isVisible={isLimitationTextarea}
            handler={updateHandlers.limitation}
          />
          <TypeDeChampCondition
            isVisible={isConditionChamp}
            state={{
              ...state,
              typeDeChampsTypes: typeDeChampsTypesForCondition,
              prefix: `condition-${index}`,
              typeDeChamps: typeDeChamp.types_de_champ || []
            }}
            typeDeChamp={typeDeChamp}
          />
          <TypeDeChampDateTime
            isVisible={isDateTimeDefaultValue}
            handler={updateHandlers.check_default_value}
          />
        </div>
      </div>
    );
  }
);

TypeDeChamp.propTypes = {
  dispatch: PropTypes.func,
  idx: PropTypes.number,
  isFirstItem: PropTypes.bool,
  isLastItem: PropTypes.bool,
  state: PropTypes.object,
  typeDeChamp: PropTypes.object
};

const DragHandle = sortableHandle(() => (
  <div
    className="handle small icon-only icon move-handle"
    title="Déplacer le champ vers le haut ou vers le bas"
  />
));

function createUpdateHandler(dispatch, typeDeChamp, field, index, prefix) {
  return {
    id: `${prefix ? `${prefix}-` : ''}champ-${index}-${field}`,
    name: field,
    value: typeDeChamp[field],
    onChange: ({ target }) =>
      dispatch({
        type: 'updateTypeDeChamp',
        params: {
          typeDeChamp,
          field,
          value: readValue(target)
        },
        done: () => dispatch({ type: 'refresh' })
      })
  };
}

function createUpdateHandlers(dispatch, typeDeChamp, index, prefix) {
  return FIELDS.reduce((handlers, field) => {
    handlers[field] = createUpdateHandler(
      dispatch,
      typeDeChamp,
      field,
      index,
      prefix
    );
    return handlers;
  }, {});
}

export const FIELDS = [
  'apis',
  'api_name',
  'cadastres',
  'mnhn',
  'api_checkbox',
  'description',
  'drop_down_list_value',
  'libelle',
  'mandatory',
  'parcelles_agricoles',
  'parent_id',
  'piece_justificative_template',
  'private',
  'quartiers_prioritaires',
  'type_champ',
  'limitation',
  'check_default_value',
  'nombre_ligne',
  'libelle_ligne'
];

function readValue(input) {
  return input.type === 'checkbox' && input.name != 'api_checkbox'
    ? input.checked
    : input.value;
}

const EXCLUDE_FROM_REPETITION = [
  'carte',
  'dossier_link',
  'repetition',
  'siret',
  'condition_champ'
];

const EXCLUDE_FROM_CONDITION = [
  'carte',
  'dossier_link',
  'repetition',
  'siret',
  'condition_champ'
];

export default TypeDeChamp;
