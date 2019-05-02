var data = require('../models/handleDB.js');

function get(req, res) {
    res.status(200).send('Hello, world!');
}

async function post(req, res) {
    try {
        let { title } = Object.assign({}, { title: '' }, req.body);
        if (!title) {
            return res.status(404).send({
                success: false,
                message: "Title is false"
            })
        }

        let post = new data({ title: title });
        await post.save()
            .then((doc) => {
                return res.status(200).send({
                    success: true,
                    data: doc
                })
            })
    }
    catch (err) { res.status(400).send(err) }
}

async function getID(req, res) {
    try {
        let { id } = req.params;
        await data.findById({ _id: id })
            .then((doc) => {
                return res.status(200).send({
                    success: true,
                    data: doc
                })
            })
    }
    catch (err) { res.status(400).send(err) }
}

async function postID(req, res) {
    try {
        let { id } = req.params;
        let { title } = req.body;

        if (!title) {
            return res.status(404).send({
                success: false,
                message: "title is empty"
            })
        }

        await data.updateOne({ _id: id }, { title: title })
            .exec((err, result) => {
                if (err) throw err;
                res.status(200).send({
                    success: true,
                    message: "true"
                })
            })
    }
    catch (err) { res.status(400).send(err) }
}

async function postToogle(req, res) {
    try {
        let object = await data.findById(req.params.id)
        let objectCompletion = object.completed;
        let _data = await data.findByIdAndUpdate(req.params.id,
            { $set: { completed: !objectCompletion } }, { new: true })
        res.status(200).send({
            success: true,
            _data
        })
    } catch (err) { res.status(400).send(err) }
}

async function deleteData(req, res) {
    let { id } = req.params;

    try {
        await data.remove({ _id: id })
            .exec((err, result) => {
                if (err) return res.status(404).send({
                    success: false,
                    message: 'delete false'
                })
                res.status(200).send({
                    success: true,
                    data: result
                })
            });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    get,
    post,
    getID,
    postID,
    postToogle,
    deleteData
}