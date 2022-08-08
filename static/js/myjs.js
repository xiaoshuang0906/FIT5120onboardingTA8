window.onload = function(){
   changeHlight()
}

// function queryUVindex(){
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState == 4 ){
//             var xmldom = xhr.responseXML;
//             var locations = xmldom.getElementsByTagName('location');
        
//             var uvindex ="";
//             for(var i=0; i<locations.length; i++){
//                 if(locations[i].getElementsByTagName('name')[0].firstChild.nodeValue == 'mel' ){
//                     uvindex+=locations[i].getElementsByTagName('index')[0].firstChild.nodeValue
                    
//                 }
//             }
//             $('#uvindex').html(uvindex)
//         }
//     }
//     //retrive the mel uv index from this API
//     xhr.open('get','https://uvdata.arpansa.gov.au/xml/uvvalues.xml');
//     xhr.send(null);
// }


layui.use('element', function(){
  var element = layui.element;
});

function changeHlight(){
    let title = document.title

    let nav = document.getElementById('nav')
    let lis = nav.getElementsByTagName('li')
    for(var i = 0;i<2;i++){
        lis[i].classList.remove('layui-this')
    }
    if(title=='Home Page'){
        lis[0].classList.add('layui-this')
    }else if(title=='Tourist Destinations UV & Tips'){
        lis[1].classList.add('layui-this')
    }
}


// function changeColorBasedOnUV(uvclass,colorclass){
//     if()
//     $(classname).addClass("current");
// }


if(element['name']=='mel') {
    let uvindex = element['index'][0]
    if(uvindex<=2){
        color = 'layui-btn'
        text = 'low'
    }else if(3<=uvindex<=5){
        color = 'layui-btn-warm'
        text = 'media'
    }else if(uvindex>5){
        color = 'layui-btn-danger'
        text = 'high'
    }

}
