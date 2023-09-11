import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 8080;

// Middleware to process JSON requests
app.use(express.json());

// File paths for data persistence
const productsFilePath = 'products.json';
const cartsFilePath = 'carts.json';

// Initialize product and cart data (empty arrays initially)
let products = [];
let carts = [];

// Load product and cart data from files
async function loadData() {
  try {
    const productsData = await fs.readFile(productsFilePath, 'utf8');
    products = JSON.parse(productsData);
  } catch (error) {
    // If the file doesn't exist, products will remain an empty array
    console.error('Error loading products:', error);
  }

  try {
    const cartsData = await fs.readFile(cartsFilePath, 'utf8');
    carts = JSON.parse(cartsData);
  } catch (error) {
    // If the file doesn't exist, carts will remain an empty array
    console.error('Error loading carts:', error);
  }
}

// Save product and cart data to files
async function saveData() {
  try {
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving products:', error);
  }

  try {
    await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving carts:', error);
  }
}

// Middleware to load data before processing requests
app.use(async (req, res, next) => {
  await loadData();
  next();
});

// Routes for managing products
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = products.find((p) => p.id === pid);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  // Generate a unique ID (for simplicity, using a timestamp)
  newProduct.id = Date.now().toString();
  products.push(newProduct);
  saveData(); // Save data to file
  res.status(201).json(newProduct);
});

app.put('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === pid);

  if (index === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    // Preserve the existing ID
    updatedProduct.id = pid;
    products[index] = updatedProduct;
    saveData(); // Save data to file
    res.json(updatedProduct);
  }
});

app.delete('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const index = products.findIndex((p) => p.id === pid);

  if (index === -1) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    products.splice(index, 1);
    saveData(); // Save data to file
    res.status(204).send();
  }
});

// Routes for managing shopping carts
app.post('/api/carts', (req, res) => {
  const newCart = req.body;
  // Generate a unique ID (for simplicity, using a timestamp)
  newCart.id = Date.now().toString();
  newCart.products = [];
  carts.push(newCart);
  saveData(); // Save data to file
  res.status(201).json(newCart);
});

app.get('/api/carts/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = carts.find((c) => c.id === cid);

  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
  } else {
    res.json(cart.products);
  }
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cart = carts.find((c) => c.id === cid);
  const product = products.find((p) => p.id === pid);

  if (!cart) {
    res.status(404).json({ error: 'Cart not found' });
  } else if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    // Check if the product already exists in the cart
    const existingProduct = cart.products.find((item) => item.id === pid);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: pid, quantity });
    }

    saveData(); // Save data to file
    res.status(201).json(cart.products);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
