const jwt = require('jsonwebtoken')
exports.authorize =async (req,res,next)=>{
 const token = req.cookies['token']
 if (!token) {
  return res.redirect('/admin')
}
 try {
  await jwt.verify(token, "random-secret")
  next()
} catch (error) {
  console.log(error);
 return res.redirect('/admin')
}
}
exports.redirect =async (req,res,next)=>{
 const token = req.cookies['token']
 if (!token) {
  next();
}
 try {
  await jwt.verify(token, "random-secret")
  res.redirect('/admin/upload');
} catch (error) {
 next();
}
}