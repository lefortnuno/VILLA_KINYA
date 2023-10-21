const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

const utilisateurRoute = require("./routes/utilisateur.route");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.static(path.join(__dirname + "/public")));

app.use("/api/utilisateur", utilisateurRoute);

app.listen(process.env.PORT || process.env.URL_HOST_IP, () => {
  console.log(`Ecoute au port ${process.env.PORT} .... `);
});
