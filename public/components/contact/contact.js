import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactComponent from './contact.component';

let ContactModule = angular.module('contact', [
  uiRouter
])
.component('contact', ContactComponent)
.name;

export default ContactModule;