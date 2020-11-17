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
            const user = User.findOne({email : req.body.email},(success,error)=>{
                if(success){
                    console.log('foundone');
                    return
                }else{
                    console.log('didnt find');
                    User.create(req.body)
                }
            })
        } catch (error) {
            console.log(error);
        }
    })
module.exports = router;