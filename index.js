// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser')
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true })); 

// let port = process.env.PORT || 3000;

// app.use(require('./routes.js'));

// app.listen(port,(err)=>{
//     if(err) console.log(err);
//     console.log(`COnnect success with port: ${port}`);
// })

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var routes = require('./routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let port = process.env.PORT || 3000

app.use(routes);

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Connect success with port: ${port}`);
})