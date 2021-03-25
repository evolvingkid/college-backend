const express = require('express');
const app = express();
var cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

connectDB();

app.use(express.json({
    extended: false
}));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const authRoutes = require('./routes/auth');
const departmentRoutes = require('./routes/department');
const userRoutes = require('./routes/user');
const programRoutes = require('./routes/program');
const examHallRoutes = require('./routes/examhall');

app.get('/', (req, res) => res.send('College API Running'));
app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/program', programRoutes);
app.use('/api/examhall', examHallRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server starts on  ${PORT}`));