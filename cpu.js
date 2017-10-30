var cpu = {
  lvl:[1,1,1,1],
  baseValue:[20,1,12,1],
  basePrice:[10,10,10,10],
  upgrades:[],
  speed:0,
  cores:0,
  cache:0,
  cons:0,
  valor:0,
  use:0,
  d1:document.getElementsByClassName('7')[0].getElementsByClassName('qtd')[0],
  d2:document.getElementsByClassName('7')[1].getElementsByClassName('qtd')[0],
  d3:document.getElementsByClassName('7')[2].getElementsByClassName('qtd')[0],
  d4:document.getElementsByClassName('7')[3].getElementsByClassName('qtd')[0],
  price1:document.getElementsByClassName('7')[0].getElementsByClassName('price')[0],
  price2:document.getElementsByClassName('7')[1].getElementsByClassName('price')[0],
  price3:document.getElementsByClassName('7')[2].getElementsByClassName('price')[0],
  price4:document.getElementsByClassName('7')[3].getElementsByClassName('price')[0],

  upgrade:function(a){
        var test = false;
        var lvls=[cpu.lvl[0],cpu.lvl[1],cpu.lvl[2],cpu.lvl[3]];
        lvls[a-1]++;
        var cpus = cpu.calcCons(lvls[0],lvls[1],lvls[2],lvls[3])
        if(cash>=cpu.costFunc(a) && power.total(cpus,ram.cons,gpu.cons)<=power.watts){//prices
          test=true;
      }
        if(test){
        cash-=cpu.costFunc(a)
        cpu.lvl[a-1]++;
        cpu.atualiza();
        }
  },
  funValues:function(a,n){
    var val = 0;
    if(a==1){//speed
      val = this.baseValue[0]*Math.pow(n,0.8);
    }
    else if(a==2){//cores
      val = this.baseValue[1]*n;
    }
    else if(a==3){//cache
      val = this.baseValue[2]*n;
    }
    else if(a==4){//cons
      val = this.baseValue[3]*n;
    }
    return val;
  },
  costFunc:function(a){
    var val = 0;
    if(a==1){//speed
      val = this.basePrice[0]*Math.pow(1.2,this.lvl[0]-1);
    }
    else if(a==2){//cores
      val = this.basePrice[1]*Math.pow(1.2,this.lvl[1]-1);
    }
    else if(a==3){//cache
      val = this.basePrice[2]*Math.pow(1.2,this.lvl[2]-1);
    }
    else if(a==4){//cons
      val = this.basePrice[3]*Math.pow(1.2,this.lvl[3]-1);
    }
    return val;
  },
  valorFunc:function(a,b,c){
    var val1 = (1/2)*a/cpu.baseValue[0];
    var val2 = b/cpu.baseValue[1];
    var val3 = (1/2)*c/cpu.baseValue[2];
    return val2*(val1+val3);
  },
  atualiza:function(){

    cpu.speed =cpu.funValues(1,cpu.lvl[0]);
    cpu.cores = cpu.lvl[1];
    cpu.cache = cpu.funValues(3,cpu.lvl[2]);
    cpu.cons = cpu.calcCons(cpu.lvl[0],cpu.lvl[1],cpu.lvl[2],cpu.lvl[3]);
    var str = cpu.cores > 1 ? "cores":"core";
    this.d1.innerHTML = toBytes(cpu.speed,"speed");
    this.d2.innerHTML = cpu.cores ;
    this.d3.innerHTML = toBytes(cpu.cache,"memory");
    this.d4.innerHTML = cpu.cons+"W";
    this.price1.innerHTML = toMoney(cpu.costFunc(1,cpu.lvl[0]));
    this.price2.innerHTML = toMoney(cpu.costFunc(2,cpu.lvl[1]));
    this.price3.innerHTML = toMoney(cpu.costFunc(3,cpu.lvl[2]));
    this.price4.innerHTML = toMoney(cpu.costFunc(4,cpu.lvl[3]));
    cpu.valor = cpu.valorFunc(cpu.speed,cpu.cores,cpu.cache);
    calcRP();
    document.getElementById("valorCpu").innerHTML = cpu.valor.toFixed(2);
    document.getElementById("wattscpu").innerHTML = cpu.cons +"W";
    document.getElementById("speedCpu").innerHTML = toBytes(cpu.speed,"speed");
    document.getElementById("coresCpu").innerHTML = cpu.cores + " " + str;
    document.getElementById("cacheCpu").innerHTML = "cache:"+toBytes(cpu.cache,"memory");
    atualizaTextHard();
  },
  calcCons:function(a,b,c,d){//recebe nivel
    var var1 = cpu.funValues(1,a);
    var var2 = cpu.funValues(2,b);
    var var3 = cpu.funValues(3,c);
    var var4 = cpu.funValues(4,d);
    return Math.floor(var1+var2+var3-var4);
  },
  testColors:function(a,b,c,d){//recebe niveis
    if(a>cpu.lvl[0])
        this.d1.style.color = goodColor;
    else
        this.d1.style.color = colorTestUp();

    if(b>cpu.lvl[1])
          this.d2.style.color = goodColor;
    else
          this.d2.style.color = colorTestUp();

      if(c>cpu.lvl[2])
          this.d3.style.color = goodColor;
      else
          this.d3.style.color = colorTestUp();

      if(d > cpu.cons)
          this.d4.style.color = badColor;
      else if(d < cpu.cons  )
          this.d4.style.color = goodColor;
      else
          this.d4.style.color = colorTestUp();
  },
  test:function(v){
    var a = cpu.lvl[0],b = cpu.lvl[1],c= cpu.lvl[2],d=cpu.lvl[3];
      if(v==1){
        a++;
      this.d1.innerHTML = toBytes(cpu.funValues(v,a),"speed");
    }
    if(v==2){
       b++;
      this.d2.innerHTML = cpu.funValues(v,b);
    }
    if(v==3){
       c++
      this.d3.innerHTML = toBytes(cpu.funValues(v,c),"memory");
    }
    if(v==4){
       d++;
    }
       e = cpu.calcCons(a,b,c,d);
      this.d4.innerHTML = e+"W";
    document.getElementById("valorCpu").innerHTML = cpu.valor.toFixed(2)+" > "+ cpu.valorFunc(cpu.funValues(1,a),cpu.funValues(2,b),cpu.funValues(3,c)).toFixed(2);
    cpu.testColors(a,b,c,d);
  },
  out:function(){
    this.d1.style.color = colorTestUp();
    this.d2.style.color = colorTestUp();
    this.d3.style.color = colorTestUp();
    this.d4.style.color = colorTestUp();
    document.getElementById("valorCpu").innerHTML = cpu.valor.toFixed(2);
    document.getElementById("wattscpu").innerHTML = cpu.cons +"W";
    this.d1.innerHTML = toBytes(cpu.speed,"speed");
    this.d2.innerHTML = cpu.cores;
    this.d3.innerHTML = toBytes(cpu.cache,"memory");
    this.d4.innerHTML = cpu.cons+"W";
  }
}
