import template from './<%= name %>.html';
import controller from './<%= name %>.controller';
import './<%= name %>.scss';

let <%= upCaseName %>Component = {
  bindings: {},
  template,
  controller
}

export default <%= upCaseName %>Component;