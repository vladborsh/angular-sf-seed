/**
 * Commons exporter
 */
import angular from 'angular';
import SfService from './sf.service';

let componentsModule = angular.module('App.Commons');

componentsModule
  .service('SfService', SfService)


export default componentsModule;