const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app  = express()

const errorMiddleware = require('./middleware/error');

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static('public'));

const userRoute = require('./routes/userRoutes')
const serviceRoute = require('./routes/servicesRoute')
const bookingRoute = require('./routes/bookingRoute')
const reviewRoute = require('./routes/reviewRoute');
const dashboardRoute = require('./routes/dashboardRoute')

app.use('/api/v1/user',userRoute)
app.use('/api/v1/services',serviceRoute)
app.use('/api/v1/bookings',bookingRoute)
app.use('/api/v1/reviews',reviewRoute)
app.use('/api/v1/dashboard',dashboardRoute)


app.use(errorMiddleware)

module.exports =app;
