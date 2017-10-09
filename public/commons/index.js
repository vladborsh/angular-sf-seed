/**
 * Commons exporter
 */
import angular from 'angular';
import SfService from './sf.service';

let componentsModule = angular.module('App.Commons', []).name;

angular.module('App.Commons')
  .service('SfService', SfService)


export default componentsModule;