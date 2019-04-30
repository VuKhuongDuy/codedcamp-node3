var data = require('../models/handleDB.js');

function get(req, res) {
    res.send('Hello, world!');
}

function post(req, res) {
    let { title } = Object.assign({}, { title: '' }, req.body);
    if (!title) {
        return res.send({
            success: false,
            message: "Title is false"
        })
    }

    let post = new data({ title: title });
    post.save()
        .then((doc) => {
            return res.send({
                success: true,
                data: doc
            })
        })
        .catch((err) => {
            return res.send({
                success: false,
                message: err.message
            })
        })
}

function getID(req, res) {
    let { id } = req.params;
    data.findOne({ _id: id })
        .then((doc) => {
            return res.send({
                success: true,
                data: doc
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                message: "Not result"
            })
        })
}

function postID(req, res) {
    let { id } = req.params;
    let { title } = req.body;

    if (!title) {
        return res.send({
            success: false,
            message: "title is empty"
        })
    }

    data.update({ _id: id }, { title: title})
    .exec((err,result)=>{
        if(err) throw err;
        res.send({
            success: true,
            message: "true"
        })
    })
}

function deleteData(req, res) {
    let { id } = req.params;

    data.remove({ _id: id })
        .exec((err, result) => {
            if (err) return res.send({
                success: false,
                message: 'delete false'
            })
            res.send({
                success: true,
                data: result
            })
        });
}

module.exports = {
    get,
    post,
    getID,
    postID,
    deleteData
}