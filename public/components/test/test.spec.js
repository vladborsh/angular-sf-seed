import TestModule from './test';
import TestController from './test.controller';
import TestComponent from './test.component';
import TestTemplate from './test.html';

describe('Test', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TestModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TestController();
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
    let component = TestComponent;
    it('includes the intended template', () => {
      expect(component.template).toEqual(TestTemplate);
    });
    it('invokes the right controller', () => {
      expect(component.controller).toEqual(TestController);
    });
  });
});