const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken")

//Models
const User = require("../Models/User");
const Admin = require("../Models/Admin");
const Psychologist = require("../Models/Psychologist");
const Psychology_Fields = require("../Models/Psychology_Fields");
const Appointment = require("../Models/Appointment");
const Helper = require('../Functions/helpers');

// dotnev config
dotenv.config();

// Module 

exports.appointment = (req,res)=>{
    let psychologist_id = req.params.psychologist_id
    Psychologist.findById(psychologist_id).then((psychologist)=>{
        res.status(200).send({psychologist:psychologist})
    })
}

exports.appointment_post = async(req,res) =>{
    let auth = await User.findById(req.session.userId)
    let { psychologist_id, appointment_date ,appointment_time } = req.body
    console.log(appointment_date,appointment_time)
    Appointment.create({
        room_id: uuidv4(),
        psychologist_id: psychologist_id,
        user_id: req.session.userId,
        appointment_date : appointment_date,
        appointment_time : appointment_time
    }).then((booking)=>{
        Helper.SendMail(auth.email)
        res.status(200);
    })
}

exports.check_avaible_date = (req,res)=>{
    let psychologist_id = req.body.psychologist_id
    Appointment.find({appointment_date: req.body.date}).then((appointment =>{
        if(appointment.length){
            Psychologist.findById(psychologist_id).then((psychologist)=>{
                let hours = psychologist.avaible_time.split("-")
                let hour_start_str = hours[0].split(":")
                let hour_start_number = Number(hour_start_str[0]) 
                let hour_end_str = hours[1].split(":")
                let hour_end_number = Number(hour_end_str[0])
                let avaible_time = []
                for(; hour_start_number < hour_end_number ;){
                    let status = true
                    appointment.forEach(appointment => {
                        if(status){
                            let appointment_time = appointment.appointment_time.split(":")
                            if(Number(appointment_time[0]) == hour_start_number){
                                status = false
                                }
                        }
                    });
                    if(status){
                        avaible_time.push(hour_start_number)
                    }else{
                        status = true
                    }
                    hour_start_number++
                }
                res.json(avaible_time)
            })
        }else{
            Psychologist.findById(psychologist_id).then((psychologist)=>{
                let hours = psychologist.avaible_time.split("-")
                let hour_start_str = hours[0].split(":")
                let hour_start_number = Number(hour_start_str[0]) 
                let hour_end_str = hours[1].split(":")
                let hour_end_number = Number(hour_end_str[0])
                let avaible_time = []
                for(; hour_start_number < hour_end_number ;){
                    avaible_time.push(hour_start_number)
                    hour_start_number++
                }
                res.json(avaible_time)
            })
        }
    }))
}

exports.room = (req,res)=>{
    res.status(200).send( { roomId: req.params.room })
}

