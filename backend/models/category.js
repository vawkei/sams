const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please create a category by inserting a name"],
    maxlength: [10, "Length should'nt be more than 10 characters"],
    minlength: [3, "Length should'nt be less than 3 characters"]
  },
  slug:{
    type:String,
    unique:true,
    lowercase:true,
    index:true
  }
},{timestamps:true});

module.exports = mongoose.model("category",categorySchema)