const express = require("express");
const exhbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//DB setting

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection; // db object

db.once("open", function () {
  console.log("DB connected");
});

db.on("error", function (err) {
  console.log("DB ERROR: ", err);
});

//Set up handlebars
app.engine(
  ".hbs",
  exhbs({
    extname: ".hbs",
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", ".hbs");
app.use(express.static(path.join(__dirname, "public")));

//Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Load Controllers
const mainController = require("./controllers/main");
const foodController = require("./controllers/food");
const placeController = require("./controllers/place");
const boardController = require("./controllers/board");

app.use("/", mainController);
app.use("/food", foodController);
app.use("/place", placeController);
app.use("/board", boardController);

const HTTP_PORT = process.env.PORT;

app.listen(HTTP_PORT, () => {
  console.log("Express http server listening on: " + HTTP_PORT);
});
