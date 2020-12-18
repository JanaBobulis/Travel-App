const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');
const route = require('./route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(cors()); 
app.use('/', route);


module.exports = app.listen(4040,() => {
    console.log("App listening on port 4040")
})
