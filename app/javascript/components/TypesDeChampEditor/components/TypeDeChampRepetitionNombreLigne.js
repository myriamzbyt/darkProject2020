import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from '../utils';

function TypeDeChampRepetitionNombreLigne({ isVisible, handler }) {
  var nombreligne = ['--', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  if (isVisible) {
    return (
      <div className="cell libelle">
        <SortableContainer>
          <label>Nombre de ligne</label>
          <select
            id={handler.id}
            name={handler.name}
            onChange={handler.onChange}
            value={handler.value}
            className="small-margin small"
          >
            {nombreligne.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </SortableContainer>
      </div>
    );
  }
  return null;
}

TypeDeChampRepetitionNombreLigne.propTypes = {
  isVisible: PropTypes.bool,
  handler: PropTypes.object
};
export default TypeDeChampRepetitionNombreLigne;
