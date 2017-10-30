var gpu = {
    color:"white",
    lvl:[1,1,1,1,1],
    baseValue:[1,20,12,2,10],
    basePrice:[10,10,10,10,10],
    qtd:0,
    locked:true,
    memory:0,
    speed:0,
    capacity:0,
    valor:0,
    cons:0,
    use:0,
    d1:document.getElementsByClassName('6')[0].getElementsByClassName('qtd')[0],
    d2:document.getElementsByClassName('6')[1].getElementsByClassName('qtd')[0],
    d3:document.getElementsByClassName('6')[2].getElementsByClassName('qtd')[0],
    d4:document.getElementsByClassName('6')[3].getElementsByClassName('qtd')[0],
    d5:document.getElementsByClassName('6')[4].getElementsByClassName('qtd')[0],
    price1:document.getElementsByClassName('6')[0].getElementsByClassName('price')[0],
    price2:document.getElementsByClassName('6')[1].getElementsByClassName('price')[0],
    price3:document.getElementsByClassName('6')[2].getElementsByClassName('price')[0],
    price4:document.getElementsByClassName('6')[3].getElementsByClassName('price')[0],
    price5:document.getElementsByClassName('6')[4].getElementsByClassName('price')[0],
    atualiza:function(){
      if(!gpu.locked){
      gpu.qtd = gpu.funValues(1,gpu.lvl[0]);
      gpu.memory = gpu.funValues(2,gpu.lvl[1]);
      gpu.speed = gpu.funValues(3,gpu.lvl[2]);
      gpu.cores = gpu.funValues(4,gpu.lvl[3]);
      gpu.cons = gpu.calcCons(gpu.lvl[0],gpu.lvl[1],gpu.lvl[2],gpu.lvl[3],gpu.lvl[4]);
      gpu.valor = gpu.valorFunc(gpu.qtd,gpu.memory,gpu.speed,gpu.cores);
      calcRP();
      document.getElementById("valorgpu").innerHTML = gpu.valor.toFixed(2);
      document.getElementById("wattsgpu").innerHTML = gpu.cons +"W";
      document.getElementById("textgpu").innerHTML = gpu.qtd+" x "+ gpu.cores +" x "+ toBytes(gpu.memory,'memory')+" ("+toBytes(gpu.speed,'speed')+")"
      this.d1.innerHTML = gpu.qtd;
      this.d2.innerHTML = toBytes(gpu.memory,"memory");
      this.d3.innerHTML = toBytes(gpu.speed,"speed");
      this.d4.innerHTML = gpu.cores ;
      this.d5.innerHTML = gpu.cons + "W";
      this.price1.innerHTML = toMoney(gpu.costFunc(1));
      this.price2.innerHTML = toMoney(gpu.costFunc(2));
      this.price3.innerHTML = toMoney(gpu.costFunc(3));
      this.price4.innerHTML = toMoney(gpu.costFunc(4));
      this.price5.innerHTML = toMoney(gpu.costFunc(5));
      }
    },
    costFunc:function(a){
      var val = 0;
      if(a==1){//qtd
        val = this.basePrice[0]*Math.pow(1.2,gpu.lvl[0]-1);
      }
      else if(a==2){//memory
        val = this.basePrice[1]*Math.pow(1.2,gpu.lvl[1]-1);
      }
      else if(a==3){//speed
        val = this.basePrice[2]*Math.pow(1.2,gpu.lvl[2]-1);
      }
      else if(a==4){//cores
        val = this.basePrice[3]*Math.pow(1.2,gpu.lvl[3]-1);
      }
      else if(a==5){//cons
        val = this.basePrice[4]*Math.pow(1.2,gpu.lvl[4]-1);
      }
      return val;
    },
    funValues:function(a,lvl){
      var val = 0;
      if(a==1){
        val = this.baseValue[0]*lvl;
      }
      if(a==2){
        val = this.baseValue[1]*lvl;
      }
      else if(a==3){
        val = this.baseValue[2]*lvl;
      }
      else if(a==4){
        val = this.baseValue[3]*Math.pow(2,lvl-1);
      }
      else if(a==5){
        val = this.baseValue[4]*lvl;
      }
      return val;
    },
    valorFunc:function(a,b,c,d){
      var val1 = a/gpu.baseValue[0];
      var val2 = (1/2)*b/gpu.baseValue[1];
      var val3 = (1/2)*c/gpu.baseValue[2];
      var val4 = d/gpu.baseValue[3];
      return val1*val4*(val3+val2);
    },
    upgrade:function(a){
      var test = false;
      var lvls=[gpu.lvl[0],gpu.lvl[1],gpu.lvl[2],gpu.lvl[3],gpu.lvl[4]];
      lvls[a-1]++;
      var gpus = gpu.calcCons(lvls[0],lvls[1],lvls[2],lvls[3],lvls[4])
      if(cash>=gpu.costFunc(a) && power.total(cpu.cons,ram.cons,gpus)<=power.watts){//prices
      if(a==1){
        if(mother.gpus>gpu.qtd){
          test=true;
        }
      }
      else{
        test=true;
      }
    }
      if(test){
      cash-=  gpu.costFunc(a)
      gpu.lvl[a-1]++;
      gpu.atualiza();
      }
    },
    calcCons:function(a,b,c,d,e){
      var var1 = gpu.funValues(1,a);
      var var2 = gpu.funValues(2,b);
      var var3 = gpu.funValues(3,c);
      var var4 = gpu.funValues(4,d);
      var var5 = gpu.funValues(5,e);
      return Math.floor(var1+var2+var3+var4-var5);
    },
    testColors:function(a,b,c,d,e){
      if(a>gpu.lvl[0])
          this.d1.style.color = goodColor;
      else
          this.d1.style.color = colorTestUp();

      if(b>gpu.lvl[1])
            this.d2.style.color = goodColor;
      else
            this.d2.style.color = colorTestUp();

      if(c>gpu.lvl[2])
            this.d3.style.color = goodColor;
      else
            this.d3.style.color = colorTestUp();

      if(d>gpu.lvl[3])
            this.d4.style.color = goodColor;
      else
            this.d4.style.color = colorTestUp();

      if(gpu.cons>gpu.calcCons(a,b,c,d,e))
            this.d5.style.color = goodColor;
      else if(gpu.cons<gpu.calcCons(a,b,c,d,e))
            this.d5.style.color = badColor;
      else
            this.d5.style.color = colorTestUp();
    },
    test:function(v){
      var a = gpu.lvl[0],b = gpu.lvl[1],c= gpu.lvl[2],d =gpu.lvl[3],e =gpu.lvl[4];
        if(v==1){
          a++;
        this.d1.innerHTML = gpu.funValues(v,a);
      }
      if(v==2){
         b++;
        this.d2.innerHTML = toBytes(gpu.funValues(v,b),"memory");
      }
      if(v==3){
         c++
        this.d3.innerHTML = toBytes(gpu.funValues(v,c),"speed");
      }
      if(v==4){
         d++
        this.d4.innerHTML = gpu.funValues(v,d);
      }
      if(v==5){
         e++;
      }
         f = gpu.calcCons(a,b,c,d,e);
        this.d5.innerHTML = f+"W";
      document.getElementById("valorgpu").innerHTML = gpu.valor.toFixed(2)+" > "+ gpu.valorFunc(gpu.funValues(1,a),gpu.funValues(2,b),gpu.funValues(3,c),gpu.funValues(4,d)).toFixed(2);
      gpu.testColors(a,b,c,d);
    },
    out:function(){
      this.d1.style.color = colorTestUp();
      this.d2.style.color = colorTestUp();
      this.d3.style.color = colorTestUp();
      this.d4.style.color = colorTestUp();
      this.d5.style.color = colorTestUp();
      document.getElementById("valorgpu").innerHTML = gpu.valor.toFixed(2);
      document.getElementById("wattsgpu").innerHTML = gpu.cons +"W";
      this.d1.innerHTML = gpu.qtd;
      this.d2.innerHTML = toBytes(gpu.memory,"memory");
      this.d3.innerHTML = toBytes(gpu.speed,"speed");
      this.d4.innerHTML = gpu.cores;
      this.d5.innerHTML = gpu.cons + "W";
    }
}
function unlockGpu(){
  gpu.locked = false;
  checkLocks();
  gpu.atualiza();
}
