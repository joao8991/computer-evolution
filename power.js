var power = {
  lvl:[1],
  watts:0,
  d:document.getElementsByClassName('3')[0].getElementsByClassName('qtd')[0],
  p:document.getElementsByClassName('3')[0].getElementsByClassName('price')[0],
  total(cpucons,ramcons,gpucons){
    var ret = cpucons + ramcons;
    if(!gpu.locked)
    ret+=gpucons;
    return ret;
  },
  totalAtual(){
    var ret = cpu.cons + ram.cons;
    if(!gpu.locked)
    ret+=gpu.cons;
    return ret;
  },
  calc:function(a){
    return Math.floor(50*Math.pow(power.lvl[0]+a,0.7));
  },
  costFunc:function(){
    return Math.floor(10*Math.pow(2,power.lvl[0]-1));
  },
  atualiza:function(){
    power.watts = power.calc(0);
    this.d.innerHTML =power.watts + "W";
    this.p.innerHTML = toMoney(power.costFunc());
    document.getElementById("wts").innerHTML = power.totalAtual() +"W/" +  power.watts + "W";
  },

  upgrade:function(){
        var test = false;
        if(cash>=power.costFunc()){//prices
          test=true;
      }
        if(test){
        cash-=power.costFunc()
        power.lvl[0]++;
        power.atualiza();
        }
  },
  test:function(){
    this.d.innerHTML =  power.calc(1) + "W";
    this.d.style.color = goodColor;
  },
  out:function(){
    this.d.style.color = colorTestUp();
    this.d.innerHTML = power.watts + "W";
    this.p.innerHTML = toMoney(power.costFunc());
  }
}
