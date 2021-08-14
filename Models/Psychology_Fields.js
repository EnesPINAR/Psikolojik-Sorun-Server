const mongoose = require("mongoose");

const Psychology_Fields_Schema = new mongoose.Schema({
    fieldsName: { type: String, require:true},
    slug: { type: String, require: true},
    created_at: { type: Date,
         default: Date.now()
        }
});

module.exports = mongoose.model('Psychology_Fields', Psychology_Fields_Schema)