const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('Tenant',{})
})

module.exports = router