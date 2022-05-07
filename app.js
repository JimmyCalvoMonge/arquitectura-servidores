require('dotenv').config();

// Accesar variables del .env como
// process.env.<VARNAME>

const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');

const app = express();

//Configs
require('./config/db.config');

// Middlewares
app.use(morgan('dev')); // Logs
app.use(express.json()); // Procesa el body de una petición. El siguiente middleware tiene esa información disponible.

// Routes
const routes = require("./config/routes.config");
app.use("/",routes);

// Error handling

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Application running on port ${port}.`)
})