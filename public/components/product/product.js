import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ProductComponent from './product.component';

let ProductModule = angular.module('product', [
  uiRouter
])
.component('product', ProductComponent)
.name;

export default ProductModule;