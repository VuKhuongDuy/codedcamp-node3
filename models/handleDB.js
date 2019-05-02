const mongoose = require('mongoose')
let config = require('config');

const mongoPath = process.env.mongoPath || config.get("MONGO_PATH");
const mongoPort = process.env.mongoPort || config.get(' MONGO_PORT');

let connection = mongoose.createConnection(`mongodb://${mongoPath}:${mongoPort}/data`,  { useNewUrlParser: true }, function(err){
    if(err) console.log(err);
    console.log('Connect success');
});

const schema = new mongoose.Schema({
    title : {type: String, require: true, trim: true},
    completed: {
        type: Boolean,
        default: false
    },
    created : {
        type: Date,
        default: Date.now
    }
})

const data = connection.model('data',schema);

module.exports = data;
