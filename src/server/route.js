const express = require('express');
const app = express();
const path = require('path');
const fetch = require("node-fetch");

const router = express.Router();
let projectData = {};



router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // GET route
app.get('/all', getData);
function getData(req, res) {
    res.status(200).sendFile(path.resolve("/dist/index.html"));
   console.log(req)
   res.send(projectData);
};

//POST route with three pieces of data 
app.post('/add', function (req, res){
    newData = req.body;
    Object.assign(projectData, newData);
   res.send(projectData);
});

module.exports = app;
