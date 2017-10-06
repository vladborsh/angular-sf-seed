Config.$inject = ['$stateProvider', '$urlRouterProvider']

function Config($stateProvider, $urlRouterProvider) {

  // $stateProvider
  // .state('banana', {
  //   url: '/banana',
  //   views: {
  //     "main": {
  //       templateUrl: "Banana.html",
  //       controller: 'BananaCtrl',
  //       controllerAs: 'vm'
  //     }
  //   }            
  // })
  // .state('opportunity', {
  //   url: '/opportunities',
  //   views: {
  //     "main": {
  //       templateUrl: "Opportunity.html",
  //       controller: 'OpportunityCtrl',
  //       controllerAs: 'vm'
  //     }
  //   }            
  // })
  // $urlRouterProvider.otherwise('/banana');
};

export default Config;