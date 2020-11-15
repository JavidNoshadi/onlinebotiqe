const express = require('express')
const router = express.Router()
const User = require('../config/User.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')

let hash = 


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
    
    .post('/signup', (req, res) => {
        const { username, email, password, password2 } = req.body
        let errors = []
        if (!username || !email || !password || !password2) {
            errors.push({ msg: 'لطفا فرم را کامل پر کنید' })
        }
        if (password != password2) {
            errors.push({ msg: 'رمزهای عبور همخوانی ندارند' })
        }
        if (password.length < 3) {
            errors.push({ msg: 'رمز عبور باید حداقل ۶ حرف باشد' })
        }
        if (errors.length > 0) {
            res.render('signup', {
                errors,
                username,
                email,
                password,
                password2
            })
            // If There is no Errors
        } else {
            User.findOne({ email: email }).then(user => {
                if (user) {
                    errors.push({ msg: 'شما قبلا با همین ایمیل ثبت نام کرده اید.' })
                    res.render('signup', {
                        errors,
                        username,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        username,
                        email,
                        password
                    })
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) { console.log(err) }
                        newUser.password = hash
                            newUser.save().then(user =>{
                                req.flash('info', 'ثبت نام انجام شد. ')
                                res.redirect('/login')
                            })
                            .catch(err => console.log(err))
                            
                            
                        })
                    })
                }
            })
        }
    })
.post('/login', async (req, res) => {
    let { email, password } = req.body
    let errors = []
    if (!email || !password) {
        errors.push({ msg: 'لطفا فرم را کامل پر کنید' })
    }
    //console.log(password)
   User.findOne({email: req.body.email, password: req.body.password}, function(err,res){
        if(err){
            console.log(err);
        }else{
           bcrypt.compare(password,hash).then(isMatch=>{
               if(isMatch){
                res.redirect('/user/dashboard')
               }else{
                   res.render('login',{
                       msg: 'you fcked'
                   })
               }
           })
        }
    })
    
})
module.exports = router;