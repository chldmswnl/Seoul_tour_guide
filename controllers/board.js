const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/", (req, res) => {
  Comment.find().exec((comment, err) => {
    if (comment === null) {
      res.render("board", {
        title: "Board page",
        data: false,
      });
    } else {
      check = false;
      res.render("board", {
        title: "Board page",
        data: comment,
      });
    }
  });
});

router.post("/addComment", (req, res) => {
  const { title, writer, content, date } = req.body;
  let comment = new Comment({
    title: title,
    writer: writer,
    content: content,
    date: date,
  });

  comment
    .save()
    .then(() => {
      console.log("success!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
