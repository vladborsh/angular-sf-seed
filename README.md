# AngularJS starter for Salesforce

This project is easy to use a starter for scalable Angular 1.x application and ready to run in the Salesforce environment.

## Description

Starter provides scalable component-based AngularJS project structure and the [best practice](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) in directory organization for Angular. It supports ES6 standards and consumes components as classes. Starter uses Webpack as bundler and Gulp as task runner. 

## Features

* [ES6](http://es6-features.org/#Constants) standards and component based ready to use structure
* [SASS](http://sass-lang.com/) suport
* Templates placed near with controllers (no need to create Visualforce component and follow VF marchap requirements)
* Configured build ([Webpack](https://webpack.js.org/configuration/)) and test system ([Karma](https://karma-runner.github.io/1.0/intro/configuration.html), [Jasmine](https://github.com/jasmine/jasmine/wiki))
* Component generation
* Single command deploy to any Salesforce environment
* [UI-Router](https://github.com/angular-ui/ui-router/wiki)

## Getting started

### Structure

We use component-based approach for scaling and separating by concerns. Domain related components by default placed in `public/components` folder.  Visualforce remoting wrapper is in `public//commons` folder. Ideally, the whole application should be a tree of components that implement clearly defined inputs and outputs and minimize two-way data binding. 
Tests also support ES6 classes. Testing framework - [Jasmine](https://github.com/jasmine/jasmine/wiki). Test launcher - Karma Chrome

### Installation

* Install [node](https://nodejs.org/en/download/) 
* Clone or fork repo
* Run `npm install` in directory

### Running app

All bundles will be placed in dist folder. Run `npm run webpack` then `npm run serve`.

### Deployment 

Deploy runner consumes password and username from command arguments and also from config. Fill use related json in `config` directory and run `npm run deploy -- --env sb`. Also you can run deploy without environment specification, it uses *sb* config by default. *Password shoud be concatenation of user password and security token*

## Scripts

* `npm run webpack` - run webpack and watch directory on changes
* `npm run serve` - run server on localhost 8000
* `npm test` - run unit tests
* `npm run component -- --name *****` - create new component. The parameter following the --name flag is the name of the component to be created.
* `npm run component -- --name ***** --parent ****` - create new component in specified directory
* `npm run deploy -- --username ***** --password ****** --env prod` - run deploy in production. The parameter following the --username flag is the user username. The parameter following the --password flag is the concatenation of user password and security token. The parameter following the --env flag is the organization (sb - sandbox, prod - production)
* `npm run deploy -- --username ***** --password ******` - run deploy in sandbox
* `npm run deploy -- --env prod` - run deploy in production use config
* `npm run deploy` - run deploy in sandbox use config
