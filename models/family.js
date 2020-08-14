/* Family mongoose model */
const mongoose = require("mongoose");

const Family = mongoose.model("Family", {
    familyName: {
        type: String,
        required: true,
        minlength: 1,
    },
    tribes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tribe",
        required: true,
    },
    offers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
    pending: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tribe",
        required: true,
    },
    
});

module.exports = { Family };
