/**
 * Components exporter
 */
import Contact from './contact/contact';
import angular from 'angular';

let componentsModule = angular.module('App.Components', [
 Contact ,
]).name;

export default componentsModule;