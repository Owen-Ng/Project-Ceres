const mongoose = require('mongoose');

const City = mongoose.model('City', {
    Cities: [{type:Number}]
});

module.exports = { City }