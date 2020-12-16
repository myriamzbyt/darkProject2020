import $ from 'jquery';

export function changeTypeAvisListe(
  event,
  listeTypeAvis,
  listeNiveauxInstruction,
  indexAvis,
  indexNiveauDeuxInstruction
) {
  var indexCourantNiveau = listeNiveauxInstruction.indexOf(event.target.value);
  var selectTypeAvis = document.getElementById('procedure_avis_type_id');

  for (var i in selectTypeAvis.options) {
    if ('undefined' !== typeof selectTypeAvis.options[i].text) {
      selectTypeAvis.options[i].text = listeTypeAvis[indexCourantNiveau][i];
      selectTypeAvis.options[i].value = listeTypeAvis[indexCourantNiveau][i];
    }
  }
  var niveauValidation = document.getElementById('procedure_niveau_validation')
    .parentElement;
  if (
    selectTypeAvis.value === listeTypeAvis[0][indexAvis] ||
    selectTypeAvis.value === listeTypeAvis[1][indexAvis]
  ) {
    niveauValidation.style.display = 'block';
  } else {
    niveauValidation.style.display = 'none';
  }

  //activation ou désactivation de la liste des choix pour la variable "Demarche déclarative"
  var niveauInstructionSelected = document.getElementById(
    'procedure_niveau_instruction'
  ).value;
  var demarcheDeclarativeList = document.getElementById(
    'procedure_declarative_with_state'
  );

  if (
    niveauInstructionSelected ===
    listeNiveauxInstruction[indexNiveauDeuxInstruction]
  ) {
    //demarcheDeclarativeList.style.display = 'none';
    `${$(demarcheDeclarativeList).prop('disabled', true)}`;
  } else {
    //demarcheDeclarativeList.style.display = 'block';
    `${$(demarcheDeclarativeList).prop('disabled', false)}`;
  }
}

export function changeNiveauValidationListe(event, listeTypeAvis, indexAvis) {
  var isAvis =
    listeTypeAvis[0][indexAvis] === event.target.value ||
    listeTypeAvis[1][indexAvis] === event.target.value;
  var niveauValidation = document.getElementById('procedure_niveau_validation')
    .parentElement;

  if (isAvis) {
    niveauValidation.style.display = 'block';
  } else {
    niveauValidation.style.display = 'none';
  }
}
