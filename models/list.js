/* List and Item models */

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item: {
        type: String,
        minlength: 1,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ListSchema = new mongoose.Schema({
    listname: {
        type: String,
        minlength: 1,
        required: true
    },
    items: [ItemSchema],
    familyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',
        required: true
    },
    shared: {
        type: Boolean,
        required: true
    }
});

const List = mongoose.model('List', ListSchema);

module.exports = { List };