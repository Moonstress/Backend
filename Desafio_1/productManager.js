class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(product) {
      const existingProduct = this.products.find(p => p.code === product.code);
      if (existingProduct) {
        console.error('Product with the same code already exists.');
        return;
      }
  
      product.id = this.nextId;
      this.products.push(product);
      this.nextId++;
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error('Product not found.');
      }
      return product;
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  productManager.addProduct({
    code: 'P1',
    thumbnail: 'thumbnail_url',
    title: 'Product 1',
    descripcion: 'Description of Product 1',
    price: 10.99,
    stock: 50
  });
  
  productManager.addProduct({
    code: 'P2',
    thumbnail: 'thumbnail_url',
    title: 'Product 2',
    descripcion: 'Description of Product 2',
    price: 19.99,
    stock: 30
  });
  
  console.log(productManager.getProducts());
  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(3)); // Esto generará un error
  
  