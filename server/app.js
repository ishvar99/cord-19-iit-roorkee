const express = require('express')
const createNodes = require('../utils/createNodes')
const app =express();
const data = require('../data/literature.json')
const transformedData =require('../utils/transformData')(data.literatures);
const PORT =3000;
const connectDB=require('../database/db');
connectDB();
createNodes(transformedData);
app.listen(PORT,()=>{
 console.log(`Server is listening on PORT ${PORT}`);
})