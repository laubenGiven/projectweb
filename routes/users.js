const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('users',{})
})
router.post('/register', (req, res) => {
    // handle user registration
    res.render('userRegister')
    });

router.get('/profile', (req, res) => {
        // handle user profile
        res.render('user')
        });

router.delete('/:id', (req, res) => {
            // handle product deletion
            });
module.exports = router