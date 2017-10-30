var os = {
  level :1,
  osc:[0,0],
  lastCpuUse:0,
  lastRamUse:0,
  oscilacao:[100,20],//em percentagem possivel
  calcOsc:function(){
      this.osc[0] = (Math.floor(Math.random()*this.oscilacao[0])-this.oscilacao[0]/2)/100;
      this.osc[1] = (Math.floor(Math.random()*this.oscilacao[1])-this.oscilacao[1]/2)/100;
      setTimeout(
        function(){
          os.calcOsc();
        },1000)
  },
  writeTop:function(){
    cpu.use -= os.lastCpuUse;
    ram.use -= os.lastRamUse;
    cpu.use += this.cpuUsage();
    ram.use += this.ramUsage();
    os.lastCpuUse = this.cpuUsage();
    os.lastRamUse = this.ramUsage();
    var perCpu = (cpu.use/cpu.speed)*100
    var perRam = (ram.use/ram.capacity)*100
    document.getElementById('cpuUse').innerHTML = "CPU:"+ perCpu.toFixed(0) + "%";
    document.getElementById('ramUse').innerHTML = "RAM:"+ perRam.toFixed(0) + "%";
    document.getElementById("intSpeed").innerHTML =  "<i class='fa fa-download'></i> " + toBytes(internet.retSpeed(),"memory") + "/s";
    setTimeout(
      function(){
        os.writeTop();
      },10)
  },
  retBase:function(comp){
    if(comp == 1)
    return 4*(Math.pow(this.level,2) );
    else if(comp == 2)
    return 2*(Math.pow(this.level,2) );
  },
  storageUsage:function(){// em memoria
    return Math.pow(this.level,2)*2 ;
  },
  cpuUsage:function(){// em hz
    var base = os.retBase(1)
    return (base * this.osc[0]) + base;
  },
  ramUsage:function(){// em memoria
    var base = os.retBase(2)
    return (base * this.osc[1]) + base
  }
}
