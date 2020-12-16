import $ from 'jquery';
import 'moment';
import 'daterangepicker';

('use·strict');

$(document).on('DOMContentLoaded', function () {
  $('[data-behavior=daterangepicker]').daterangepicker({
    locale: {
      format: 'DD/MM/YYYY',
      separator: ' - ',
      applyLabel: 'Valider',
      cancelLabel: 'Annuler',
      fromLabel: 'De',
      toLabel: 'à',
      customRangeLabel: 'Custom',
      daysOfWeek: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ],
      firstDay: 1
    },
    cancelLabel: 'Clear'
  });

  $('[data-behavior=daterangepicker]').on(
    'cancel.daterangepicker',
    function () {
      $(this).val(' ');
    }
  );
});
