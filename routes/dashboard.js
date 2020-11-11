const express = require('express')
const router = express.Router()
const upload = require('../config/multer.js')

const Post = require('../config/Post.js')
router
    .get('/', async(req, res) => {
         try {
        const stories = await Post.find({ status: 'published' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()
        res.render('dashboard', {
            stories,
        })
        console.log(req.params)
    } catch (err) {
        console.error(err)
        res.send('fuck')
 }
    })
    .get('/new', (req, res) => {
        res.render('new')
    })
    .post('/new', upload.array('file', 10), async (req, res) => {
        let incomingfiles = []
        req.files.forEach((FILE) => {
            incomingfiles.push(FILE.path)
        })
        console.log(incomingfiles[0])
        try {
            let newpost = new Post({
                file: incomingfiles,
                product_name: req.body.product_name,
                product_description: req.body.product_description,
                quantity: req.body.quantity,
                price: req.body.price
            })
            await newpost.save((err, succ) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/dashboard')
                    console.log('good');
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
module.exports = router