const http = require('http');
const express = require('express');
const PORT = process.env.port || 3000;
const app = express();

//setup static assets folder
app.use(express.static(`${__dirname}/public`));


//redirect all routes to the same file since routes are handled by front end
app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, ()=>{
    console.log('initalized server');
});