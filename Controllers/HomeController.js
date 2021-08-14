const User = require("../Models/User");
const Admin = require("../Models/Admin");
const Psychologist = require("../Models/Psychologist");



exports.home = (req,res)=>{
    Psychologist.find({ approved_status: "Approved"}).then((psychologist)=>{
        res.status(200).send({psychologist:psychologist})
    })
}