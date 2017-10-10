import ContactModule from './contact';
import ContactController from './contact.controller';
import ContactComponent from './contact.component';
import ContactTemplate from './contact.html';

describe('Contact', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ContactModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ContactController();
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
    let component = ContactComponent;
    it('includes the intended template', () => {
      expect(component.template).toEqual(ContactTemplate);
    });
    it('invokes the right controller', () => {
      expect(component.controller).toEqual(ContactController);
    });
  });
});