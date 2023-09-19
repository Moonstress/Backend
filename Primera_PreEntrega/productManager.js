import fs from 'fs';

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = './products.json';
    this.loadProductsFromFile();
  }

  loadProductsFromFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        this.products = JSON.parse(data);
        // Calculate the next ID based on existing products
        this.nextId = Math.max(...this.products.map(product => product.id), 0) + 1;
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  saveProductsToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  addProduct(product) {
    // Generate a unique ID for the new product
    product.id = this.nextId++;
    this.products.push(product);
    this.saveProductsToFile();
  }
   
  // Get all products
  getProducts() {
    return this.products;
  }


  getProductById(id) {
    console.log('Searching for product with ID:', id);
    console.log('Products array:', this.products);
    
    return this.products.find(product => product.id === id);
  }
  

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      // Create a copy of the existing product
      const updatedProduct = { ...this.products[productIndex] };
      // Merge the updated fields into the copy
      Object.assign(updatedProduct, updatedFields);
      // Replace the existing product with the updated product
      this.products[productIndex] = updatedProduct;
      this.saveProductsToFile();
      return updatedProduct;
    }
    return null; // Product not found
  }
  

  // Delete a product by its ID
  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToFile();
    }
  }
}

export default ProductManager;