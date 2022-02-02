const express = require("express");
const blogRoutes = require('./routes/blogRoutes');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

mongoose.connect('mongodb+srv://priyadrsni:Pries109999@blogcluster.bgc1e.mongodb.net/blogdb?retryWrites=true&w=majority')
.then((result) => {
    app.listen(port, (err) => {
        if(err) {
            console.log(err);
        }
        console.log(`Server is up and running in port http://localhost:${port}`);
    });
})
.catch ((err) => {
    console.log(err);
});

app.use(express.json());
app.set("view engine", "ejs");

app.use(blogRoutes);