(function () {
  'use strict';

  angular.module('app')
    .service('transacao', transacaoService);

  transacaoService.$inject = ['$http'];

  function transacaoService($http) {
    this.buscar = buscar;

    function buscar() {
      return $http.get('app/data/lancamento-conta-legado.json').then(function (response) {
        return response;
      }).catch(function (error) {
        return error;
      });
    };

  };

})();