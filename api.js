const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

app.use(express.json({
    extended: false
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/department');
const userRoutes = require('./routes/user');
const programRoutes = require('./routes/program');
const examHallRoutes = require('./routes/examhall');
const courseRoutes = require('./routes/course');
const studentRoutes = require('./routes/student');

app.get('/', (req, res) => res.send('College API Running'));
app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/program', programRoutes);
app.use('/api/examhall', examHallRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/student', studentRoutes);

module.exports = app;