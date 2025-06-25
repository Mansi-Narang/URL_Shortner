const mongoose = require('mongoose');
const urlSchema = require('../Schemas/url');
const model = mongoose.model;

const url = new model("url", urlSchema);

module.exports = url;