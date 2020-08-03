/* Family mongoose model */
const mongoose = require('mongoose');

const Family = mongoose.model('Family', {
    familyName: {
        type: String,
         required: true,
         minlength:1
    },
    tribes: {
        type: Array,
        required: true
    }
});

module.exports = { Family }