const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/", (req, res) => {
  Restaurant.find()
    .exec()
    .then((restaurant) => {
      data = restaurant.map((value) => value.toObject());
      res.render("food", {
        title: "Food page",
        data: data,
      });
    });
});

router.get("/mapo", (req, res) => {
  Restaurant.find({ location: "mapo" }, (err, restaurant) => {
    if (err) return res.json(err);
    res.render("food", {
      title: "Food page",
      data: restaurant,
    });
  });
});

router.get("/gangnam", (req, res) => {
  Restaurant.find({ location: "gangnam" }, (err, restaurant) => {
    if (err) return res.json(err);
    res.render("food", {
      title: "Food page",
      data: restaurant,
    });
  });
});

router.get("/yongsan", (req, res) => {
  Restaurant.find({ location: "yongsan" }, (err, restaurant) => {
    if (err) return res.json(err);
    res.render("food", {
      title: "Food page",
      data: restaurant,
    });
  });
});

router.get("/yeongdeung", (req, res) => {
  Restaurant.find({ location: "yeongdeung" }, (err, restaurant) => {
    if (err) return res.json(err);
    res.render("food", {
      title: "Food page",
      data: restaurant,
    });
  });
});

router.get("/dondaemun", (req, res) => {
  Restaurant.find({ location: "dondaemun" }, (err, restaurant) => {
    if (err) return res.json(err);
    res.render("food", {
      title: "Food page",
      data: restaurant,
    });
  });
});

router.get("/:id", (req, res) => {
  Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
    if (err) return res.json(err);
    res.render("reservation", { data: restaurant });
  });
});

module.exports = router;
