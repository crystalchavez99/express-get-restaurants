const {express} = require("express");
const Restaurant = require("../models/Restaurant");

const restaurantRouter = express.Router();

restaurantRouter.get("/restaurants", async(req, res) =>{
    let restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

restaurantRouter.get(`/restaurants/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
})

restaurantRouter.post("/restaurants", async(req,res) =>{
    let newRes = await Restaurant.create(req.body);
    res.json(newRes)

})

restaurantRouter.put(`/restaurants/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    if (!restaurant) {
        return res.status(404).send('Restaurant not found');
    }
    restaurant.name = req.body.name;
    restaurant.location = req.body.location;
    restaurant.cuisine = req.body.cuisine;
    await restaurant.save()
    res.json(restaurant)
})

restaurantRouter.delete(`/restaurants/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    if (!restaurant) {
        return res.status(404).send('Restaurant not found');
    }
    await restaurant.destroy()
    res.send('Restaurant deleted');
})

module.exports = restaurantRouter;
