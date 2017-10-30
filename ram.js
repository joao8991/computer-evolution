var ram = {
    color:"white",
    lvl:[1,1,1,1],
    baseValue:[1,12,1,10],
    basePrice:[10,10,10,10],
    qtd:0,
    capacity:0,
    speed:0,
    valor:0,
    cons:0,
    use:0,
    d1:document.getElementsByClassName('8')[0].getElementsByClassName('qtd')[0],
    d2:document.getElementsByClassName('8')[1].getElementsByClassName('qtd')[0],
    d3:document.getElementsByClassName('8')[2].getElementsByClassName('qtd')[0],
    d4:document.getElementsByClassName('8')[3].getElementsByClassName('qtd')[0],
    price1:document.getElementsByClassName('8')[0].getElementsByClassName('price')[0],
    price2:document.getElementsByClassName('8')[1].getElementsByClassName('price')[0],
    price3:document.getElementsByClassName('8')[2].getElementsByClassName('price')[0],
    price4:document.getElementsByClassName('8')[3].getElementsByClassName('price')[0],
    atualiza:function(){
      ram.qtd = ram.lvl[0];
      ram.capacity = ram.funValues(2,ram.lvl[1]);
      ram.speed = ram.funValues(3,ram.lvl[2]);
      ram.cons = ram.calcCons(ram.lvl[0],ram.lvl[1],ram.lvl[2],ram.lvl[3]);
      ram.valor = ram.valorFunc(ram.qtd,ram.capacity,ram.speed);
      calcRP();
      document.getElementById("valorRam").innerHTML = ram.valor.toFixed(2);
      document.getElementById("wattsram").innerHTML = ram.cons +"W";
      document.getElementById("textram").innerHTML = ram.qtd+" x "+ toBytes(ram.capacity,'memory')+" ("+toBytes(ram.speed,'speed')+")"
      this.d1.innerHTML = ram.qtd;
      this.d2.innerHTML = toBytes(ram.capacity,"memory");
      this.d3.innerHTML = toBytes(ram.speed,"speed");
      this.d4.innerHTML = ram.cons + "W";
      this.price1.innerHTML = toMoney(ram.costFunc(1));
      this.price2.innerHTML = toMoney(ram.costFunc(2));
      this.price3.innerHTML = toMoney(ram.costFunc(3));
      this.price4.innerHTML = toMoney(ram.costFunc(4));
      atualizaTextHard();
    },
    costFunc:function(a){
      var val = 0;
      if(a==1){//speed
        val = this.basePrice[0]*Math.pow(1.2,ram.lvl[0]-1);
      }
      else if(a==2){//cores
        val = this.basePrice[1]*Math.pow(1.2,ram.lvl[1]-1);
      }
      else if(a==3){//cache
        val = this.basePrice[2]*Math.pow(1.2,ram.lvl[2]-1);
      }
      else if(a==4){//cons
        val = this.basePrice[3]*Math.pow(1.2,ram.lvl[3]-1);
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
        val = this.baseValue[3]*lvl;
      }
      return val;
    },
    valorFunc:function(a,b,c){
      var val1 = (1/3)*a/ram.baseValue[0];
      var val2 = (1/3)*b/ram.baseValue[1];
      var val3 = (1/3)*c/ram.baseValue[2];
      return val1+val2+val3;
    },
    upgrade:function(a){
      var test = false;
      var lvls=[ram.lvl[0],ram.lvl[1],ram.lvl[2],ram.lvl[3]];
      lvls[a-1]++;
      var rams = ram.calcCons(lvls[0],lvls[1],lvls[2],lvls[3])
      if(cash>=ram.costFunc(a) && power.total(cpu.cons,rams,gpu.cons)<=power.watts){//prices
      if(a==1){
        if(mother.rams>ram.qtd){
          test=true;
        }
      }
      else{
        test=true;
      }
    }
      if(test){
      cash-=ram.costFunc(a)
      ram.lvl[a-1]++;
      ram.atualiza();
      }
    },
    calcCons:function(a,b,c,d){//recebe nivel
      var var1 = ram.funValues(1,a);
      var var2 = ram.funValues(2,b);
      var var3 = ram.funValues(3,c);
      var var4 = ram.funValues(4,d);
      return Math.floor(var1+var2+var3-var4);
    },
    testColors:function(a,b,c,d){
      if(a>ram.lvl[0])
          this.d1.style.color = goodColor;
      else
          this.d1.style.color = colorTestUp();

      if(b>ram.lvl[1])
            this.d2.style.color = goodColor;
      else
            this.d2.style.color = colorTestUp();

      if(c>ram.lvl[2])
            this.d3.style.color = goodColor;
      else
            this.d3.style.color = colorTestUp();

      if(ram.cons>ram.calcCons(a,b,c,d))
            this.d4.style.color = goodColor;
      else if(ram.cons<ram.calcCons(a,b,c,d))
            this.d4.style.color = badColor;
      else
            this.d4.style.color = colorTestUp();
    },
    test:function(v){

        var a = ram.lvl[0],b = ram.lvl[1],c= ram.lvl[2],d=ram.lvl[3];
          if(v==1){
            a++;
          this.d1.innerHTML = ram.funValues(v,a);
        }
        if(v==2){
           b++;
          this.d2.innerHTML = toBytes(ram.funValues(v,b),"memory");
        }
        if(v==3){
           c++
          this.d3.innerHTML = toBytes(ram.funValues(v,c),"speed");
        }
        if(v==4){
           d++;
        }
           e = ram.calcCons(a,b,c,d);
          this.d4.innerHTML = e+"W";
        document.getElementById("valorRam").innerHTML = ram.valor.toFixed(2)+" > "+ ram.valorFunc(ram.funValues(1,a),ram.funValues(2,b),ram.funValues(3,c)).toFixed(2);
        ram.testColors(a,b,c,d);
    },
    out:function(){
      this.d1.style.color = colorTestUp();
      this.d2.style.color = colorTestUp();
      this.d3.style.color = colorTestUp();
      this.d4.style.color = colorTestUp();
      calcRP();
      document.getElementById("valorRam").innerHTML = ram.valor.toFixed(2);
      document.getElementById("wattsram").innerHTML = ram.cons +"W";
      this.d1.innerHTML = ram.qtd;
      this.d2.innerHTML = toBytes(ram.capacity,"memory");
      this.d3.innerHTML = toBytes(ram.speed,"speed");
      this.d4.innerHTML = ram.cons + "W";
    }
}
