import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import authRouter from './routes/authRoutes.js';
import homeRouter from './routes/homeRoutes.js';

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// set static folder
app.use(express.static('src/public'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        error: 'Too many requests, please try again later.',
    },
});

app.use(limiter);

// set the view engine to ejs
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use('/', authRouter);
app.use('/profile', homeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});