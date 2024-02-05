const mongoose = require("mongoose");

const url = "mongodb+srv://rahyadav50:4fEE9lSf51x9H5bs@cluster1.jntkwpj.mongodb.net/";

const dbname = "Form-Data";

const connect = mongoose.connect(url+dbname, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connect;