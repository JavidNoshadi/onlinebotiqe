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
    .get('/:id', async(req,res)=>{
        const singlePost = await Post.findById(req.params.id).populate('user').lean()
        res.render('single',{
            singlePost
        })
    })
    .post('/:id', async(req,res)=>{
     await Post.remove({_id: req.params.id})
            res.redirect('/dashboard')
    })
    .get('/edit/:id', async(req,res)=>{
        const toEdit = await Post.findOne({_id: req.params.id}).lean()
        res.render('edit',{
            toEdit
        })
    })
    .post('/edit/:id', async(req,res)=>{
        await Post.findOneAndUpdate({_id: req.params.id},req.body)
        res.redirect('/dashboard')
    })
    
    
module.exports = router