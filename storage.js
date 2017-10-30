var storage = {
    color:"white",
    lvl:[1,1,1],
    qtd:0,
    capacity:0,
    speed:0,
    d1:document.getElementsByClassName('2')[0].getElementsByClassName('qtd')[0],
    d2:document.getElementsByClassName('2')[1].getElementsByClassName('qtd')[0],
    d3:document.getElementsByClassName('2')[2].getElementsByClassName('qtd')[0],
    p1:document.getElementsByClassName('2')[0].getElementsByClassName('price')[0],
    p2:document.getElementsByClassName('2')[1].getElementsByClassName('price')[0],
    p3:document.getElementsByClassName('2')[2].getElementsByClassName('price')[0],
    atualiza:function(){
      storage.qtd = storage.lvl[0];
      storage.capacity = storage.funValues(2,storage.lvl[1]);
      storage.speed = storage.funValues(3,storage.lvl[2]);
      document.getElementById("texthdd").innerHTML = storage.qtd+" x "+ toBytes(storage.capacity,'memory')+" ("+toBytes(storage.speed,'memory')+"/s)<br>Free:"+toBytes(storage.retFreeSpace(),'memory');
      this.d1.innerHTML = storage.qtd;
      this.d2.innerHTML = toBytes(storage.capacity,"memory");
      this.d3.innerHTML = toBytes(storage.speed,"memory")+"/s";
      this.p1.innerHTML = toMoney(storage.costFunc(1));
      this.p2.innerHTML = toMoney(storage.costFunc(2));
      this.p3.innerHTML = toMoney(storage.costFunc(3));
    },
    retFreeSpace:function(){
      var totalSpace = storage.qtd*storage.capacity;
      var appsSize = 0;
      for (var i = 0; i < app.num.length; i++) {
        if(app.num[i].downloaded != undefined )
        appsSize += app.num[i].downloaded;
      }
      return totalSpace-os.storageUsage()-appsSize;
    },
    costFunc:function(a){
      var val = 0;
      if(a==1){//qtd
        val = 5000*Math.pow(1.2,this.lvl[a-1]-1);
      }
      else if(a==2){//capacity
        val = 10*Math.pow(1.2,this.lvl[a-1]-1);
      }
      else if(a==3){//speed
        val = 10*Math.pow(1.2,this.lvl[a-1]-1);
      }
      return val;
    },
    funValues:function(a,lvl){
      var val = 0;
      if(a==2){
        val = 20*lvl;
      }
      else if(a==3){
        val = 2*lvl;
      }
      return val;
    },
    upgrade:function(a){
        var test = false;
        if(cash>=storage.costFunc(a)){//prices
          test=true;
      }
        if(test){
        cash-=storage.costFunc(a)
        storage.lvl[a-1]++;
        storage.atualiza();
        }
    },
    testColors:function(a,b,c){
      this.d1.innerHTML = a;
      this.d2.innerHTML = toBytes(b,"memory");
      this.d3.innerHTML = toBytes(c,"memory")+"/s";
      if(a>storage.lvl[0])
          this.d1.style.color = goodColor;
      else
          this.d1.style.color = colorTestUp();

      if(b>storage.funValues(2,storage.lvl[1]))
            this.d2.style.color = goodColor;
      else
            this.d2.style.color = colorTestUp();

        if(c>storage.funValues(3,storage.lvl[2]))
              this.d3.style.color = goodColor;
        else
              this.d3.style.color = colorTestUp();
    },
    test:function(v){
      var a = storage.qtd,b = storage.capacity,c= storage.speed;
      if(v==1){
       a = storage.lvl[0]+1;
        this.d1.innerHTML = storage.lvl[0]+1
      }
      if(v==2){
         b = storage.funValues(v,storage.lvl[1]+1);
      }
      if(v==3){
         c = storage.funValues(v,storage.lvl[2]+1);
      }
      storage.testColors(a,b,c);
    },
    out:function(){
      this.d1.style.color = colorTestUp();
      this.d2.style.color = colorTestUp();
      this.d3.style.color = colorTestUp();
      this.d1.innerHTML = storage.qtd;
      this.d2.innerHTML = toBytes(storage.capacity,"memory");
      this.d3.innerHTML = toBytes(storage.speed,"memory")+"/s";
    }
}
