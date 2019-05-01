var data = require('../models/handleDB.js');

function get(req, res) {
    res.send('Hello, world!');
}

async function post(req, res) {
    let { title } = Object.assign({}, { title: '' }, req.body);
    if (!title) {
        return res.send({
            success: false,
            message: "Title is false"
        })
    }

    let post = new data({ title: title });
    await post.save()
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

async function getID(req, res) {
    let { id } = req.params;
    await data.findOne({ _id: id })
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

async function postID(req, res) {
    let { id } = req.params;
    let { title } = req.body;

    if (!title) {
        return res.send({
            success: false,
            message: "title is empty"
        })
    }

    await data.update({ _id: id }, { title: title})
    .exec((err,result)=>{
        if(err) throw err;
        res.send({
            success: true,
            message: "true"
        })
    })
}

async function deleteData(req, res) {
    let { id } = req.params;

    await data.remove({ _id: id })
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