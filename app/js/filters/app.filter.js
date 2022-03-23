(function () {
  'use strict';

  angular.module('app')
    .filter('datahora', DataHora)
    .filter('vazio', Vazio);

  function DataHora() {
    return function (input) {
      if (!input) {
        return '---';
      };

      var data = input.substr(8, 2) + '/' + input.substr(5, 2) + '/' + input.substr(0, 4);
      var hora = input.substr(11, 5);

      return '' + data + ' ' + hora + '';
    };
  };

  function Vazio() {
    return function (empty) {
      if (empty) {
        return empty;
      } else {
        return '---';
      };
    };
  };

})();