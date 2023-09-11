const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = 'products.json';
    this.nextId = 1; // To auto-generate unique IDs
    this.loadProductsFromFile(); // Load existing products when the class is instantiated
  }

  // Load existing products from the JSON file (if it exists)
  loadProductsFromFile() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  // Save the products array to the JSON file
  saveProductsToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  // Add a new product
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

  // Get a product by its ID
  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  // Update a product by its ID
  updateProduct(id, updatedFields) {
    const product = this.getProductById(id);
    if (product) {
      // Merge the updated fields into the existing product
      Object.assign(product, updatedFields);
      this.saveProductsToFile();
    }
    return product;
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

module.exports = ProductManager;
