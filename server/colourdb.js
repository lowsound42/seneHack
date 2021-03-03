const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ColourSchema = new Schema({
    _id:{
      type: Number,
      required: false
     },
    date:{
     type: Date,
     required: true
    },
    colour:{
     type: String,
     required: true
    }
}, {collection: "colours"});

const colourData = mongoose.model("colours", ColourSchema, "colourData")
module.exports = colourData;
