const mongoose = require('mongoose')

const mongoPath = process.env.mongoPath || 'localhost';
const mongoPort = process.env.mongoPort || 27017;

mongoose.connect(`mongodb://${mongoPath}:${mongoPort}/data`,  { useNewUrlParser: true });

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

const data = mongoose.model('data',schema);

module.exports = data;
