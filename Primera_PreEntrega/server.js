import express from 'express';
import productsRoutes from './routes/productsroutes.js';
import cartRoutes from './routes/cartroutes.js';
import ProductManager from './productManager.js';

const app = express();
const port = 8080;
const productManager = new ProductManager();

app.use(express.json());

// Use the products routes defined in productsroutes.js
app.use('/api/products', productsRoutes); // Add a leading slash '/'

// Use the cart routes defined in cartroutes.js
app.use('/api/carts', cartRoutes); // Add a leading slash '/'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
