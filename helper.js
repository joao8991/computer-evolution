

function arrendEsquerda(quantosNums, num){
  //returna o num com a qtd de algarismos significativos igual a quantosNums
  var a = num, v = 0;
while(a>=1){
a/=10;
v++;
}
a=num;
var add=v-quantosNums;
while(v>quantosNums){
a/=10;
v--;
}
return Math.round(a)*Math.pow(10,add);
}
function toMoney(value){
  var grandeza = 0, string="";
  while (value>=1000) {
    grandeza++;
    value/=1000;
  }
  if(value%1<0.01)
  var tofixed = 1;
  else
  var tofixed = 2;
  switch (grandeza) {
    case 0:
      string =  value.toFixed(tofixed);
      break;
    case 1:
      string =  value.toFixed(tofixed) + "K";
      break;
    case 2:
      string =  value.toFixed(tofixed) + "M";
      break;
    case 3:
      string =  value.toFixed(tofixed) + "B";
      break;
    case 4:
      string =  value.toFixed(tofixed) + "T";
      break;
    case 5:
      string =  value.toFixed(tofixed) + "q";
      break;
    case 6:
      string =  value.toFixed(tofixed) + "Q";
      break;
    case 7:
      string =  value.toFixed(tofixed) + "s";
      break;
    case 8:
      string =  value.toFixed(tofixed) + "S";
      break;
    case 9:
      string =  value.toFixed(tofixed) + "O";
      break;
    case 10:
      string =  value.toFixed(tofixed) + "N";
      break;

    default:
    string = value.toFixed(0);
      break;


  }
  return string + "$";
}
function memoryOf(bigval,value2){

  var grandeza = 0, string="";
    if(bigval!=null){
    while (bigval>=1000) {
      grandeza++;
      bigval/=1000;
      value2/=1000;
    }
    if(bigval%1<0.1)
    var tofixed = 0;
    else
    var tofixed = 1;
    switch (grandeza) {
      case 1:
        string =  bigval.toFixed(tofixed) + "k";
        break;
      case 2:
        string =  bigval.toFixed(tofixed) + "M";
        break;
      case 3:
        string =  bigval.toFixed(tofixed) + "G";
        break;
      case 4:
        string =  bigval.toFixed(tofixed) + "T";
        break;
      case 5:
        string =  bigval.toFixed(tofixed) + "P";
        break;
      case 6:
        string =  bigval.toFixed(tofixed) + "E";
        break;
      case 7:
        string =  bigval.toFixed(tofixed) + "Z";
        break;
      case 8:
        string =  bigval.toFixed(tofixed) + "Y";
        break;

      default:
        string =  bigval.toFixed(tofixed);
        break;

    }
  }
      string = value2.toFixed(1) +" of "+ string + "B";

      return string;
}
function toBytes(value,type){
var grandeza = 0, string="";
  if(value!=null){
  while (value>=1000) {
    grandeza++;
    value/=1000;
  }
  if(value%1<0.1)
  var tofixed = 0;
  else
  var tofixed = 1;
  switch (grandeza) {
    case 1:
      string =  value.toFixed(tofixed) + "k";
      break;
    case 2:
      string =  value.toFixed(tofixed) + "M";
      break;
    case 3:
      string =  value.toFixed(tofixed) + "G";
      break;
    case 4:
      string =  value.toFixed(tofixed) + "T";
      break;
    case 5:
      string =  value.toFixed(tofixed) + "P";
      break;
    case 6:
      string =  value.toFixed(tofixed) + "E";
      break;
    case 7:
      string =  value.toFixed(tofixed) + "Z";
      break;
    case 8:
      string =  value.toFixed(tofixed) + "Y";
      break;

    default:
      string =  value.toFixed(tofixed);
      break;

  }
  if(type=="persec" )
    string = string + "B/s";
  else if(type=="memory" )
      string = string + "B";
  else if(type=="speed" )
        string = string + "Hz";
  }
    return string;
}

function colorByPerc(perc){
  var ret = "#00ff40";
  if(perc>=40 && perc<70)
    ret = "#ffd000";
  else if(perc>=70)
    ret = "#f00";
  return ret;
}

