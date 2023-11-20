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



module.exports = app;
