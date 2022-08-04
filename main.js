const express = require('express')
const path = require('path');
const app = express()
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.use('/static',express.static(__dirname+'/static'))
//ejs
app.engine('.html',require('ejs').__express)
app.set('views',path.join(__dirname,'pages'))
app.set('view engine','html')

app.get('/',(req,res)=>{
    res.render('home',{title:'Home Page'})
})

app.get('/tips',(req,resp)=>{
    resp.render('tips',{title:'Tips Page'})
})
app.get('/consequences',(req,resp)=>{
    resp.render('consequences',{title:'Consequences Page'})
})


app.listen(80)