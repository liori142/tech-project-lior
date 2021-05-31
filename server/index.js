const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const db = require('./DB')
const hrRouter = require('./api/hr/hrRouter')
const studentRouter = require('./api/student/studentRouter')
const jobOfferRouter = require('./api/jobOffer/jobOfferRouter')
const register_router = require('./api/register/register_router')
const passport = require('passport')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const passportFunc = require('./config/passport')
const smsRouter = require('./api/sms')

const path = require('path');

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: "http://localhost:4201"
            }
        ]
    },
    // apis:["./server/routes/students.js"]
    apis:["./server/api/student/*.js"]
}

 
const specs = swaggerJsDoc(options)

const app = express()
const PORT = process.env.PORT || 4201

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('view engine', 'ejs')
app.set('trust proxy', true);

db.on('error', () => {
    console.log(chalk.red('Connection error'))
})
app.listen(PORT, () => {
    console.log(`${chalk.green('tech_career-employers-team2')} ${chalk.yellow('live and up on port')} ${chalk.red(PORT)}`);
})


app.use(passport.initialize());
app.use('/register', register_router);
app.use('/hrs', hrRouter);
app.use('/students', studentRouter);
app.use('/jobOffers', jobOfferRouter);
app.use('/sms', smsRouter);


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}