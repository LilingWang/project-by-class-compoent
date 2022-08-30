'use strict';
const express    = require('express');        

const app        = express();                 

const router = require('./router');

const mongoose   = require('mongoose');
// connect
mongoose.connect('mongodb+srv://lwang:13579@cluster0.maprs.mongodb.net/project1?retryWrites=true&w=majority',
					{useNewUrlParser: true, useUnifiedTopology: true});

//this is the first connection we use by default
let db = mongoose.connection;
db.on('error',  err=>console.log(err));
db.on('open', ()=>console.log('database opened'));
db.on('close', ()=>console.log('database closed'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req,res,next)=>{console.log('request: ', req.method, ' ', req.url); next();});
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

const port = process.env.PORT || 4005; 


app.use('/ArmyData', router);

app.get('/', (req, res) => {
                res.json({ message: 'hooray! welcome to our home!' });   
});

app.listen(port, () => {
                console.log('Magic happens on port ' + port)}
);

