const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

//Initializing the middlewares
app.use(express.json({ extended : false}));


//Define route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

//Connect to MongoDB
connectDB();

//Express Server started
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})