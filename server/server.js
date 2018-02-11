const http = require('http');
const express = require('express');
const PORT = process.env.port || 3000;
const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, ()=>{
    console.log('initalized server');
});