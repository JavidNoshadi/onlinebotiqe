const express = require('express')
const router = express.Router()
const User = require('../config/User.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')



router
    .get('/', (req, res) => {
        res.render('home')
    })
    .get('/user/dashboard', (req, res) => {
        res.render('userDashboard',{
            msg2: req.flash('loggedin')
        })
    })
    .get('/login', (req, res) => {
        res.render('login',{
            msg2 : req.flash('info')
        })
    })
    .get('/signup', (req, res) => {
        res.render('signup')
    })
    
    .post('/signup', async(req,res)=>{
        try {
            User.findOne({email : req.body.email},
            function(err,success){
                if(success){
                    res.render('signup',{
                        msg: 'found one'
                    })
                }else{
                    User.create({email: req.body.email})
                    res.redirect('/signup/lastStep')
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
module.exports = router;