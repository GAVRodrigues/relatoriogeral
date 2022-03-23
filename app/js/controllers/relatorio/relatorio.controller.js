(function () {
  'use strict';

  angular.module('app')
    .controller('relatorio.listar', listarController)
    .controller('relatorio.detalhes', detalhesController);

  listarController.$inject = ['transacao', '$uibModal'];
  detalhesController.$inject = ['item', '$uibModalInstance', 'exportar'];

  function listarController(transacao, $uibModal) {
    const vm = this;

    vm.carregando = true;

    vm.buscar = buscar();
    vm.detalhes = detalhes;

    function buscar() {
      transacao.buscar().then(function (response) {
        vm.data = angular.copy(response.data);
        vm.carregando = false;
      }).catch(function (error) {
        console.warn(error);
      });
    };

    function detalhes(item) {
      vm.modalInstance = $uibModal.open({
        templateUrl: 'app/view/relatorio/detalhes.html',
        controller: 'relatorio.detalhes',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          item: function () {
            return item;
          }
        }
      });
      vm.modalInstance.result.then(function () { }, function (response) { });
    };

  };

  function detalhesController(item, $uibModalInstance, exportar) {
    const vm = this;

    vm.item = angular.copy(item);

    vm.fechar = fechar;
    vm.imprimir = imprimir;

    function fechar() {
      $uibModalInstance.close();
    };

    function imprimir(item) {
      exportar.pdf(item);
      fechar();
    };
  };

})();