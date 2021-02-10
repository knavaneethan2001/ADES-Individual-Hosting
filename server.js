const express=require('express');
const serveStatic=require('serve-static');

var hostname="localhost";
var port=5500;

var app=express();

app.use(serveStatic(__dirname+"/"));

//console.log(__dirname)
app.listen(port,hostname,function(){

    console.log(`Server hosted at http://${hostname}:${port}`);
});