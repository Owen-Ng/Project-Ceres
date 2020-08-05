/* Family mongoose model */
const mongoose = require('mongoose');

const Tribe = mongoose.model('Tribe', {
    tribeName: {
        type: String,
         required: true,
         minlength:1
    },
    offers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true
    }
});

module.exports = { Tribe }