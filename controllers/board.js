const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
let data;

router.get("/", (req, res) => {
  Comment.find()
    .exec()
    .then((comment) => {
      data = comment.map((value) => value.toObject());
      res.render("board", {
        title: "Board page",
        data: data,
      });
    });
});

router.get("/getComment", (req, res) => {
  Comment.find()
    .exec()
    .then((comment) => {
      res.json(comment);
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
      Comment.find()
        .exec()
        .then((comment) => {
          res.json(comment);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deleteComment/:id", (req, res) => {
  Comment.deleteOne({ _id: req.params.id }, function (err, comment) {
    Comment.find()
      .exec()
      .then((comment) => {
        res.json(comment);
      });
  });
});

module.exports = router;
