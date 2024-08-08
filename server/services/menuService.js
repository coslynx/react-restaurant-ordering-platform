const Menu = require('../models/Menu');
const Dish = require('../models/Dish');

const getMenu = async () => {
  try {
    const menu = await Menu.findOne().populate('categories.dishes');
    if (!menu) {
      throw new Error('Menu not found');
    }
    return menu;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

const createMenuItem = async (menuItemData) => {
  try {
    const { name, description, price, category, image, ingredients, dietaryInfo, featured } = menuItemData;

    // Validate input data
    if (!name || !description || !price || !category || !image || !ingredients || !dietaryInfo) {
      throw new Error('Missing required fields');
    }

    // Check if dish already exists
    const existingDish = await Dish.findOne({ name });
    if (existingDish) {
      throw new Error('Dish already exists');
    }

    // Create a new dish
    const newDish = new Dish({
      name,
      description,
      price,
      category,
      image,
      ingredients,
      dietaryInfo,
      featured,
    });
    await newDish.save();

    // Update menu with new dish
    const menu = await Menu.findOne();
    const categoryIndex = menu.categories.findIndex((cat) => cat.name === category);
    if (categoryIndex !== -1) {
      menu.categories[categoryIndex].dishes.push(newDish._id);
    } else {
      menu.categories.push({
        name: category,
        dishes: [newDish._id],
      });
    }
    await menu.save();

    return newDish;
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
};

const updateMenuItem = async (menuItemId, menuItemData) => {
  try {
    const { name, description, price, category, image, ingredients, dietaryInfo, featured } = menuItemData;

    // Validate input data
    if (!name || !description || !price || !category || !image || !ingredients || !dietaryInfo) {
      throw new Error('Missing required fields');
    }

    // Find the dish to update
    const menuItem = await Dish.findByIdAndUpdate(
      menuItemId,
      { name, description, price, category, image, ingredients, dietaryInfo, featured },
      { new: true },
    );
    if (!menuItem) {
      throw new Error('Menu item not found');
    }

    // Update menu with updated dish
    const menu = await Menu.findOne();
    const categoryIndex = menu.categories.findIndex((cat) => cat.name === category);
    if (categoryIndex !== -1) {
      // Ensure the updated dish is in the correct category
      const dishIndex = menu.categories[categoryIndex].dishes.findIndex((dishId) => dishId.toString() === menuItemId);
      if (dishIndex !== -1) {
        menu.categories[categoryIndex].dishes[dishIndex] = menuItem._id;
      } else {
        menu.categories[categoryIndex].dishes.push(menuItem._id);
      }
    } else {
      // Create a new category if it doesn't exist
      menu.categories.push({
        name: category,
        dishes: [menuItem._id],
      });
    }
    await menu.save();

    return menuItem;
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

const deleteMenuItem = async (menuItemId) => {
  try {
    // Find the dish to delete
    const menuItem = await Dish.findByIdAndDelete(menuItemId);
    if (!menuItem) {
      throw new Error('Menu item not found');
    }

    // Remove the dish from the menu
    const menu = await Menu.findOne();
    menu.categories.forEach((category) => {
      const dishIndex = category.dishes.findIndex((dishId) => dishId.toString() === menuItemId);
      if (dishIndex !== -1) {
        category.dishes.splice(dishIndex, 1);
      }
    });
    await menu.save();
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

module.exports = {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};