//Requires
const multer = require("multer");
const slugify = require("slugify")
const jwt = require("jsonwebtoken")

// Helper
const helper = require("../Functions/helpers");

//Models
const User = require("../Models/User");
const Admin = require("../Models/Admin");
const Psychologist = require("../Models/Psychologist");

exports.login_post = (req,res)=>{
    const { email,password } = req.body
    Psychologist.findOne({email,approved_status:"Approved"},(error,psychologist)=>{
        if(psychologist){
            if(psychologist.password == password){
                jwt.sign({psychologist},process.env.SECRET_KEY_PSI,{expiresIn:"1h"},(err,token)=>{
                    if(err){
                        return res.status(500).send({message:"Bir hata meydana geldi."})
                    }
                    res.send({ token:token },200)
                })
            }else{
                res.status(401).send({message:'Şifreniz hatalı.'})
            }
        }else{
            res.status(401).send({message:'Böyle bir kullanıcı yok.'})
        }
    })
}

exports.dashboard = (req,res)=>{
    let id = req.body.id;
    Psychologist.findById(id).then((psychologist)=>{
        res.status(200).send({psychologist:psychologist})
    })
}

exports.settings = (req,res)=>{
    let id = req.body.id;
    Psychologist.findById(id).then(psychologist=>{
        res.status(200).send({psychologist:psychologist})
    })
}
exports.settings_post = (req,res)=>{
    let { firstName,lastName,email,about,start_time,end_time,id } = req.body
    let avaible_time = start_time + "-" + end_time
    if(req.body.password !== ""){
        let password = req.body.password
        Psychologist.findByIdAndUpdate(id, {firstName: firstName,lastName:lastName,email:email,password: password,about:about,avaible_time:avaible_time}).then(psychologist=>{
            res.status(201).send({message:"Başarılı bir şekilde güncellendi."})
        })
    }
    Psychologist.findByIdAndUpdate(id, {firstName: firstName,lastName:lastName,email:email,about:about,avaible_time:avaible_time}).then(psychologist=>{
        res.status(201).send({message:"Başarılı bir şekilde güncellendi."})
    })
}

exports.application_post = (req,res)=>{
    const { firstName,lastName, email ,university ,about, password } = req.body
    Psychologist.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        university:university,
        about:about,
        profile_path: req.files.profile_photos[0].path,
        cv: req.files.cv[0].path,
        password:password
    }).then(
        res.status(201).send({message:"Başvurunza en kısa sürede dönüş sağlanacaktır."})
    )
}