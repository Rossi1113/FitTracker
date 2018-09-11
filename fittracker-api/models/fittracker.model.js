var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')  // for pagination

// Set up the schema
var FitTrackerSchema = new mongoose.Schema({
    excercise: String,
    category: String,
    duration: String,
    calory: Number,
    date: Date
})

FitTrackerSchema.plugin(mongoosePaginate)
// Generate the collection with the schema ???
const FitTracker = mongoose.model('FitTracker', FitTrackerSchema)

// After this, FitTracker will have some default db methods
// like findById(), save(), remove(), paginate()
// you get these from mongoose for free which is awesome 

module.exports = FitTracker;