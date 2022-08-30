'use strict';
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const armyDataSchema = new Schema({
    Name: String,
    Sex: String,
    Rank: String,
    Phone: String,
    Email: String,
    Avatar:String,
    Superior:Array,
    NumberOfDS:Array,
    StartDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ArmyData', armyDataSchema);
