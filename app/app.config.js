
Config.$inject = ['$stateProvider', '$urlRouterProvider']

function Config($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('banana', {
    url: '/',
    views: {
      "main": {
        templateUrl: "Banana.html",
        controller: 'BananaCtrl',
        controllerAs: 'vm'
      }
    }            
  })
  /* other states */
  $urlRouterProvider.otherwise('/');
};

angular.module('App').config(Config);