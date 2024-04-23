const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyparser = require("body-parser")
const path = require("path");
router.use(bodyparser.urlencoded({extended:true}));
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})
router.get("/calculator.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'calculator.html'));
})
router.get("/login.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'));
})
router.get("/dashboard.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'dashboard.html'));
})
router.get("/signup.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'signup.html'));
})
router.get("/index.html",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})
mongoose.connect('mongodb://localhost:27017/muskan');
const Scema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const Model = mongoose.model('formData',Scema);
router.post("/signup.html",(req,res)=>{
    const{username,email,password} = req.body;
    console.log(req.body);
    const data = new Model({username,email,password});
    data.save();
    res.redirect('/data');
})
router.get("/data",(req,res)=>{
    let flg = false;
    Model.find().then(data=>{
        data.forEach(element=>{
            console.log(element);
        })
        res.redirect("/index.html")
    })
})
router.post("/login.html",(req,res)=>{
    const{email,password} = req.body;
    // console.log(username);
    console.log(req.body);
    let cnt = 0;
    Model.find().then(data=>{
        data.forEach(element=>{
            if(element.email==email&&element.password==password){
                cnt = 1;
            }
        })
        if(cnt==0){
            res.send("Invalid email or password!");
        }
        else{
            res.redirect('/index.html');
        }
    })
})

module.exports = router;
