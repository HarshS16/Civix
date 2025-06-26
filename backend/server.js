const express= require('express');
const cors=require('cors');
const helmet=require('helmet');
const xss= require('xss-clean');
const co0kieParser= require('cookie-parser');
const rateLimit = require('express-rate-limit');
const authRoutes=require('./routes/auth');
const issuesRoutes=require('./routes/issues');
const errorHandler=require('./middlewares/errorHandler');
const { specs, swaggerUi } = require('./config/swagger');
require('dotenv').config();

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(co0kieParser());

//rate limiting middleware 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });
app.use(limiter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//Routing 
app.use('/api/auth',authRoutes);
app.use('/api/issues',issuesRoutes);
app.use(errorHandler);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{

})




