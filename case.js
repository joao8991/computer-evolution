var pressao = 101325, iniT = 293, constArSeco = 287,constTermAr = 993, idealTemp = 40;
var box ={
  color:"white",
  lvl:[1,1],
  upgrades:[],
  maxTemp:60,
  enerDiss:10,
  temp:iniT,
  d1:document.getElementsByClassName('1')[1].getElementsByClassName('qtd')[0],
  d2:document.getElementsByClassName('1')[2].getElementsByClassName('qtd')[0],
  p1:document.getElementsByClassName('1')[1].getElementsByClassName('price')[0],
  p2:document.getElementsByClassName('1')[2].getElementsByClassName('price')[0],
  start:function(){
    var massaAr = (box.volume*pressao)/(constArSeco*box.temp)
    box.volume = 0.4;// metros quadrados
    box.energiaTotal = 993*pressao*box.volume/constArSeco;
    box.varTemp();
  },
  atualiza:function(){
    var tab = document.getElementsByTagName("table")[2];

    var str = cpu.cores > 1 ? "cores":"core";
    tab.getElementsByTagName("td")[0].innerHTML = "CPU " + cpu.cores + " " + str +" "+ toBytes(cpu.speed,"speed");
    tab.getElementsByTagName("td")[2].innerHTML = cpu.cons+"W";
    tab.getElementsByTagName("td")[3].innerHTML = "RAM "+toBytes(ram.capacity,"memory")+" ("+toBytes(ram.speed,"speed")+")";
    tab.getElementsByTagName("td")[4].innerHTML = ram.qtd;
    tab.getElementsByTagName("td")[5].innerHTML = ram.cons+"W";

    box.enerDiss = box.funValues(1,box.lvl[0]);
    box.maxTemp = box.funValues(2,box.lvl[1]);
    this.d1.innerHTML = box.enerDiss+"W";
    this.d2.innerHTML = box.maxTemp+"ºC";
    this.p1.innerHTML = toMoney(box.costFunc(1));
    this.p2.innerHTML = toMoney(box.costFunc(2));
    if(gpu.locked){
      document.getElementById("gpuline").style.display = "none";
    }
    if(cooling.locked){
      document.getElementById("coolingline").style.display = "none";
    }
    var total = power.totalAtual();
    tab.getElementsByTagName("td")[14].innerHTML = total+"W";
  },
  costFunc:function(a){
    var val = 0;
    if(a==1){//qtd
      val = 10*Math.pow(1.2,this.lvl[a-1]-1);
    }
    else if(a==2){//capacity
      val = 10*Math.pow(1.2,this.lvl[a-1]-1);
    }
    return val;
  },
  funValues:function(a,lvl){
    var val = 0;
    if(a==1){
      val = 10*lvl;
    }
    else if(a==2){
      val = 50*lvl;
    }
    return val;
  },
  upgrade:function(a){
      var test = false;
      if(cash>=box.costFunc(a)){//prices
        test=true;
    }
      if(test){
      cash-=box.costFunc(a)
      box.lvl[a-1]++;
      box.atualiza();
      }
  },
  testColors:function(a,b){
  this.d1.innerHTML = a+"W";
  this.d2.innerHTML = b+"ºC";
    if(a>box.lvl[0])
        this.d1.style.color = goodColor;
    else
        this.d1.style.color = colorTestUp();

    if(b>box.funValues(2,box.lvl[1]))
          this.d2.style.color = goodColor;
    else
          this.d2.style.color = colorTestUp();
  },
  test:function(v){
    var a = box.enerDiss,b = box.maxTemp;
    if(v==1){
       a = box.funValues(v,box.lvl[0]+1);
    }
    if(v==2){
       b = box.funValues(v,box.lvl[1]+1);
    }
    box.testColors(a,b);
  },
  out:function(){
    this.d1.style.color = colorTestUp();
    this.d2.style.color = colorTestUp();
    this.d1.innerHTML = box.enerDiss+"W";
    this.d2.innerHTML = box.maxTemp+"ºC";
  },
  atualTemp:function(){
    var massaAr = (box.volume*pressao)/(constArSeco*box.temp)
    return (box.energiaTotal/(massaAr*constTermAr))-273;
  },
  varTemp:function(){
    var usecpu = (cpu.use/cpu.speed)
    var useram = (ram.use/ram.capacity)
    var usegpu = (gpu.use/gpu.memory)
    if(gpu.valor == 0)
      usegpu = 0;
    box.energiaTotal += ram.cons*useram+cpu.cons*usecpu+gpu.cons*usegpu;
    var efeciencia = 0;
    if(box.atualTemp()>=idealTemp)
    efeciencia = (box.atualTemp()-idealTemp)*(1.6/(box.maxTemp-idealTemp)) + 0.2;
    else
    efeciencia = (idealTemp-Math.abs(box.atualTemp()-idealTemp))*0.005;
    efeciencia = Math.max(0,efeciencia)
    efeciencia = Math.min(1,efeciencia)
    box.energiaTotal -= box.enerDiss * efeciencia;
    var massaAr = (box.volume*pressao)/(constArSeco*box.temp)
    var varTemp = box.energiaTotal/(massaAr*constTermAr)
    document.getElementById("temp").innerHTML = box.atualTemp().toFixed(2) + "ºC"
    if(box.atualTemp()<=idealTemp){
      document.getElementById("temp").style.color = goodColor;
    }
    else if (box.atualTemp()<=(idealTemp + (box.maxTemp-idealTemp)/2)) {
        document.getElementById("temp").style.color = "#ffc800";
    }
    else{
        document.getElementById("temp").style.color = badColor;
    }

    setTimeout(
      function(){
        box.varTemp();
      },1000)
  }
}
$(document).ready(function(){
    $(".fa").click(function(){
        box.atualiza();
    });
});
