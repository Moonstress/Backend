const fs = require('fs');

class CartManager {
  constructor() {
    this.carts = [];
    this.cartFilePath = 'carts.json'; // Path to the JSON file for carts
    this.nextCartId = 1; // To auto-generate unique cart IDs
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

  // Create a new shopping cart
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

  // Add a product to a shopping cart
  addProductToCart(cartId, product, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (cart) {
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        product.quantity = quantity;
        cart.products.push(product);
      }
      this.saveCartsToFile();
      return cart;
    }
    return null;
  }
  
 
}

 // Route to list all shopping carts
 app.get('/api/carts', (req, res) => {
  const carts = cartManager.getCarts();
  res.json(carts);
});

// Route to create a new shopping cart
app.post('/api/carts', (req, res) => {
  const newCart = req.body;
  cartManager.createCart(newCart);
  res.status(201).json(newCart); // Respond with the newly created cart
});

// Route to list products in a specific shopping cart by cart ID
app.get('/api/carts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const cart = cartManager.getCartById(id);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
});

// Route to add a product to a specific shopping cart by cart ID
app.post('/api/carts/:id/products', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = req.body; // You may need to adjust this based on your request structure
  const updatedCart = cartManager.addProductToCart(id, product);
  if (updatedCart) {
    res.json(updatedCart);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
});



module.exports = CartManager;
