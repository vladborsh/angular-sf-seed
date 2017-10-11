/**
 * Components exporter
 */
import Contact from './contact/contact';
import Product from './product/product';
import angular from 'angular';

let componentsModule = angular.module('App.Components', [
 Contact ,
 Product ,
]).name;

export default componentsModule;