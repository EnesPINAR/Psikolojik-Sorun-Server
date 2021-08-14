const mongoose = require("mongoose");

const PsychologistSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{type:String, required:true,unique: true},
    university: {type:String,required:true},
    about:{type:String,required:true},
    profile_path:{type:String,required:true},
    score:{type:Number ,default:0},
    approved_status:{type:String,default:"Waiting"},
    status:{type:String, default:"offline"},
    cv:{type:String,required:true},
    avaible_time : { type:String },
    password: {type:String, required:true},
    created_at: { type: Date,
         default: Date.now()
        }
});

module.exports = mongoose.model('Psychologist', PsychologistSchema)