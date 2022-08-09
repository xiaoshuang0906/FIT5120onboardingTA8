const express = require('express')
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express()
const axios = require('axios');
const { type } = require('os');
const tips = require('./db/tips')
const destination = require('./db/destination')

var parseString = require('xml2js').parseString;
var request = require("request");

const openUVAPIConfig = {
    headers:
     { 'content-type': 'application/json',
       'x-access-token': '02508878b3edc495c7aed73a1a6b0fa3' }
    }


app.use('/static',express.static(__dirname+'/static'))
//ejs

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "./certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "./certs/cert.pem"))
}

app.engine('.html',require('ejs').__express)
app.set('views',path.join(__dirname,'pages'))
app.set('view engine','html')




app.get('/', async (req,res)=>{
    const allTips = await tips.getAll()
    axios.get('https://uvdata.arpansa.gov.au/xml/uvvalues.xml')
    .then(response => {``
        parseString(response.data, function (err, result) {
            result['stations']['location'].forEach(element => {
                if(element['name']=='mel') {
                    let uvindex = element['index'][0]
                    if(uvindex<=2){
                        color = 'layui-btn'
                        text = 'Low'
                    }else if(3<=uvindex<=5){
                        color = 'layui-btn-warm'
                        text = 'Medium'
                    }else if(uvindex>5){
                        color = 'layui-btn-danger'
                        text = 'High'
                    }
                    data = allTips[parseInt(uvindex)]
                    res.render('home',{title:'Home Page',uv:uvindex,color:color,text:text,data:data})
                }
            });
        });
    })
    .catch(error => {
        console.log(error);
    });
})




app.get('/weather',(req,res)=>{
    var options = { method: 'GET',
    url: 'https://api.openuv.io/api/v1/uv',
    qs: { lat: ' -38.733826', lng: '143.687271'},
    headers:
     { 'content-type': 'application/json',
       'x-access-token': 'c695bd78f9caebf56cd0fe238a0103ed' } };
   
   request(options, function (error, response, body) {
    console.log(1111)
     if (error) throw new Error(error);
     res.send(JSON.parse(body))
   });
})



app.get('/destination',async (req, resp)=>{
    const allTips = await destination.getAll()
    // console.log(allTips)
    let lat = [allTips[0].lat,allTips[1].lat,allTips[2].lat,allTips[3].lat]
    let lon = [allTips[0].lon,allTips[1].lon,allTips[2].lon,allTips[3].lon]
    let tips = [allTips[0].tips,allTips[1].tips,allTips[2].tips,allTips[3].tips]

    let baseURL = 'https://api.openuv.io/api/v1/uv?'
    let url1 = baseURL+'lat='+lat[0]+'&lng='+lon[0]
    let url2 = baseURL+'lat='+lat[1]+'&lng='+lon[1]
    let url3 = baseURL+'lat='+lat[2]+'&lng='+lon[2]
    let url4 = baseURL+'lat='+lat[3]+'&lng='+lon[3]

    //request the uv and max uv
    axios.all([
        axios.get(url1,openUVAPIConfig),
        axios.get(url2,openUVAPIConfig),
        axios.get(url3,openUVAPIConfig),
        axios.get(url4,openUVAPIConfig)
      ]).then(axios.spread((res1, res2,res3,res4) => {

        // console.log(res1.data)
        let uv = [res1.data.result.uv,res2.data.result.uv,res3.data.result.uv,res4.data.result.uv]
        let maxuv = [res1.data.result.uv_max,res2.data.result.uv_max,res3.data.result.uv_max,res4.data.result.uv_max]
        resp.render('tips',{title:'Tourist Destinations UV & Tips',uv:uv,maxuv:maxuv,tips:tips})
        // console.log(uv)
        // console.log(maxuv)
      })).catch(err => {
        let uv = ['0.3','0.1','0.2','0.1']
        let maxuv = ['0.4','0.35','0.312','0.33']
        resp.render('tips',{title:'Tourist Destinations UV & Tips',uv:uv,maxuv:maxuv,tips:tips})
      });

})


app.get('/test',(req,resp)=>{
    resp.render('tips',{title:'Tourist Destinations UV & Tips'})
})


app.listen(80)

const sslserver = https.createServer(httpsOptions, app);

sslserver.listen(443);
