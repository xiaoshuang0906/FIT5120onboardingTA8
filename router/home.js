const express = require('express')
const path = require('path');
const app = express()
//ejs
app.engine('.html',require('ejs').__express)
app.set('views',path.join(__dirname,'pages'))
app.set('view engine','html')

app.get('/',(req,res)=>{
    res.render('home')
})



app.listen(80)