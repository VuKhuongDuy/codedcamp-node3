var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 

let port = process.env.PORT || 3000;
let host = process.env.HOST || "localhost";

var strDate = new Date()
let TodoObject = {
    _id: 0,
    title: 'Task 1',
    completed: false,
    create: strDate
}
let results = {
    success: true,
    data: TodoObject
}

app.get('/',function(req,res){
    res.send('Hello, world!');
})

app.post('/todos',function(req,res){
    TodoObject.title = req.body.title;
    results.data = TodoObject;
    res.send(results);
})

app.get('/todos/:id',function(req,res){
    TodoObject._id = req.params.id;
    results.data = TodoObject;
    res.send(results);
})

app.post('/todos/:id',function(req,res){
    TodoObject._id = req.params.id;
    TodoObject.title = req.body.title;
    results.data = TodoObject;
    res.send(results);
})

app.post('/todos/:id/toogle',function(req,res){
    TodoObject._id = req.params.id;
    results.data = TodoObject;
    res.send(results);
})

app.delete('/todos/:id',function(req,res){
    TodoObject._id = req.params.id; 
    results.data = true;
    res.send(results);
})

app.listen(port,host, ()=>{console.log(`Success ${host} on ${port}`)})