const express = require('express');
const router = express.Router();
const { createOrder, getOrderByID, updateOrderStatus, getAllOrders, deleteOrder } = require('../services/orderService');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    const order = await createOrder(orderData);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const orderID = req.params.id;
    const order = await getOrderByID(orderID);
    res.status(200).json({ message: 'Order fetched successfully', order });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(404).json({ message: 'Order not found' });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const orderID = req.params.id;
    const newStatus = req.body.status;
    const order = await updateOrderStatus(orderID, newStatus);
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ message: 'Orders fetched successfully', orders });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const orderID = req.params.id;
    await deleteOrder(orderID);
    res.status(204).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

module.exports = router;