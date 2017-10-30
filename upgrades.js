var upgrades = {
  num:[],
  criaUpgrade:function(nome,explanation,codeToRun,price,estado){
    this.num.push([estado,price,codeToRun])
    var i = this.num.length - 1;
    var upBox = document.createElement("div");
    upBox.className = "upgrade "+ estado;
    upBox.id = i+"upgrade";
    if(estado){
    document.getElementById("upgradesTrue").appendChild(upBox);
    }
    else{
    document.getElementById("upgradesFalse").appendChild(upBox);
    }
    var n = document.createElement("h3")
    n.innerHTML = nome;
    upBox.appendChild(n);

    var pr = document.createElement("h4");
    pr.innerHTML = toMoney(price);
    upBox.appendChild(pr);

    if(!estado){
    var b = document.createElement("button");
    b.innerHTML = "Upgrade";
    b.setAttribute("onclick","upgrades.buyUp("+i+")")
    upBox.appendChild(b);
    }
    else{
    var b = document.createElement("h2");
    b.innerHTML = "Upgrade bought";
    upBox.appendChild(b);
    }
    var expl = document.createElement("p");
    expl.innerHTML = explanation;
    upBox.appendChild(expl)

  },
  buyUp:function(i){
    if(cash >= this.num[i][1] ){
      cash-=this.num[i][1]
      this.num[i][0] = true;
      var div = document.getElementById(i+"upgrade")
      div.className = "upgrade " + true;
      div.getElementsByTagName("button")[0].remove();

      var b = document.createElement("h2");
      b.innerHTML = "Upgrade bought";
      div.appendChild(b);

      document.getElementById("upgradesTrue").appendChild(div);

      eval(this.num[i][2]);
    }
  }
}
function criaUps(){
  upgrades.criaUpgrade("Internet #1","Upgrade internet.","",1e3,false)
  upgrades.criaUpgrade("Appearance #1","This will improve the appearance of the desktop.","document.getElementById('activeStyle').href='style/tipo2.css'",1e4,false)
  upgrades.criaUpgrade("Appearance #2","This will improve the appearance of the desktop.","document.getElementById('activeStyle').href='style/tipo3.css'",1e8,false)
}


function createComponentUp(component,nome,explanation,codeToRun,price,estado){
  eval(component+".upgrades.push(["+estado+","+price+",'"+codeToRun+"'])");
  eval("var i = "+component+".upgrades.length - 1");
  var upBox = document.createElement("div");
  upBox.className = "upgradeBox "+ estado +" "+ getComponentNumber(component);
  upBox.id = i+"upgrade"+component;

  document.getElementsByClassName("componentUp")[getComponentNumber(component)-1].appendChild(upBox);

  var n = document.createElement("h4")
  n.className = "caract";
  n.innerHTML = nome;
  upBox.appendChild(n);

  var pr = document.createElement("h4");
  pr.className = "price";
  pr.innerHTML = toMoney(price);
  upBox.appendChild(pr);

  if(!estado){
  var b = document.createElement("button");
  b.innerHTML = "Upgrade";
  b.className = "b";
  b.setAttribute("onclick","upgradeComponent("+i+",'"+component+"')")
  upBox.appendChild(b);
  }
  else{
  var b = document.createElement("h4");
  b.className = "b";
  b.innerHTML = "Upgrade bought";
  upBox.appendChild(b);
  }
  var expl = document.createElement("p");
  expl.className = "qtd";
  expl.innerHTML = explanation;
  upBox.appendChild(expl)

}

function upgradeComponent(i,component){
  var price = eval(component+".upgrades["+i+"][1]")
  var toRun = eval(component+".upgrades["+i+"][2]")
    if(cash >= price ){
      cash-=price
      eval(component+".upgrades["+i+"][0] = true")
      var div = document.getElementById(i+"upgrade"+component)
      div.className = "upgradeBox "+ true +" "+ getComponentNumber(component)
      div.getElementsByTagName("button")[0].remove();

      var b = document.createElement("h4");
      b.className = "b";
      b.innerHTML = "Upgrade bought";
      div.appendChild(b);

      //document.getElementById("upgradesTrue").appendChild(div);

      eval(toRun);
    }
}
createComponentUp("box","Cooling #1","Unlock space for one cooler","unlockCooler()",2e3,false)
createComponentUp("mother","GPU #1","Create one GPU entery","unlockGpu()",2e3,false)
createComponentUp("box","Material #1"   ,"Resist better to heat","",2e3,false)
createComponentUp("cpu","System type #1","4-bit -> 8-bit<br>This will multiply your <span class='runtime-points'>RP</span> by 1.5.","bitLevel++;",1e3,false)


function getComponentNumber(comp){
  if(comp == "box")
    return 1
  else if(comp == "storage")
    return 2
  else if(comp == "power")
    return 3
  else if(comp == "cooling")
    return 4
  else if(comp == "mother")
    return 5
  else if(comp == "gpu")
    return 6
  else if(comp == "cpu")
    return 7
  else if(comp == "ram")
    return 8
}
