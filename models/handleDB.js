const mongoose = require('mongoose')

const mongoPath = process.env.mongoPath || 'localhost';
const mongoPort = process.env.mongoPort || 27017;

mongoose.connect(`mongodb://${mongoPath}:${mongoPort}/data`);

const schema = new mongoose.Schema({
    title : {type: String, require: true, trim: true},
    created : {
        type: Date,
        default: Date.now
    }
})

const data = mongoose.model('data',schema);

module.exports = data;

// const mongoose = require('mongoose');

// const mongoPath = process.env.mongoPath || 'localhost';
// const   mongoPort