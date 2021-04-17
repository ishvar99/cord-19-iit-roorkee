const fs = require('fs');
const createNodes=(transformedData)=> Object.keys(transformedData).forEach((node)=>{
    // if(node==="Maths&Stats"){
    //     node="Maths";
    // }
 fs.writeFile(`Nodes/${node}.json`, JSON.stringify({[`${node}`]:[...transformedData[`${node}`]]},null,"\t"), function(err) {
     if(err) {
         return console.log(err);
     }
     console.log(`${node} Node created!`);
 }); 
})
module.exports = createNodes;