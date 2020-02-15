const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const InitateMongoServer = require('./config/db');

InitateMongoServer();

const app = express();

const PORT = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({message: "API Funcionando"});
});

app.use('/api', require('./src/routes'));

app.listen(PORT, (req, res) => {
    console.log(`Server Started at port ${PORT}`);
});