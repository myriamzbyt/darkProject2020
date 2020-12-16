import $ from 'jquery';
import 'select2';
import { isNumeric } from '@utils';

const { api_geo_url, api_adresse_url } = gon.autocomplete || {};

const language = {
  errorLoading: function () {
    return 'Les résultats ne peuvent pas être chargés.';
  },
  inputTooLong: function (args) {
    var overChars = args.input.length - args.maximum;

    return 'Supprimez ' + overChars + ' caractère' + (overChars > 1 ? 's' : '');
  },
  inputTooShort: function (args) {
    var remainingChars = args.minimum - args.input.length;

    return (
      'Saisissez au moins ' +
      remainingChars +
      ' caractère' +
      (remainingChars > 1 ? 's' : '')
    );
  },
  loadingMore: function () {
    return 'Chargement de résultats supplémentaires…';
  },
  maximumSelected: function (args) {
    return (
      'Vous pouvez seulement sélectionner ' +
      args.maximum +
      ' élément' +
      (args.maximum > 1 ? 's' : '')
    );
  },
  noResults: function () {
    return 'Aucun résultat trouvé';
  },
  searching: function () {
    return 'Recherche en cours…';
  },
  removeAllItems: function () {
    return 'Supprimer tous les éléments';
  }
};

const baseOptions = {
  language,
  width: '100%'
};

const baseAjaxOptions = {
  delay: 250,
  timeout: 10 * 1000, // 10 sec
  cache: true,
  data({ term: nom }) {
    return {
      nom,
      fields: 'nom,code'
    };
  },
  processResults(data) {
    return {
      results: data.map(({ nom }) => ({ id: nom, text: nom }))
    };
  }
};

const regionsOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `${api_geo_url}/regions`, ...baseAjaxOptions }
};

const communesOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `${api_geo_url}/communes`, ...baseAjaxOptions }
};

const etranger99 = { id: '99 - Étranger', text: '99 - Étranger' };
const departementsOptions = {
  ...baseOptions,
  minimumInputLength: 1,
  ajax: {
    ...baseAjaxOptions,
    url: `${api_geo_url}/departements`,
    data({ term }) {
      const data = { fields: 'nom,code' };

      if (isNumeric(term)) {
        data.code = term.trim().padStart(2, '0');
      } else {
        data.nom = term;
      }

      return data;
    },
    processResults(data) {
      return {
        results: data
          .map(({ nom, code }) => ({
            id: `${code} - ${nom}`,
            text: `${code} - ${nom}`
          }))
          .concat([etranger99])
      };
    }
  }
};

const adresseOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: {
    ...baseAjaxOptions,
    url: `${api_adresse_url}/search`,
    data({ term: q }) {
      return {
        q,
        limit: 5
      };
    },
    processResults(data) {
      let r = data.features.map(({ properties: { label }, geometry }) => ({
        id: label,
        text: label,
        geometry
      }));
      // Allow the user to select an arbitrary address missing from the results,
      // by adding the plain-text query to the list of results.
      r.unshift({ id: data.query, text: data.query });
      return {
        results: r
      };
    }
  }
};

const templateOption = ({ text }) =>
  $(
    `<span class="custom-select2-option"><span class="icon person"></span>${text}</span>`
  );

const champ_apis_organismeOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `/ds_minarm/api/apis/organisme`, ...baseAjaxOptions }
};

const champ_apis_siteOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `/ds_minarm/api/apis/site`, ...baseAjaxOptions }
};

const champ_apis_activites_icpeOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `/ds_minarm/api/apis/activites_icpe`, ...baseAjaxOptions }
};

const champ_apis_installation_icpeOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `/ds_minarm/api/apis/installation_icpe`, ...baseAjaxOptions }
};

const champ_apis_site_icpeOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: { url: `/ds_minarm/api/apis/site_icpe`, ...baseAjaxOptions }
};

const champ_apis_structure_organisationnelle_permanenteOptions = {
  ...baseOptions,
  minimumInputLength: 2,
  ajax: {
    url: `/ds_minarm/api/apis/structure_organisationnelle_permanente`,
    ...baseAjaxOptions
  }
};

const valideurs_annudefOptions = {
  ...baseOptions,
  minimumInputLength: 6,
  ajax: {
    url: `/ds_minarm/api/search/annudef`,
    data({ term: mail }) {
      return {
        mail
      };
    },
    processResults(data) {
      return {
        results: data.map(({ email }) => ({ id: email, text: email }))
      };
    }
  }
};

addEventListener('ds:page:update', () => {
  $('select.select2').select2(baseOptions);
  $('select.select2.departements').select2(departementsOptions);
  $('select.select2.regions').select2(regionsOptions);
  $('select.select2.communes').select2(communesOptions);
  $('select.select2.adresse').select2(adresseOptions);
  $('select.select2.champ_apis_organisme').select2(champ_apis_organismeOptions);
  $('select.select2.champ_apis_site').select2(champ_apis_siteOptions);
  $('select.select2.champ_apis_activites_icpe').select2(
    champ_apis_activites_icpeOptions
  );
  $('select.select2.champ_apis_installation_icpe').select2(
    champ_apis_installation_icpeOptions
  );
  $('select.select2.champ_apis_site_icpe').select2(champ_apis_site_icpeOptions);
  $('select.select2.champ_apis_structure_organisationnelle_permanente').select2(
    champ_apis_structure_organisationnelle_permanenteOptions
  );
  $('select.select2.annudef').select2(valideurs_annudefOptions);

  $('.columns-form select.select2-limited').select2({
    language,
    width: '300px',
    placeholder: 'Sélectionnez des colonnes',
    maximumSelectionLength: '10'
  });

  $('.recipients-form select.select2-limited').select2({
    language,
    width: '300px',
    placeholder: 'Sélectionnez des instructeurs',
    maximumSelectionLength: '30'
  });

  $('.recipients-form select.select2-limited-pre_instructeur').select2({
    language,
    width: '300px',
    placeholder: 'Sélectionnez des pre instructeurs',
    maximumSelectionLength: '30'
  });

  $('select.select2-limited.select-instructeurs').select2({
    language,
    dropdownParent: $('.instructeur-wrapper'),
    placeholder: 'Saisir l’adresse email de l’instructeur',
    tags: true,
    tokenSeparators: [',', ' '],
    templateResult: templateOption,
    templateSelection: templateOption
  });
});
