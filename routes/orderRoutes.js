import express from 'express';
import orderModel from '../models/orderModel.js';

const orderRouter = express.Router();

// Create a new order
orderRouter.post('/new', async (req, res) => {
  const { email, orderValue } = req.body;

  try {
    const result = await orderModel.create({ email, orderValue });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});
// Get orders by email
orderRouter.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const result = await orderModel.find({ email });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

orderRouter.get('/all', async (req, res) => {

  try {
    const result = await orderModel.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default orderRouter;
