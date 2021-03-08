const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const sgMail = require("@sendgrid/mail");

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

router.post("/:id", (req, res) => {
  const { firstName, lastName, email, ppl, date, time } = req.body;
  let validation = [];
  let passed = true;

  if (!firstName) {
    passed = false;
    validation.firstName = "First Name is invalid";
  }
  if (!lastName) {
    passed = false;
    validation.lastName = "Last Name is invalid";
  }
  if (!validateEmail(email)) {
    passed = false;
    validation.email =
      "must start with number or character and also contain '@'";
  }
  if (ppl < 1) {
    passed = false;
    validation.people = "Number should be over 0";
  }
  if (!validateDate(date)) {
    passed = false;
    validation.date = "Date is invalid";
  }
  if (!time) {
    passed = false;
    validation.time = "Time is invalid";
  }

  if (passed) {
    Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
      sendEmail(restaurant, req.body);
      res.render("resConfirm", {
        data: req.body,
        res: restaurant,
      });
    });
  } else {
    Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
      if (err) return res.json(err);
      res.render("reservation", {
        data: restaurant,
        validation: validation,
        value: req.body,
      });
    });
  }

  function sendEmail(restaurantInfo, reservationInfo) {
    const key = process.env.Mail_key;
    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(key);

    const msg = {
      to: `${reservationInfo.email}`,
      from: "echoi26@myseneca.ca",
      subject: "Here is your reservation information",
      html: ` Thank your for reservation!<br>
              Restaurant name: ${restaurantInfo.name} <br>
               Name: ${reservationInfo.firstName} ${reservationInfo.lastName}<br>
               Date: ${reservationInfo.date}<br>
               Time: ${reservationInfo.time}<br>
              `,
    };

    sgMail.send(msg).catch((err) => {
      console.log(err);
    });
  }

  function validateEmail(email) {
    const regular = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regular.test(String(email).toLowerCase());
  }
  function validateDate(date) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    let today = "";

    month < 10 ? (today = `${year}-0${month}`) : (today = `${year}-${month}`);
    day < 10 ? (today = `${today}-0${day}`) : (today = `${today}-${day}`);

    return today > date ? false : true;
  }
});

module.exports = router;
