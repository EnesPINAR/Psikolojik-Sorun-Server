const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
    room_id: { type:String, required:true },
    psychologist_id: { type: Schema.Types.ObjectId, ref:"psychologists", required:true},
    user_id: { type: Schema.Types.ObjectId, ref:"users", required:true},
    appointment_date : { type: String, required:true},
    appointment_time : { type: String, required:true},
    created_at: { type: Date,
         default: Date.now()
        }
});

module.exports = mongoose.model('Appointment', AppointmentSchema)