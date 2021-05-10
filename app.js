const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');



app.use(cors());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Middlewares

// app.use('/posts', ()=>{
//     console.log("this is a middleware running!");
// });


//ROUTES

app.get('/', (req, response) => {
    response.send('Hello warudo!');
});

//Connect to database

const port = 3000;

mongoose.connect("mongodb+srv://mruwa:rhino123@rest.n2nin.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {

    console.log('Connected to the database successfully!');

    app.listen(port, () => {
        console.log(`Server open, listening on: localhost:${port}`);
    });
});

//



