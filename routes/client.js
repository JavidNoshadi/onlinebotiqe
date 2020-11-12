const express = require('express')
const router = express.Router()

router
.get('/',(req,res)=>{
    res.render('home')
})
.get('/login',(req,res)=>{
    res.render('login')
})
.get('/signup',(req,res)=>{
    res.render('signup')
})

module.exports = router