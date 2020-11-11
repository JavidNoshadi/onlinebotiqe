const express = require('express')
const routeri = express.router

router.get('/',(req,res)=>{
    res.send(req)
})


module.exports = routeri