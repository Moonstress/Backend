class ProductManager {
  constructor() {
    this.products = [
      {
        id: 1,
        code: 'P1',
        thumbnail: 'thumbnail_url',
        title: 'Product 1',
        descripcion: 'Description of Product 1',
        price: 10.99,
        stock: 50,
      },
      {
        id: 2,
        code: 'P2',
        thumbnail: 'thumbnail_url',
        title: 'Product 2',
        descripcion: 'Description of Product 2',
        price: 19.99,
        stock: 30,
      },
    ];
    this.nextId = 3; // Set the next ID to 3 since we already have two products with IDs 1 and 2
  }

  addProduct(product) {
    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      console.error('Product with the same code already exists.');
      return;
    }

    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductByCode(code) {
    const product = this.products.find(p => p.code === code);
    return product;
  }


  deleteProduct(id) {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      console.error('Product not found.');
      return;
    }

    this.products.splice(productIndex, 1);
  }
}


export default ProductManager;
