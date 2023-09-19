import fs from 'fs'; 

class CartManager {
  constructor() {
    this.carts = [];
    this.cartFilePath = './carts.json'; // Path to the JSON file for carts
    this.nextCartId = 1; // Initialize the cart ID to 1
    this.loadCartsFromFile(); // Load existing carts when the class is instantiated
  }

// Load existing carts from the JSON file (if it exists)
loadCartsFromFile() {
  try {
    if (fs.existsSync(this.cartFilePath)) {
      const data = fs.readFileSync(this.cartFilePath, 'utf8');
      this.carts = JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading carts:', error);
  }
}

// Save the carts array to the JSON file
saveCartsToFile() {
  try {
    fs.writeFileSync(this.cartFilePath, JSON.stringify(this.carts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving carts:', error);
  }
}
  createCart(cart) {
    cart.id = this.nextCartId++;
    this.carts.push(cart);
    this.saveCartsToFile();
    return cart;
  }
  

  // Get a shopping cart by its ID
  getCartById(id) {
    return this.carts.find(cart => cart.id === id);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    const product = productManager.getProductById(productId); // Retrieve the product details
  
    if (cart && product) {
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(p => p.id === productId);
  
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        const newCartItem = {
          id: productId,
          quantity: quantity,
          product: product // Store the product details in the cart item
        };
        cart.products.push(newCartItem);
      }
  
      this.saveCartsToFile();
      return cart;
    }
  
    return null; // Cart or product not found
  }

}

export default CartManager;