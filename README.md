# AngularJs starter for Salesforce

This project is easy to use a starter for scalable Angular 1.x application and ready to run in the Salesforce environment.

## Description

Starter provides scalable component-based AngularJS project structure and the best practice in directory organization for Angular. It supports ES6 standards and consumes components as classes. Starter uses Webpack as bundler and Gulp as task runner. 

## Features

* ES6 standards and component based ready to use structure
* SASS suport
* Templates placed with controllers (no need to create Visualforce component)
* Configured build (Webpack) and test system (Karma, Jasmine)
* Component generation
* Single command deploy to any Salesforce environment
* UI-Router

## Getting started

### Structure

We use component-based approach for scaling and separating by concerns. Domain related components by default placed in `public/components` folder.  Visualforce remoting wrapper is in `public//commons` folder. Ideally, the whole application should be a tree of components that implement clearly defined inputs and outputs and minimize two-way data binding. 
Tests also support ES6 classes. Testing framework - Jasmine. Test launcher - Karma Chrome

### Installation

* Install node 
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
