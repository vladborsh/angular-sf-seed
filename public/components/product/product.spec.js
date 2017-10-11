import ProductModule from './product';
import ProductController from './product.controller';
import ProductComponent from './product.component';
import ProductTemplate from './product.html';
import SfService from '../../commons/sf.service';

describe('Product', () => {
  let $rootScope, $q, makeController;

  beforeEach(window.module(ProductModule));
  beforeEach(inject((_$rootScope_, _$q_ ) => {
    $rootScope = _$rootScope_;
    $q = _$q_;
    makeController = () => {
      return new ProductController( new SfService($q) );
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