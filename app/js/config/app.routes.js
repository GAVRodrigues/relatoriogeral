(function () {
  "use strict";

  angular.module("app")
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
      function ($stateProvider, $urlRouterProvider, $locationProvider) {
        const path = "app/view/";

        $urlRouterProvider.otherwise("/");
        $locationProvider.hashPrefix('');

        $stateProvider
          .state('app', {
            abstract: true,
            templateUrl: path + 'layout/full.html',
          })
          .state('app.dashboard', {
            url: '/',
            templateUrl: path + 'dashboard/listar.html',
            controller: 'dashboard.listar',
            controllerAs: 'vm',
          })
          .state('app.relatorio', {
            url: '/relatorio',
            templateUrl: path + 'relatorio/listar.html',
            controller: 'relatorio.listar',
            controllerAs: 'vm',
          });
      }]);
})();
