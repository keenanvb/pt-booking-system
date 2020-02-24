const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colours = require('colors')
const cors = require('cors')
const fileupload = require('express-fileupload')
const logger = require('./middleware/logger');
const morgan = require('morgan')
const path = require('path')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')

//load env variables
if (process.env.NODE_ENV == 'development') {
    dotenv.config({ path: './config/config-dev.env' });
} else if (process.env.NODE_ENV == 'production') {
    dotenv.config({ path: './config/config-prod.env' });
}

const app = express();

//crobjob
require('./utils/packageCronjob');

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
    // app.use(logger);
}

//connect to database
connectDB()


//fileupload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());


//Rate limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: {
        errors: [
            {
                msg: 'Too many requests from this IP, please try again after 10 minutes'
            }
        ]
    }
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Init middleware
app.use(express.json({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');
const packages = require('./routes/api/packages');
const contact = require('./routes/api/contact');
const adminManageProfile = require('./routes/api/adminManageProfile');
const session = require('./routes/api/session');
const booking = require('./routes/api/booking');

//use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/auth', auth);
app.use('/api/packages', packages);
app.use('/api/contact', contact);
app.use('/api/admin-manage-profile', adminManageProfile);
app.use('/api/session', session);
app.use('/api/booking', booking);


//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`.yellow.bold)
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
    console.log(`Error: ${error.message}`.red);
    server.close(() => {
        process.exit(1);
    })
})