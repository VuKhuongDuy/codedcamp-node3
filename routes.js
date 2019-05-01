var express = require('express');
var route = express.Router();
var handleFunc = require('./controller/handleRoute')

route.get('/',handleFunc.get);
route.post('/todos',handleFunc.post);
route.get('/todos/:id',handleFunc.getID);
route.post('/todos/:id',handleFunc.postID);
route.post('/todos/:id/toogle',handleFunc.postToogle);
route.delete('/todos/:id',handleFunc.deleteData);

module.exports = route
