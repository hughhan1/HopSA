var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PsaSchema = new Schema({
    user: {
        type: String,
        required: true
    }
    name: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    location: {
    	name: String,
    	lat: Number,
        lon: Number,
        required: true
    }
});

mongoose.model('Psa', PsaSchema);