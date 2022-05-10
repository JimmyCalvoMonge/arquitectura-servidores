require('dotenv').config();

// Accesar variables del .env como
// process.env.<VARNAME>



const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');

const app = express();

//Configs
require('./config/db.config');

// Middlewares //
app.use(morgan('dev')); // Logs
app.use(express.json()); // Procesa el body de una petición. El siguiente middleware tiene esa información disponible.

// Routes //
const routes = require("./config/routes.config");
app.use("/",routes);

// Error handling
app.use((error,req, res, next)=>{

    if (error instanceof mongoose.Error.ValidationError){
        error=createError(400, error);
    }
    console.error(error)
    const data= {};
    data.message= error.message;

    if (error.errors) {
        data.errors = Object.keys(error.errors).reduce(
            (errors,key) =>({
                ...errors,
                [key]: error.errors[key]?.message || error.errors(key),
            }),
            {}
        );
    }

    res.status(error.status).json(data);
})

const port = process.env.PORT || 8000;
////////////
app.listen(port, ()=>{
    console.log(process.env.EMAIL)
    console.log(process.env.EMAIL_PASS)
    console.log(`Application running on port ${port}.`)
})