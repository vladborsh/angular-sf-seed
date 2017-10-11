/**
 * Product Controller does some stuff
 */
class ProductController {
  
  constructor( SfService ) {
    this._SfService = SfService;
    this.init();
  }

  /**
   * Product Controller initialization util method
   */
  init() {
    this._SfService.do('ProductController.getProducts', 'SRV-234', 34)
      .then( console.log )
      .catch( console.log )
  }

}

ProductController.$inject = ['SfService'];

export default ProductController

