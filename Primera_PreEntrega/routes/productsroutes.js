import express from 'express';
import ProductManager from '../productManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Route to get a product by its ID
router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(parseInt(pid, 10));

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  productManager.addProduct(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedFields = req.body;
  const updatedProduct = productManager.updateProduct(parseInt(pid, 10), updatedFields);

  if (!updatedProduct) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(updatedProduct);
  }
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  productManager.deleteProduct(parseInt(pid, 10));
  res.status(204).send();
});

export default router;
