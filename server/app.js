const express = require('express')
const createNodes = require('../utils/createNodes')
const app =express();
app.set("view engine","ejs");
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
app.listen(PORT,()=>{
 console.log(`Server is listening on PORT ${PORT}`);
})