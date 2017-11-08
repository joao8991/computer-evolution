// variaveis
var cash = 1e2,computerName="Noob";
var goodColor = "#00ff7b",badColor = "#f03",clicks=0,appRunned =0;
var atualWsType = 1,bitLevel = 1;
wsType(atualWsType)
var rp = 0;//runtime-points
function isType3(){
  return document.getElementById("activeStyle").href.charAt(document.getElementById("activeStyle").href.length-5) == "3";
}
function retBit(a){
  return 4 * Math.pow(2,a-1)
}
function colorTestUp(){
  //se for estilo tipo 3 uma das cores eh branco
  if(isType3())
    return "white";
  else
    return "black";
}
function calcRP(){//calcula os runtime-points
  var l = document.getElementsByClassName("runtime-pointsValue").length;
  if(gpu.valor>0)
  rp = cpu.valor*ram.valor*gpu.valor;
  else
  rp = cpu.valor*ram.valor;

  for (var i = 0; i < l; i++) {

    document.getElementsByClassName("runtime-pointsValue")[i].innerHTML = rp.toFixed(2);
  }
}
var internet = {
  baseSpeed : 1,
  users : 0,
  oscilacao:40,//em percentagem possivel
  osc:0, //valor real
  retNet:function(time){
    return (this.osc*this.baseSpeed + this.baseSpeed)/internet.users;
    //internet users so resulta se for aumentado e diminuido quando esta mesmo a ser usada
    // com timer nao resulta bem
  },
  retSpeed:function(){
    return (this.osc*this.baseSpeed + this.baseSpeed);
  },
  calcOsc:function(){
    this.osc = (Math.floor(Math.random()*this.oscilacao)-this.oscilacao/2)/100;
    setTimeout(
      function(){
        internet.calcOsc();
      },1000)
  }
}


var computerCycle = function() {

    balanceAtual();
    atualDate();
};

function start(){
  $("#inicio").css("opacity","0")
  setTimeout(function(){
    $("#inicio").css("display","none")
  },400)
  internet.calcOsc();
  os.calcOsc();
  os.writeTop();
  startAchivs();
  iniciarHard();
  atualizaAchiv();
  criaUps();
  changeArchive(1);
  setInterval(function(){
    computerCycle();
  },10);
}
function atualDate(){
        var d = new Date();
        d = d.getTime() - (d.getTimezoneOffset()*1000*60);
        var minutos = Math.floor((((d/1000)%3600)/60));
        var horas = Math.floor( ( (d/1000)%(3600*24) )  / 3600);
        if(minutos<10)
        minutos= "0"+minutos;
        if(horas<10)
        horas= "0"+horas;
  document.getElementById('date').innerHTML = horas + ":" + minutos;
}
function balanceAtual(){
  document.getElementById('balance').innerHTML = toMoney(cash);
}
function changeComputerName(){
    createWindow("newName")
}
function changeNameConfirm(){
  computerName = document.getElementById('newnameinput').value;
  atualizaTextHard();
  closeWindow("newName")
}
function testWindowsPositions(){
  var wids = $(".window")
  var add = 0;
  for (var i = 0; i < wids.length; i++) {
    var d =$(".window:eq("+i+")");
    add += d.css("display")  == "block" ? 10 : 0;
    d.css("margin",add+"px")
  }
}
var sound = true, music = true, animation = true;
function soundFunc(){
  sound ? sound = false : sound = true;
}
function musicFunc(){
  music ? music = false : music = true;
}
function animationFunc(){
  animation ? animation = false : animation = true;
}
function wsType(a){
  for (var i = 0; i < 3; i++) {
    if((i+1)==a)
    document.getElementsByClassName("wstypes")[i].className = "wstypes selected"
    else
    document.getElementsByClassName("wstypes")[i].className = "wstypes"

    document.getElementById("software").getElementsByTagName('img')[0].setAttribute("src",document.getElementById('srcimg').value);
    if(a==1){
      document.getElementById("wsinput1").style.display ="block"
      document.getElementById("wsinput2").style.display ="none"
      document.getElementById("wsinput3").style.display ="none"
      document.getElementById("wsinput4").style.display ="none"
      document.getElementById("wsinput5").style.display ="none"
      document.getElementById("iconWorkspace").style.display = "none"
      document.getElementById("software").getElementsByTagName('img')[0].style.display = "none"
    }
    else if(a==2){
      document.getElementById("wsinput1").style.display ="block"
      document.getElementById("wsinput2").style.display ="block"
      document.getElementById("wsinput3").style.display ="none"
      document.getElementById("wsinput4").style.display ="block"
      document.getElementById("wsinput5").style.display ="block"
      document.getElementById("iconWorkspace").style.display = "block"
      document.getElementById("software").getElementsByTagName('img')[0].style.display = "none"
    }
    else if(a==3){
      document.getElementById("wsinput1").style.display ="block"
      document.getElementById("wsinput2").style.display ="none"
      document.getElementById("wsinput3").style.display ="block"
      document.getElementById("wsinput4").style.display ="none"
      document.getElementById("wsinput5").style.display ="none"
      document.getElementById("iconWorkspace").style.display = "none"
      document.getElementById("software").getElementsByTagName('img')[0].style.display = "block"
    }

    var x = parseFloat($("#imgfundo").css("width"));
    $("#imgfundo").css("left",(1100-x)/2+"px")
    x = parseFloat($("#imgfundo").css("height"));
    $("#imgfundo").css("top",26+((554-x)/2)+"px")

    x = parseFloat($("#iconWorkspace").css("width"));
    $("#iconWorkspace").css("left",(1100-x)/2+"px")
    x = parseFloat($("#iconWorkspace").css("height"));
    $("#iconWorkspace").css("top",(580-x)/2+"px")
  }

}
