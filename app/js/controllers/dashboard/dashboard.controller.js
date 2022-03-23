(function () {
  'use strict';

  angular.module('app')
    .controller('dashboard.listar', listarController)

  listarController.$inject = ['transacao', '$filter'];

  function listarController(transacao, $filter) {
    const vm = this;

    vm.carregando = true;

    vm.graficoValores = {
      label: [],
      series: ["Valor Bruto", "Valor Líquido"],
      data: [[], []]
    };

    vm.totalBruto = 0;
    vm.totalLiquido = 0;

    vm.graficoCanal = {
      label: [],
      data: []
    };

    vm.buscar = buscar();

    function buscar() {
      transacao.buscar().then(function (response) {
        vm.data = response.data.items;
        return carregarGraficoCanal();
      }).then(function () {
        return carregarGraficoValores();
      }).then(function () {
        vm.carregando = false;
      }).catch(function (error) {
        console.warn(error);
      });
    };

    function carregarGraficoValores() {
      angular.forEach(vm.data, function (value, index) {
        vm.graficoValores.label.push(value.truncatedCardNumber);
        vm.graficoValores.data[0].push(value.grossAmount);
        vm.totalBruto += value.grossAmount;
        vm.graficoValores.data[1].push(value.netAmount);
        vm.totalLiquido += value.netAmount;
      });
    };

    function carregarGraficoCanal() {
      angular.forEach(vm.data, function (value, index) {
        var buscarItem = ($filter('filter')(vm.graficoCanal.label, value.channel, true)[0]);
        if (buscarItem) {
          vm.graficoCanal.data[vm.graficoCanal.label.indexOf(buscarItem)] += 1;
        } else {
          vm.graficoCanal.label.push(value.channel);
          vm.graficoCanal.data.push(1);
        }
      });
    };

  };

})();