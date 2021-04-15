const mongoose =require('mongoose');
const connectDB = async () => {
 try {
   const conn = await mongoose.connect(
    "mongodb://localhost/cord-19",
     {
       useNewUrlParser: true,
       useCreateIndex: true,
       useFindAndModify: true
     }
   )
   console.log(`MongoDB Connected ${conn.connection.host}`)
 } catch (err) {
   console.log("MongoDB Connection Failed")
   console.log(`${err}`)
 }
}
module.exports = connectDB