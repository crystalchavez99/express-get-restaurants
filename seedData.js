const seedRestaurant = [
    {
      name: 'AppleBees',
      location: 'Texas',
      cuisine: 'FastFood'
    },
    {
      name: 'LittleSheep',
      location: 'Dallas',
      cuisine: 'Hotpot'
    },
    {
      name: 'Spice Grill',
      location: 'Houston',
      cuisine: 'Indian'
    }
]

const seedMenu = [
  {
    title: 'Breakfast',
    restaurantId: 1
  },
  {
    title: 'Lunch'
  },
  {
    title: 'Dinner'
  },
]

const seedItem = [
  {
    name: 'bhindi masala',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: true,
    menuId:1
  },
  {
    name: 'egusi soup',
    image: 'someimage.jpg',
    price: 10.50,
    vegetarian: false,
    menuId: 1
  },
  {
    name: 'hamburger',
    image: 'someimage.jpg',
    price: 6.50,
    vegetarian: false
  }
]

module.exports = {
  seedRestaurant,
  seedMenu,
  seedItem,
};
