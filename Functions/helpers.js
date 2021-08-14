// const multer = require("multer")
// const slugify = require("slugify")


// exports.file_upload = (file)=>{
//     if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
//         const storage = multer.diskStorage({
//             destination: function(req,file,cb){
//                 cb(null, '../Uploads/profile_photos/');
//             },
//             filename: function(req,file,cb){
//                 cb(null, new Date().toISOString() + file.originalname)
//             }
//         })
//         return storage
//     }
//     if(file.mimetype === "application/pdf" || file.mimetype === "application/pkcs8" || file.mimetype === "application/zip"){
//         const storage = multer.diskStorage({
//             destination: function(req,file,cb){
//                 cb(null, '../Uploads/cv/');
//             },
//             filename: function(req,file,cb){
//                 cb(null, new Date().toISOString() + file.originalname)
//             }
//         })
//         return storage
//     }
// }

const nodemailer = require("nodemailer");
require('dotenv').config();

exports.SendMail = (to,subject,text,status)=>{
    let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.NODE_MAILER_ACCOUNT, // generated ethereal user
                    pass: process.env.NODE_MAILER_PASSWORD, // generated ethereal password
                },
            });
    
    let mailOptions = {
        from: process.env.NODE_MAILER_ACCOUNT,
        to: to,
        subject: 'Testing',
        text: 'IT works'
    }

    transporter.sendMail(mailOptions, function(err,data){
        if(err){
            console.log('Error: ', err)
        }else{
            console.log('Email send')
        }
    })

}
