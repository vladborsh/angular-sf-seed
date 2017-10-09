import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= upCaseName %>Component from './<%= name %>.component';

let <%= upCaseName %>Module = angular.module('<%= name %>', [
  uiRouter
])
.config(
  ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('<%= name %>', {
      url: '/',
      component: '<%= name %>'
    });
  }
)
.component('<%= name %>', <%= upCaseName %>Component)
.name;

export default <%= upCaseName %>Module;