var mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  uname:String,
  uprice:Number,
  udetails:String,

})

var userModel = mongoose.model("user",userSchema);
module.exports = userModel;