const express = require('express')
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express()
//ejs

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem'))
};

app.engine('.html',require('ejs').__express)
app.set('views',path.join(__dirname,'pages'))
app.set('view engine','html')

app.get('/',(req,res)=>{
    res.render('home')
})



app.listen(80)

const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(443);
