const express = require('express')
const fs = require('fs');
const app =express();
const data = require('../data/literature.json')
const transform =require('../utils/transform')
const transformedData =transform(data.literatures);
const PORT =3000;
const connectDB=require('../database/db');
connectDB();
fs.writeFile("processed.json", JSON.stringify(transformedData,null,"\t"),'utf8', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Data Structure created!");
}); 
app.listen(PORT,()=>{
 console.log(`Server is listening on PORT ${PORT}`);
})