var data = require('../models/handleDB.js');

function get(req, res) {
    res.status(200).send('Hello, world!');
}

async function post(req, res) {
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
        .catch((err) => {
            return res.status(404).send({
                success: false,
                message: err.message
            })
        })
}

async function getID(req, res) {
    let { id } = req.params;
    await data.findById({ _id: id })
        .then((doc) => {
            return res.status(200).send({
                success: true,
                data: doc
            })
        })
        .catch((err) => {
            res.status(404).send({
                success: false,
                message: "Not result"
            })
        })
}

async function postID(req, res) {
    let { id } = req.params;
    let { title } = req.body;

    if (!title) {
        return res.status(404).send({
            success: false,
            message: "title is empty"
        })
    }

    await data.update({ _id: id }, { title: title })
        .exec((err, result) => {
            if (err) throw err;
            res.status(200).send({
                success: true,
                message: "true"
            })
        })
}

async function postToogle(req, res) {
    try {
        const { id } = req.params;
        var todo = await data.findById(id).lean();
        console.log(todo.completed)
        await data.updateOne(
            todo,
            {
                $set: {
                    completed: !todo.completed
                }
            }
        );
        res.status(200).send({
            success: true,
            data: todo
        })
    }
    catch (err) {
        res.status(404).send({
            success: false,
            message: err.message
        })
    }
}

async function deleteData(req, res) {
    let { id } = req.params;

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

module.exports = {
    get,
    post,
    getID,
    postID,
    postToogle,
    deleteData
}