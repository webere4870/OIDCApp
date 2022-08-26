let mongoose = require('mongoose')

class Database
{
    constructor()
    {
        this.connect()
    }
    connect()
    {
        mongoose.connect("mongodb://localhost:27017/test")
    }
};

module.exports = new Database()