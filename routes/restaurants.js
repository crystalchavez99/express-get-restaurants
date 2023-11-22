const express = require("express");
const Restaurant = require("../models/Restaurant");

const restaurantRouter = express.Router();

restaurantRouter.get("/", async(req, res) =>{
    let restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

restaurantRouter.get(`/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
})

restaurantRouter.post("/", async(req,res) =>{
    let newRes = await Restaurant.create(req.body);
    res.json(newRes)

})

restaurantRouter.put(`/:id`, async(req,res) =>{
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

restaurantRouter.delete(`/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    if (!restaurant) {
        return res.status(404).send('Restaurant not found');
    }
    await restaurant.destroy()
    res.send('Restaurant deleted');
});


module.exports = restaurantRouter;
