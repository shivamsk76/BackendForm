const express = require ('express')
const router = express.Router();
const db = require('../model/DataStore')




router.post('/registration',async (req,res)=>{ 

    console.log(req.headers)
    console.log(req.body);
    db.create({
               Firstname:req.body.Firstname,
                   Lastname:req.body.Lastname,
                   Fathername:req.body.Fathername,
                   Mothername:req.body.Mothername,
                   Mobile:req.body.Mobile
           }).then(res.send("successfully Registered"))
      
})


module.exports = router