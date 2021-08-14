const express = require("express");
const multer  = require("multer");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

//Middlewares
const Middlewares = require("../Middlewares/middlewares");

//Function Helpers
const helpers = require("../Functions/helpers")

//Controllers
const UserController = require("../Controllers/UserController");
const AdminController = require("../Controllers/AdminController");
const PsychologistController = require("../Controllers/PsychologistController");
const PaymentController = require("../Controllers/PaymentController");
const HomeController = require("../Controllers/HomeController");

//Multer Setting MODÜLER YAP !!
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'public/upload/');
    },
    filename: function(req,file,cb){
        cb(null,uuidv4()+"."+file.originalname.split(".")[1])
    }
})

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

// Home 
router.get("/",HomeController.home)

// Psychologist
router.post("/application",upload.fields([{ name: 'profile_photos', maxCount: 1 },{ name: 'cv', maxCount: 1 }]),PsychologistController.application_post)
router.post("/psychologist/login",PsychologistController.login_post)
router.get("/psychologist/dashboard",Middlewares.isPsychologist,PsychologistController.dashboard)
router.get("/psychologist/settings",Middlewares.isPsychologist,PsychologistController.settings)
router.post("/psychologist/settings",Middlewares.isPsychologist,PsychologistController.settings_post)

// Payment
router.get("/appointment/:psychologist_id",Middlewares.AuthControl,PaymentController.appointment)
router.post("/appointment",Middlewares.AuthControl,PaymentController.appointment_post)
router.post("/appointment/check_date/",Middlewares.AuthControl,PaymentController.check_avaible_date)
router.get("/room/:room",Middlewares.RoomControl,PaymentController.room)

// User
router.post("/login",UserController.login_post)
router.post("/register",UserController.register_post)
router.get("/settings",Middlewares.AuthControl,UserController.settings)
router.post("/settings",Middlewares.AuthControl,UserController.settings_post)
router.get("/dashboard",Middlewares.AuthControl , UserController.dashboard)
router.get("/appointments",Middlewares.AuthControl , UserController.appointment)

// Admin
router.post("/admin/login",AdminController.login_post)
router.get("/admin",Middlewares.isAdmin,AdminController.home)
router.get("/admin/dashboard",Middlewares.isAdmin,AdminController.dashboard)
router.get("/admin/dashboard/inspect/:psychologist_id",Middlewares.isAdmin,AdminController.inspect_psychologist)
router.post("/admin/approve",Middlewares.isAdmin,AdminController.approve)
router.get("/admin/psychology_fields",Middlewares.isAdmin,AdminController.psychology_fields)
router.post("/admin/psychology_fields/add",Middlewares.isAdmin,AdminController.psychology_fields_add)

module.exports = router;