const Order = require('../models/Order');
const Dish = require('../models/Dish');
const User = require('../models/User');
const { generateToken } = require('./authService');

const createOrder = async (orderData) => {
  try {
    const {
      user, items, name, email, phone, address, paymentMethod,
    } = orderData;

    // Validate input data
    if (!user || !items || !name || !email || !phone || !address || !paymentMethod) {
      throw new Error('Missing required fields');
    }

    // Check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Check if dishes exist and are available
    const dishes = await Dish.find({ _id: { $in: items } });
    if (dishes.length !== items.length) {
      throw new Error('One or more dishes not found');
    }

    // Calculate estimated delivery time (replace with your logic)
    const estimatedDeliveryTime = new Date(Date.now() + (60  60  1000)); // 1 hour from now

    // Create new order
    const newOrder = new Order({
      user,
      items,
      name,
      email,
      phone,
      address,
      paymentMethod,
      status: 'pending',
      estimatedDeliveryTime,
    });

    // Save the order
    await newOrder.save();

    // Update user's orders array
    existingUser.orders.push(newOrder._id);
    await existingUser.save();

    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const getOrderByID = async (orderID) => {
  try {
    const order = await Order.findById(orderID).populate('user items');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

const updateOrderStatus = async (orderID, newStatus) => {
  try {
    const order = await Order.findByIdAndUpdate(
      orderID,
      { status: newStatus },
      { new: true },
    ).populate('user items');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const orders = await Order.find().populate('user items');
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const deleteOrder = async (orderID) => {
  try {
    const order = await Order.findByIdAndDelete(orderID);
    if (!order) {
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrderByID,
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
};