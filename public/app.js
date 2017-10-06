import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngBootstrap from 'angular-ui-bootstrap';
import ngCookies from 'angular-cookies';
import uiRouter from 'angular-ui-router';
import Config from './app.config';
import Components from './components';


angular.module('App', [
  ngAnimate, 
  ngBootstrap, 
  ngCookies,
  uiRouter
]).config( Config )