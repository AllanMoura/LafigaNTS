const mongoose = require('mongoose');
//conexão online de uma database mongo no site mongodb.atlas
const MONGOURI = "mongodb+srv://<username>:<senha>@lafiganotebook-pcpwd.mongodb.net/LafigaNTdb?retryWrites=true&w=majority"

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