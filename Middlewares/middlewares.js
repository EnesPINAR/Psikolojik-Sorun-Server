//Models
const Admin = require("../Models/Admin");
const Psychologist = require("../Models/Psychologist");

const jwt = require("jsonwebtoken")

exports.AuthControl = (req,res,next)=>{
    let token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        token = token.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(401).send({message:"Unauthentication."})
            }else{
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}

exports.isAdmin = (req,res,next)=>{

    let token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        token = token.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY_AD,(err,user)=>{
            if(err){
                return res.status(401).send({message:"Unauthentication."})
            }else{
                next()
            }
        })

    }else{
        res.status(401).send({message:"Giriş yapmalısınız"})
    }
}

exports.isPsychologist = (req,res,next)=>{
    let token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        token = token.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY_PSI,(err,user)=>{
            if(err){
                return res.status(401).send({message:"Unauthentication."})
            }else{
                next()
            }
        })
    }else{
        res.status(401).send({message:"Giriş yapmalısınız"})
    }
}

exports.RoomControl = (req,res,next)=>{

    let token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        token = token.split(" ")[1];
        jwt.verify(token,process.env.SECRET_KEY_PSI,(err,user)=>{
            if(err){
                jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
                    if(err){
                        return res.status(401).send({message:"Unauthentication."})
                    }else{
                        next()
                    }
                })
            }else{
                next()
            }
        })
    }else{
        res.status(401).send({message:"Giriş yapmalısınız"})
    }
}