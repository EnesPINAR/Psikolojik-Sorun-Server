//Models
const User = require("../Models/User");
const Admin = require("../Models/Admin");
const Psychologist = require("../Models/Psychologist");
const Appointment = require("../Models/Appointment");

// Require
const jwt = require("jsonwebtoken");

exports.dashboard = (req,res)=>{
    let id = req.body.id;
    User.findById(id).then((user)=>{
        res.status(200).send({user:user})
    })
}

exports.login_post = (req,res)=>{
    const {email, password} = req.body
    User.findOne({email},(error,user)=>{
        if(user){
            if(user.password == password){
                jwt.sign({user},process.env.SECRET_KEY,{expiresIn:"1h"},(err,token)=>{
                    res.send({ token:token,user:user },200)
                })
            }else{
                res.status(401).send({message:'Şifreniz hatalı.'})
            }
        }else{
            res.status(401).send({message:'Böyle bir kullanıcı yok'})
        }
    })
}

exports.register_post = (req,res)=>{
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let old = req.body.old
    User.create({
        firstName: firstName,
        lastName:lastName,
        email: email,
        password: password,
        old:old
    }).then((err,success)=>{
        if(success){
            return res.status(201).send("Başarıyla kayıt yapılmıştır.")
        }else{
            return res.status(500).send("Bir hata meydana geldi.")
        }
    })
    res.redirect("/dashboard")
}

exports.settings = (req,res)=>{
    let id = req.body.id;
    User.findById(id).then(user=>{
        res.status(200).send({user:user})
    })
}

exports.settings_post = (req,res)=>{
    let { firstName,lastName,email,id } = req.body
    if(req.body.password !== ""){
        let password = req.body.password
        User.findByIdAndUpdate(id, {firstName: firstName,lastName:lastName,email:email,password: password}).then(user=>{
            res.status(201).send({messsage:"Başarılı bir şekilde güncellendi."})
        })
    }
    User.findByIdAndUpdate(id, {firstName: firstName,lastName:lastName,email:email}).then(user=>{
        res.status(201).send({messsage:"Başarılı bir şekilde güncellendi."})
    })
}

exports.appointment = (req,res) =>{
    let id = req.body.id;
    Appointment.find({user_id : id}).populate({path:'psychologist_id',model: Psychologist}).then(appointments =>{
        res.status(200).send({appointments:appointments})
    })
}