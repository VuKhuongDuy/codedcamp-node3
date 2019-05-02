var data = require('../models/handleDB.js');

exports.get = (req, res) => {
    res.status(200).send('Hello, world!');
}

// async function post(req, res) {
//     let { title } = Object.assign({}, { title: '' }, req.body);
//     if (!title) {
//         return res.status(404).send({
//             success: false,
//             message: "Title is false"
//         })
//     }

//     let post = new data({ title: title });
//     post.save()
//         .then((doc) => {
//             return res.status(200).send({
//                 success: true,
//                 data: doc
//             })
//         })

// }

// async function getID(req, res) {
//     let { id } = req.params;
//     data.findById({ _id: id })
//         .then((doc) => {
//             return res.status(200).send({
//                 success: true,
//                 data: doc
//             })
//         })
// }

// async function postID(req, res) {
//     try {
//         let { id } = req.params;
//         let { title } = req.body;

//         if (!title) {
//             return res.status(404).send({
//                 success: false,
//                 message: "title is empty"
//             })
//         }

//         await data.updateOne({ _id: id }, { title: title })
//             .exec((err, result) => {
//                 if (err) throw err;
//                 res.status(200).send({
//                     success: true,
//                     message: "true"
//                 })
//             })
//     }
//     catch (err) { res.status(400).send(err) }
// }

// async function postToogle(req, res) {
//     try {
//         let object = await data.findById(req.params.id)
//         let objectCompletion = object.completed;
//         let _data = await data.findByIdAndUpdate(req.params.id,
//             { $set: { completed: !objectCompletion } }, { new: true })
//         res.status(200).send({
//             success: true,
//             _data
//         })
//     } catch (err) { res.status(400).send(err) }
// }

// async function deleteData(req, res) {
//     let { id } = req.params;

//     try {
//         await data.remove({ _id: id })
//             .exec((err, result) => {
//                 if (err) return res.status(404).send({
//                     success: false,
//                     message: 'delete false'
//                 })
//                 res.status(200).send({
//                     success: true,
//                     data: result
//                 })
//             });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// module.exports = {
//     get,
//     post,
//     getID,
//     postID,
//     postToogle,
//     deleteData
// }

exports.post = async (req, res) => {
    let defaulttitle = {
        title: '',
    }

    let { title } = Object.assign({}, defaulttitle, req.body) //merge vs req.body.title và default.title

    if (!title) {
        return res.send({
            success: false,
            message: 'Title is emty'
        })
    }
    let post = new data({ title: 'Hello' });
    post.save()
        .then((doc) => {
            return res.send({
                data: doc.toJSON(),
                success: true
            })
        })
        .catch((err) => {
            return res.send({
                success: false,
                error: err.message
            })
        })
}
exports.getID = async (req, res) => {
    let { id } = req.params;
    await data.findOne({ _id: id })
        .then((doc) => {


            res.send({
                success: true,
                data: doc
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                message: 'Dont found'

            })
        })
}

exports.deleteData = async (req, res) => {
    let { id } = req.params;
    await data.findOne({ _id: id })
        .then(async (doc) => {
            await data.deleteOne({ _id: id })
            res.send({
                success: true,
                data: true
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                message: 'Dont found'

            })
        })

};
exports.postID = (req, res) => {
    let { id } = req.params;
    let { title } = req.body;
    if (!title) {
        return res.send({
            success: false,
            message: 'Title is emty'
        })
    }
    data.findOne({ _id: id })
        .then(async (doc) => {
            await data.updateOne({ _id: id }, // find xong mới update cần theo cơ chế đồng bộ
                { $set: { title } })
            res.send({
                success: true,
                data: true
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                message: err.message

            })
        })

};
