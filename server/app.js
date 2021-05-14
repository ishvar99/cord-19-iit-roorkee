require('dotenv').config()
const express = require('express')
const createNodes = require('../utils/createNodes')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const app =express();
app.use(express.json())
app.use(cookieParser())
app.set("view engine","ejs");
const {authorize,redirect}= require("../middlewares/authorize")
const data = require('../data/literature.json')
const transformedData =require('../utils/transformData')(data.literatures);
const PORT =3000;
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect("mongodb://localhost/cord-19",{ useUnifiedTopology: true }, function(err, client) {
  if(err) return console.error(err);
  db = client.db("cord-19"); 
  console.log("MongoDB connected successfully!")
 })

createNodes(transformedData);
app.get('/',(req,res)=>{
  res.render('home',{data: Object.keys(transformedData)})
})
app.post('/query/:type',(req,res)=>{
 const {type}=req.params
  db.collection(type).find({}).toArray(function(error,result){
   if(error){
    return res.json({success:"false",error});
   }
   return res.json({success:"true",data: result[0][type]})
  });
})
app.get('/admin/upload',authorize,(req,res)=>{
  res.render('upload')
})
app.get('/admin',redirect, (req,res)=>{
  res.render('admin')
})
app.post('/logout',(req,res)=>{
  res.clearCookie('token')
  return res.json({ success: true })
})
app.post('/validate',async(req,res)=>{
  const {email,password}=req.body
  if(email === process.env.EMAIL  && password=== process.env.PASSWORD){
    let token = await jwt.sign({ id: email+password }, "random-secret", {
      expiresIn: 3 * 24 * 60 * 60 * 1000 //3 days
    });
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }
    res.cookie("token", token, options)
    return res.json({success:true});
  }
  return res.json({success:false});
})
app.listen(PORT,()=>{
 console.log(`Server is listening on PORT ${PORT}`);
})