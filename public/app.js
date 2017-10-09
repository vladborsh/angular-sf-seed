import angular     from 'angular';
import ngAnimate   from 'angular-animate';
import ngBootstrap from 'angular-ui-bootstrap';
import ngCookies   from 'angular-cookies';
import uiRouter    from 'angular-ui-router';
import Components  from './components';
import Commons  from './commons';


angular.module('App', [
  ngAnimate, 
  ngBootstrap, 
  ngCookies,
  uiRouter,
  Components,
  Commons
])