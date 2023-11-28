const express = require("express");
const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu")
const Item = require("../models/Item")
const {check, validationResult} = require('express-validator')

const restaurantRouter = express.Router();

restaurantRouter.get("/", async(req, res) =>{
    let restaurants = await Restaurant.findAll({include: Menu});
    res.json(restaurants)
})

restaurantRouter.get(`/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
})

restaurantRouter.post("/", [check("name").not().isEmpty(), check("location").not().isEmpty(), check("cuisine").not().isEmpty()],async(req,res) =>{
    const errors = validationResult(req);
   if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        let newRes = await Restaurant.create(req.body);
        res.json(newRes)
    }


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
