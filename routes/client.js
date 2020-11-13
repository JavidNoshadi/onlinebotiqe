const express = require('express')
const router = express.Router()
const User = require('../config/User.js')
router
.get('/',(req,res)=>{
    res.render('home')
})
.get('/user/dashboard', (req,res)=>{
    res.render('userDashboard')
})
.get('/login',(req,res)=>{
    res.render('login')
})
.get('/signup',(req,res)=>{
    res.render('signup')
})
.post('/login', async (req,res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    },(succ,err)=>{
        if(err){
            res.render('userDashboard')
        }else{
            res.render('login',{
                msg: `رمز عبور اشتباه است.`
            })
        }
    })
})

.post('/signup', async(req,res)=>{
    const user = await User.findOne({email: req.body.email},(succ,err)=>{
        if(err){
            res.render('signup',{
                msg: 'شما قبلا ثبت نام کرده اید.'
            })
        }else{
         if(req.body.password != req.body.password2){
             res.render('signup',{
                 msg: 'رمزهای عبور همخوانی ندارند.'
             })
         }else{
          User.create(req.body)
             res.render('userDashboard',{
                 msg: 'ثبت نام با موفقیت انجام شد.'
           })
         }
        }
    })
})
module.exports = router