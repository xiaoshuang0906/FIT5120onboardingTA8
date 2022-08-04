window.onload = function(){
   changeHlight()
}

function queryUVindex(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 ){
            var xmldom = xhr.responseXML;
            var locations = xmldom.getElementsByTagName('location');
        
            var uvindex ="";
            for(var i=0; i<locations.length; i++){
                if(locations[i].getElementsByTagName('name')[0].firstChild.nodeValue == 'mel' ){
                    uvindex+=locations[i].getElementsByTagName('index')[0].firstChild.nodeValue
                    
                }
            }
            $('#uvindex').html(uvindex)
        }
    }
    //retrive the mel uv index from this API
    xhr.open('get','https://uvdata.arpansa.gov.au/xml/uvvalues.xml');
    xhr.send(null);
}


layui.use('element', function(){
  var element = layui.element;
});

function changeHlight(){
    let title = document.title

    let nav = document.getElementById('nav')
    let lis = nav.getElementsByTagName('li')
    for(var i = 0;i<4;i++){
        lis[i].classList.remove('layui-this')
    }
    if(title=='Home Page'){
        lis[0].classList.add('layui-this')
    }else if(title=='Tips Page'){
        lis[3].classList.add('layui-this')
    }else if(title == 'Consequences Page'){
        lis[2].classList.add('layui-this')
    }
}




