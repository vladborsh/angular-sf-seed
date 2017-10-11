import ProductModule from './product';
import ProductController from './product.controller';
import ProductComponent from './product.component';
import ProductTemplate from './product.html';

describe('Product', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ProductModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ProductController();
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
    let component = ProductComponent;
    it('includes the intended template', () => {
      expect(component.template).toEqual(ProductTemplate);
    });
    it('invokes the right controller', () => {
      expect(component.controller).toEqual(ProductController);
    });
  });
});