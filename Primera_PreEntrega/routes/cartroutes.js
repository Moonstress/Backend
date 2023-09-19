import express from 'express';
import CartManager from '../cartManager.js';

const app = express(); // Create a new Express application
const cartManager = new CartManager();

// Route to list all shopping carts
app.get('/', (req, res) => {
    const carts = cartManager.getCarts();
    res.json(carts);
});

// Route to create a new shopping cart
app.post('/', (req, res) => {
    const newCart = req.body;
    const createdCart = cartManager.createCart(newCart);
    res.status(201).json(createdCart); // Respond with the newly created cart
});

// Route to list a specific shopping cart by cart ID
app.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = cartManager.getCartById(parseInt(cid, 10));
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).json({ error: 'Cart not found' });
    }
});

// Route to add a product to a specific shopping cart by cart ID
app.post('/:cid/products/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = cartManager.addProductToCart(parseInt(cid, 10), { id: pid }, quantity);
    if (updatedCart) {
        res.status(201).json(updatedCart.products);
    } else {
        res.status(404).json({ error: 'Cart not found or Product not found' });
    }
});

export default app;
