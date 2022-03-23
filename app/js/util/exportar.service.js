(function () {
  'use strict';

  angular.module('app')
    .service('exportar', ExportarService);

  ExportarService.$inject = [];

  function ExportarService() {
    var padrao = `
    <html><head>
    <link rel="stylesheet" href="app/css/screen.css">
    </head><body onload="window.print()">
    `;

    this.pdf = pdf;

    function pdf(elemento) {
      let innerContents = document.getElementById(elemento).innerHTML;
      let popupWinindow = window.open('', '_blank', 'width=615,height=842,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write(padrao + innerContents + '</body></html>');
      popupWinindow.document.close();
    };

  };

})();