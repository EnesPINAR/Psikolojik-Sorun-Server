const slugify = require('slugify')
//Models
const User = require("../Models/User");
const Admin = require("../Models/Admin");
const Psychologist = require("../Models/Psychologist");
const Psychology_Fields = require("../Models/Psychology_Fields");

exports.login_post = (req,res)=>{
    const {email, password} = req.body
    Admin.findOne({email},(error,admin)=>{
        if(admin){
            if(admin.password == password){
                jwt.sign({admin},process.env.SECRET_KEY_AD,{expiresIn:"1h"},(err,token)=>{
                    res.send({ token:token },200)
                })
            }else{
                res.status(401).send({message:'Şifreniz hatalı.'})
            }
        }else{
            res.status(401).send({message:'Böyle bir kullanıcı yok'})
        }
    })
}

exports.home = (req,res)=>{
    let id = req.body.id
    Admin.findById(id).then((admin)=>{
        res.status(200)
    })
}

exports.dashboard = (req,res)=>{
    let id = req.body.id
    Admin.findById(id).then((admin)=>{
        Psychologist.find({approved_status: "Waiting"}).then(psychologist=>{
            res.status(200).send({admin:admin,psychologist:psychologist})
        })
    })
}

exports.inspect_psychologist = (req,res)=>{
    Psychologist.findById(req.params.psychologist_id).then(psychologist=>{
       res.status(200).send({psychologist:psychologist})
    })
}

exports.approve = (req,res)=>{
    let id = req.body.id;
    Psychologist.findByIdAndUpdate(id, {approved_status: "Approved"}).then(
        res.status(200)
    )
}

exports.psychology_fields = (req,res) => {
    Psychology_Fields.find({}).then(psychology_fields=>{
        res.status(200).send({psychology_fields:psychology_fields})
    })
}

exports.psychology_fields_add = (req,res) => {
   let fieldsName = req.body.fieldsName
   Psychology_Fields.create({
        fieldsName: fieldsName,
        slug: slugify(fieldsName)
   }).then(res.status(201).send({message:"Başarılı bir şekilde kayıt yapılmıştır."}))
}