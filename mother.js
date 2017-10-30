var mother = {
    color:"white",
    lvl:[1,1],
    rams:0,
    gpus:0,
    upgrades:[],
    d1:document.getElementsByClassName('5')[0].getElementsByClassName('qtd')[0],
    d2:document.getElementsByClassName('5')[1].getElementsByClassName('qtd')[0],
    p1:document.getElementsByClassName('5')[0].getElementsByClassName('price')[0],
    p2:document.getElementsByClassName('5')[1].getElementsByClassName('price')[0],
    atualiza:function(){
      mother.rams = mother.lvl[0];
      mother.gpus = mother.lvl[1]-1;
      this.d1.innerHTML = mother.rams;
      this.d2.innerHTML = mother.gpus;
      this.p1.innerHTML = toMoney(mother.costFunc(1));
      this.p2.innerHTML = toMoney(mother.costFunc(2));
    },
    upgrade:function(a){
        var test = false;
        if(cash>=mother.costFunc(a)){//prices
          test=true;
      }
        if(test){
        cash-=mother.costFunc(a)
        mother.lvl[a-1]++;
        mother.atualiza();
        }
    },
    costFunc(a){
      var val = 0;
      if(a==1){//rams
        val = 10*Math.pow(1.2,mother.lvl[0]-1);
      }
      else if(a==2){//gpus
        val = 5000*Math.pow(1.2,mother.lvl[1]-1);
      }
      return val;
    },
    testColors:function(a,b){
      this.d1.innerHTML = a;
      this.d2.innerHTML = b;
      if(a>mother.lvl[0])
          this.d1.style.color = goodColor;
      else
          this.d1.style.color = colorTestUp();

      if(b>=mother.lvl[1])
            this.d2.style.color = goodColor;
      else
            this.d2.style.color = colorTestUp();
    },
    test:function(a){
      var r = mother.rams,g = mother.gpus;
      if(a==1){
       r = mother.lvl[0]+1;
        this.d1.innerHTML = mother.lvl[0]+1
      }
      if(a==2){
         g = mother.lvl[1];
      }
      mother.testColors(r,g);
    },
    out:function(){
      this.d1.style.color = colorTestUp();
      this.d2.style.color = colorTestUp();
      this.d1.innerHTML = mother.rams;
      this.d2.innerHTML = mother.gpus;
    }
}
