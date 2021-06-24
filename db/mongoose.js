const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://demeter:OhyLZVWXe2WLE9NV@ceres.dois9.mongodb.net/CeresAPI?retryWrites=true&w=majority' || 'mongodb://localhost:27017/CeresAPI';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Success connection")
})
module.exports = { mongoose }