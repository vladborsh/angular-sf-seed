import angular from 'angular';
import uiRouter from 'angular-ui-router';
import <%= upName %>Component from './<%= name %>.component';

let <%= upName %>Module = angular.module('<%= name %>', [
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
.component('<%= name %>', <%= upName %>Component)
.name;

export default <%= upName %>Module;