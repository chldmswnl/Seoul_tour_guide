"use strict";

const express = require("express");
const router = express.Router();
let data = require("../data/restaurant.json");

router.get("/", (req, res) => {
  data = require("../data/restaurant.json");
  res.render("food", {
    title: "Food page",
    data: data.restaurants,
  });
});

router.get("/mapo", (req, res) => {
  data = require("../data/restaurant.json");
  data = data.restaurants.filter((restaurant) => restaurant.location == "mapo");
  res.render("food", {
    title: "Food page",
    data: data,
  });
});

router.get("/gangnam", (req, res) => {
  data = require("../data/restaurant.json");
  data = data.restaurants.filter(
    (restaurant) => restaurant.location == "gangnam"
  );
  res.render("food", {
    title: "Food page",
    data: data,
  });
});

router.get("/yongsan", (req, res) => {
  data = require("../data/restaurant.json");
  data = data.restaurants.filter(
    (restaurant) => restaurant.location == "yongsan"
  );
  res.render("food", {
    title: "Food page",
    data: data,
  });
});

router.get("/yeongdeung", (req, res) => {
  data = require("../data/restaurant.json");
  data = data.restaurants.filter(
    (restaurant) => restaurant.location == "yeongdeung"
  );
  res.render("food", {
    title: "Food page",
    data: data,
  });
});

router.get("/dondaemun", (req, res) => {
  data = require("../data/restaurant.json");
  data = data.restaurants.filter(
    (restaurant) => restaurant.location == "dondaemun"
  );
  res.render("food", {
    title: "Food page",
    data: data,
  });
});

module.exports = router;
