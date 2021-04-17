const data = require('../data/literature.json')
const transformedData =require('../utils/transformData')(data.literatures);
const { exec } = require("child_process");
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect("mongodb://localhost/cord-19",{ useUnifiedTopology: true }, function(err, client) {
  if(err) return console.error(err);
  db = client.db("cord-19"); 
  console.log("MongoDB connected successfully!")
 })
const importData = async () => {
  await destroyData();
  Object.keys(transformedData).forEach((node)=>{ 
 exec(`mongoimport --db cord-19 --collection ${node} --file ${node}.json`, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`); 
})
});
}

const destroyData = async () => {
Object.keys(transformedData).forEach((node)=>{ 
 exec(`mongo cord-19 --eval db.${node}.drop()`, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`); 
})
});
}
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}