function confirmation(text,funct){
      var confirmationdiv = document.createElement("div");
      confirmationdiv.className="confirmationbox";
      confirmationdiv.id="confirmationbox1";
      document.getElementById('software').appendChild(confirmationdiv);

      var texth4 = document.createElement("h4");
      texth4.innerHTML = text;
      texth4.className = "texth4";
      confirmationdiv.appendChild(texth4);


      var divbuts = document.createElement("div");
      divbuts.id="divbuts";
      confirmationdiv.appendChild(divbuts);
      var buttonYes = document.createElement("button");
      buttonYes.id = "yesbutton";
      buttonYes.innerHTML = "Yes";
      buttonYes.setAttribute("onclick", "document.getElementById('confirmationbox1').remove(),"+funct);
      divbuts.appendChild(buttonYes);

      var buttonNo = document.createElement("button");
      buttonNo.id = "nobutton";
      buttonNo.innerHTML = "No";
      buttonNo.setAttribute("onclick", "document.getElementById('confirmationbox1').remove()");
      divbuts.appendChild(buttonNo);

}

function info(text){
  if(document.getElementsByClassName("info")[0] == undefined){
      var infodiv = document.createElement("div");
      infodiv.className="infoBox";
      infodiv.id="infoid";
      document.getElementById('content').appendChild(infodiv);
      infodiv.style.display = "block"
      infodiv.style.zIndex = "10"
      var top = document.createElement("div");
      top.className="top";
      infodiv.appendChild(top);
      var title = document.createElement("h4");
      title.innerHTML = "Info";
      title.className = "title";
      top.appendChild(title);
      var texth4 = document.createElement("h4");
      texth4.innerHTML = text;
      texth4.className = "texth4";
      infodiv.appendChild(texth4);
      infodiv.setAttribute("onclick","this.remove();")
      infodiv.style.cursor = "pointer";
      setTimeout(function(){
          infodiv.style.opacity=0;
          setTimeout(function(){
            infodiv.remove();
          },400)
      },8000)
 }
}

function createWindow(id,type,title){
  //testWindowsPositions();
  var wids = $(".window")
  var z = 5;
  for (var i = 0; i < wids.length; i++) {
    var d =$(".window:eq("+i+")");
    z += d.css("display") == "block" ? 1 : 0;
  }
  if(document.getElementById(id) == null){
      var div = document.createElement("div");
      div.className ="window " + type;
      div.id = id;
      document.getElementById("software").appendChild(div);
      var top = document.createElement("div")
      top.className = "top"
      div.appendChild(top);
      var tit = document.createElement("h4")
      tit.innerHTML = title;
      tit.className = "title";
      top.appendChild(tit);
      //<i class="fa fa-close close" onclick="closeWindow('shop')"></i>
      var close = document.createElement("i")
      close.className = "fa fa-close close";
      close.setAttribute("onclick","closeWindow('"+id+"')")
      top.appendChild(close);

  }
  $("#"+id).css("display","block")
  $("#"+id).css("z-index",z)
}
function deleteWindow(id){
    $("#"+id).remove();
}
function closeAllWindows(){
  for (var i = 0; i < document.getElementsByClassName('window').length; i++) {
    document.getElementsByClassName('window')[i].style.display ="none";
  }
}
function closeWindow(id){
    if(document.getElementById(id) != null){
      $("#"+id).css("display","none")
    }
}


function infobox(addtop,side,text) {
var info = document.getElementsByClassName('infoBoxNear')[0];
  if(addtop == "close")
    info.style.display = "none"
  else{
    info.style.display = "block";
    if(text!=undefined)
    info.innerHTML = text;
    info.style.top = (mousey + addtop) + "px";
    if(side=="left"){
    info.style.right = (parseFloat($("#content").css("width"))-mousex-10) + "px";
    info.style.left = "auto";
    }
    else{
      info.style.left = (mousex+10) + "px";
      info.style.right = "auto";
    }
  }
}
function toTime(milisecs){
  if(milisecs<=1000)
  return milisecs.toFixed(0) +"ms"
  else if(milisecs>1000 && milisecs%1000==0)
  return (milisecs/1000).toFixed(0) + " seconds";
  else if(milisecs>1000)
  return (milisecs/1000).toFixed(0) + " seconds and " + (milisecs%1000).toFixed(0) + "ms"
}
