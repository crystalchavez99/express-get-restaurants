const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json())
app.use(express.urlencoded())

//TODO: Create your GET Request Route Below:
app.get("/restaurants", async(req, res) =>{
    let restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

app.get(`/restaurants/:id`, async(req,res) =>{
    let id = req.params.id
    let restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
})

app.post("/restaurants", async(req,res) =>{
    let newRes = await Restaurant.create(req.body);
    res.json(newRes)

})

app.put(`/restaurants/:id`, async(req,res) =>{
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


module.exports = app;
