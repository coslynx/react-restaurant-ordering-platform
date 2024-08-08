const express = require('express');
const router = express.Router();
const { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } = require('../services/menuService');

// Get the entire restaurant menu
router.get('/', async (req, res) => {
  try {
    const menu = await getMenu();
    res.status(200).json({ message: 'Menu fetched successfully', menu });
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  try {
    const menuItemData = req.body;
    const menuItem = await createMenuItem(menuItemData);
    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ message: 'Failed to create menu item' });
  }
});

// Update an existing menu item
router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const menuItemData = req.body;
    const menuItem = await updateMenuItem(menuItemId, menuItemData);
    res.status(200).json({ message: 'Menu item updated successfully', menuItem });
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ message: 'Failed to update menu item' });
  }
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    await deleteMenuItem(menuItemId);
    res.status(204).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ message: 'Failed to delete menu item' });
  }
});

module.exports = router;