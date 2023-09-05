import express from 'express';
import ProductManager from './productManager.js'; // Use the correct relative path


const app = express();
const port = 8080; // You can change the port as needed.

// Instance of the ProductManager class
const productManager = new ProductManager();

// Middleware to process JSON requests
app.use(express.json());

// Endpoint to get products with an optional limit
app.get('/products', (req, res) => {
  const { limit } = req.query;

  if (limit) {
    // If a limit is provided, return only the requested number of products
    const limitedProducts = productManager.getProducts().slice(0, parseInt(limit, 10));
    res.json(limitedProducts);
  } else {
    // If no limit is provided, return all products
    res.json(productManager.getProducts());
  }
});

// Endpoint to get a product by its code
app.get('/products/:code', (req, res) => {
  const { code } = req.params;
  const product = productManager.getProductByCode(code);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
