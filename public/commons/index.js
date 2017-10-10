/**
 * Commons exporter
 */
import angular from 'angular';
import SfService from './sf.service';
import GeneralFactory from './general.factory'

let componentsModule = angular.module('App.Commons', [])
  .service('SfService', SfService)
  .factory('GeneralFactory', GeneralFactory)
  .name;

export default componentsModule;