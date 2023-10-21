"use strict";
const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
  host: process.env.URL_BDD_HOST,
  user: process.env.URL_BDD_USER,
  password: process.env.URL_BDD_MDP,
  database: process.env.URL_BDD_NAME,
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Connexion base de donnees avec Succes!");
});
module.exports = dbConn;
