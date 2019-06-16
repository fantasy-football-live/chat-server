const mongoose = require('mongoose');
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/chat";
const connect = mongoose.connect(url, {
    useNewUrlParser: true
}).catch(err => console.log(err));

module.exports = connect;