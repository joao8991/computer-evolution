function changeUp(num) {
  var hard = ["Case","Storage","Power Supply","Cooler","Motherboard","GPU","CPU","RAM"]
    document.getElementById('up').getElementsByTagName("h2")[0].innerHTML = hard[num-1];
    closeAllUpBoxes();
    for (var i = 0; i < document.getElementById('up').getElementsByClassName(num).length; i++) {
      document.getElementById('up').getElementsByClassName(num)[i].style.display = "block"
      if(i==0)
        document.getElementById('up').getElementsByClassName(num)[i].style.display = "table"
    }
}
function closeAllUpBoxes(){
  var d = document.getElementById('up').getElementsByClassName("upgradeBox");
  document.getElementById("up").getElementsByTagName("table")[0].style.display ="none"
  for (var i = 0; i < d.length; i++) {
    d[i].style.display = "none"
  }
    var inf = document.getElementById('up').getElementsByClassName("upgradeBoxInfo");
    for (var i = 0; i < inf.length; i++) {
      inf[i].style.display = "none"
    }
}
function checkLocks(){
  if(gpu.locked){
    document.getElementById('gpuComponent').getElementsByTagName("h3")[0].innerHTML ="Component Locked"
    document.getElementById('gpuComponent').className ="component locked"
    document.getElementById('gpuComponent').getElementsByTagName("h4")[0].style.display ="none"
    document.getElementById('gpuComponent').getElementsByTagName("h4")[1].style.display ="none"
    document.getElementById('gpuComponent').setAttribute("onclick","")
  }
  else {
      document.getElementById('gpuComponent').getElementsByTagName("h3")[0].innerHTML ="GPU"
      document.getElementById('gpuComponent').getElementsByTagName("h4")[0].style.display ="block"
      document.getElementById('gpuComponent').getElementsByTagName("h4")[1].style.display ="block"
      document.getElementById('gpuComponent').className ="component"
      document.getElementById('gpuComponent').setAttribute("onclick","changeUp(6)")

  }
    if(cooling.locked){
      document.getElementById('coolingComponent').getElementsByTagName("h3")[0].innerHTML ="Component Locked"
      document.getElementById('coolingComponent').className ="component locked"
      document.getElementById('coolingComponent').setAttribute("onclick","")
    }
    else{

      document.getElementById('coolingComponent').getElementsByTagName("h3")[0].innerHTML ="Cooler"
      document.getElementById('coolingComponent').getElementsByTagName("h4")[0].style.display ="block"
      document.getElementById('coolingComponent').className ="component"
      document.getElementById('coolingComponent').setAttribute("onclick","changeUp(4)")
    }
}
function atualizaTextHard(){
  var gpustr="";
  if(gpu.qtd>0){
    gpustr = "<br>Graphic Processing Unit: " + toBytes(gpu.memory,"memory");
  }
  var str = cpu.cores > 1 ? "cores":"core";
  var h4s = document.getElementById("computer").getElementsByTagName("h4");
   h4s[2].innerHTML = "Processor Unit: Infel " + cpu.cores + " " + str + " " + toBytes(cpu.speed,"speed") + "<br>Memory RAM: " + toBytes(ram.capacity,"memory") + gpustr +"<br>System type: "+retBit(bitLevel)+"-bit";
   h4s[3].innerHTML = "Computer Name: " + computerName;
}

function iniciarHard(){
  power.atualiza();
  cpu.atualiza();
  storage.atualiza();
  ram.atualiza()
  gpu.atualiza();
  mother.atualiza();
  box.start();
  box.atualiza();
  power.atualiza();
  checkLocks()
}
