const mongoose = require('mongoose');

const MONGOURI = "mongodb+srv://montbland:allan123@lafiganotebook-pcpwd.mongodb.net/LafigaNTdb?retryWrites=true&w=majority"

const InitateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to DB");
    } catch(e){
        console.log(e);
        throw e;
    }
};

module.exports = InitateMongoServer;