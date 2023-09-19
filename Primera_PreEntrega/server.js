import express from 'express';
import ProductManager from './productManager.js';
import CartManager from './cartManager.js'; // Adjust the path if needed
import productsRoutes from './routes/productsroutes.js';
import cartRoutes from './routes/cartroutes.js';

const app = express();
const port = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager(productManager); // Pass the productManager instance

app.use(express.json());

// Use the products routes defined in productsroutes.js
app.use('/api/products', productsRoutes);

// Use the cart routes defined in cartroutes.js
app.use('/api/carts', cartRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
