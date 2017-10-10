import <%= upName %>Module from './<%= name %>';
import <%= upName %>Controller from './<%= name %>.controller';
import <%= upName %>Component from './<%= name %>.component';
import <%= upName %>Template from './<%= name %>.html';

describe('<%= upName %>', () => {
  let $rootScope, makeController;

  beforeEach(window.module(<%= upName %>Module));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new <%= upName %>Controller();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    it('invokes init method [REMOVE]', () => {
      let controller = makeController();
    });
  });

  describe('Component', () => {
    let component = <%= upName %>Component;
    it('includes the intended template', () => {
      expect(component.template).toEqual(<%= upName %>Template);
    });
    it('invokes the right controller', () => {
      expect(component.controller).toEqual(<%= upName %>Controller);
    });
  });
});