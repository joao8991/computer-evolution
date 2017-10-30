//type pode ser 1(app),2(game),3(background)
var app ={
  num:[],
  installed:[],
  onWorkspace:0,
  downloaded:0,
  create:function(name,firstColor,secColor,type,lvlCpu,lvlRam,lvlHd,lvlGpu,modifierMoney,lvlPrice,lvlTime,icon,runtime){
    var price = funcPrice(lvlPrice);
    var cpuF = finalValues(1,lvlCpu);
    var ramF = finalValues(2,lvlRam);
    var hddF = finalValues(3,lvlHd);
    var gpuF = finalValues(4,lvlGpu);
        if(type==1)
          type="star"
        else if(type==2)
          type="gamepad"
        else if(type==3)
          type="tachometer"
    var arr = [name,firstColor,secColor,type,cpuF,ramF,hddF,gpuF,modifierMoney,price,icon,runtime];
    app.num.push(arr);
  },
  formula:function(a){
    var appp = app.num[a];
    return appp[4]*appp[5]*(appp[7]+1)*appp[8];
  },
  finishAnim(a){
    document.getElementById("app"+a).className = "app finish";
    setTimeout(function(){
      if(app.num[a].runPer > 0)
        document.getElementById('app'+a).className = "app run"
      else
        document.getElementById('app'+a).className = "app notRun"
    },200)
  },
  startIdle:function(a){
    app.num[a].idle = true;
    document.getElementById("app"+a).getElementsByClassName('idleapp')[0].setAttribute("onclick","confirmation('Do you want to stop Idle mode?','app.stopIdle("+a+")'),app.cancelRun("+a+")")
    document.getElementById("inIdleMode"+a).style.display = "block";
    app.startRun(a);
  },
  stopIdle:function(a){
    app.num[a].idle = false;
    document.getElementById("app"+a).getElementsByClassName('idleapp')[0].setAttribute("onclick","confirmation('Do you want to change this app to Idle mode?<br>It will slow down 10x  but will use 5x minus hardware resources and will restart running automatically','app.startIdle("+a+")'),app.cancelRun("+a+")")
    document.getElementById("inIdleMode"+a).style.display = "none";
    //app.forceCancelRun(a)
  },
  startRun:function(a){
    if(document.getElementById('app'+a).className != "app run" &&  app.testRun(a) ){
      document.getElementById('app'+a).className = "app run"
      if(app.num[a].idle)
        document.getElementById("app"+a).className="app runIdle"
      app.run(a)
    }
  },
  retUse:function(a,comp){
    if(comp==1){ // cpu
      return app.num[a][4]
    }
    else if(comp==2){//ram
      return app.num[a][5]
    }
    else if(comp==3){//gpu
      return 0;
    }
    return null;
  },
  testRun:function(a){
    var maxOsCpu = os.retBase(1)*2;
    var maxOsRam = os.retBase(2)*1.2;
    var cpuTest = maxOsCpu + app.retUse(a,1);
    var ramTest = maxOsRam + app.retUse(a,2);
    for (var i = 0; i < app.installed.length; i++) {
      var n = app.installed[i]
      if( app.num[n].runPer>0){
        cpuTest+=app.retUse(n,1)
        ramTest+=app.retUse(n,2)
      }
    }
    if(cpuTest>cpu.speed && ramTest>ram.capacity){
      info("Your CPU and RAM doesn't allow you to run this app")
    }
    else if(cpuTest>cpu.speed){
      info("Your CPU doesn't allow you to run this app")
    }
    else if(ramTest>ram.capacity){
      info("Your RAM doesn't allow you to run this app")
    }
    if(cpuTest<=cpu.speed && ramTest<=ram.capacity)
    return true;
    else
    return false;
  },
  cancelRun:function(a){
    if(app.num[a].runPer==0){
      document.getElementById('app'+a).className = "app notRun"
      app.num[a].runPer = 100;
      app.num[a].timesRunned--;
      document.getElementById('running'+a).style.width = app.num[a].runPer + "%";
      cash -= app.formula(a);
    }
  },
  forceCancelRun:function(a){
      cpu.use -= app.retUse(a,1);
      ram.use -= app.retUse(a,2);
      if(gpu.valor>0)
      gpu.use -= app.retUse(a,3);
      document.getElementById('app'+a).className = "app notRun"
      app.num[a].runPer = 100;
      app.num[a].timesRunned--;
      document.getElementById('running'+a).style.width = app.num[a].runPer + "%";
      cash -= app.formula(a);
  },
  run:function(a){
    var testIdle = app.num[a].idle;
    var runTime = app.num[a][11]/rp;
    if(testIdle == undefined || testIdle == false)
    var baseAdd = (1/runTime);
    else
    var baseAdd = (1/(runTime*10));
    app.num[a].runPer +=baseAdd;
    document.getElementById('running'+a).style.width = app.num[a].runPer + "%";
    if(testIdle == undefined || testIdle == false){
    cpu.use += app.retUse(a,1);
    ram.use += app.retUse(a,2);
    if(gpu.valor>0)
    gpu.use += app.retUse(a,3);
  }
  else{
    cpu.use += (app.retUse(a,1)/5);
    ram.use += (app.retUse(a,2)/5);
    if(gpu.valor>0)
    gpu.use += (app.retUse(a,3)/5);
  }
    if(app.num[a].runPer>=100){
    if(testIdle == undefined || testIdle == false){
      document.getElementById('app'+a).className = "app notRun"
        cpu.use -= app.retUse(a,1);
        ram.use -= app.retUse(a,2);
        if(gpu.valor>0)
        gpu.use -= app.retUse(a,3);
    }
    else{
        setTimeout(function(){
          cpu.use -= (app.retUse(a,1)/5);
          ram.use -= (app.retUse(a,2)/5);
          if(gpu.valor>0)
          gpu.use -= (app.retUse(a,3)/5);
          app.run(a);
        },10)
    }
        app.num[a].timesRunned++;
      cash += app.formula(a);
      app.finishAnim(a);
      appRunned++;
      atualizaAchiv()
        app.num[a].runPer = 0;
        document.getElementById('running'+a).style.width = app.num[a].runPer + "%";
    }
  else{
    setTimeout(function(){
    if(testIdle == undefined || testIdle == false){
    cpu.use -= app.retUse(a,1);
    ram.use -= app.retUse(a,2);
    if(gpu.valor>0)
    gpu.use -= app.retUse(a,3);
  }
  else{
    cpu.use -= (app.retUse(a,1)/5);
    ram.use -= (app.retUse(a,2)/5);
    if(gpu.valor>0)
    gpu.use -= (app.retUse(a,3)/5);
  }
      app.run(a);
    },10)
      }

  },
  remove:function(a){
    if(document.getElementById('app'+a) != undefined){
        document.getElementById('app'+a).remove();
        app.onWorkspace--;
        app.num[a].onWorkspace = false;
      }

    document.getElementById("remove"+a).innerHTML = "Download"
    document.getElementById("remove"+a).setAttribute("onclick",'confirmation("Do you want to download this app again?","app.startDownload('+a+')")');
    app.num[a].downloaded = 0;
    app.num[a].installed = 0;
    changeArchive(atualArch);
  },
  removeFromWS:function(a){
      document.getElementById('app'+a).remove();
      document.getElementById("place"+a).innerHTML = "Place on workspace"
      document.getElementById("place"+a).setAttribute("onclick",'confirmation("Do you want to place this app on workspace?","app.createOnWorkspace('+a+')")');
      app.onWorkspace--;
      app.num[a].onWorkspace = false;
      changeArchive(atualArch);
  },
  buy:function(a){
    if(cash>=app.num[a][9] && app.num[a][6] <= storage.retFreeSpace()){
      cash-=app.num[a][9];
    this.num[a].bought = true;
    deleteWindow("appInfo"+a);
    app.startDownload(a);
    closeAllWindows();
    createWindow("downloads")
    atualizaLoja();
    }
    else if(cash < app.num[a][9]){
      info("You don't have enough money to buy this app.")
    }
    else if(app.num[a][6] > storage.retFreeSpace()){
      info("You don't have enough memory to install this app.")
    }
  },
  createOnWorkspace:function(a){
    app.num[a].runPer = 0;
    app.onWorkspace++;
    app.num[a].onWorkspace = true;
    var workspace = document.getElementById("workspace");
    var appd = document.createElement("div");
    appd.className = "app notRun";
    appd.id = "app"+a;
    appd.style.top= ((this.onWorkspace-1)*86)%(86*5) + "px";
    appd.style.left= Math.floor((this.onWorkspace-1)/5)*100 + "px";
    workspace.appendChild(appd);


    var inIdleMode = document.createElement("i");
    inIdleMode.className = "fa fa-bullseye inIdleMode"
    inIdleMode.id = "inIdleMode"+a;
    inIdleMode.style.display = "none"
    appd.appendChild(inIdleMode);

    var icon = document.createElement("i");
    icon.className = "iconapp fa fa-" + app.num[a][10];
    var clr = app.num[a][2];
    if(clr == "white")
    clr = app.num[a][1];
    icon.style.color = clr;
    appd.appendChild(icon);
    appd.setAttribute("onclick", "app.startRun(" + a + ")");


    var appname = document.createElement('h4');
    appname.innerHTML = app.num[a][0];
    appd.appendChild(appname);


    var infodiv = document.createElement('div');
    infodiv.className = "infoapp";
    infodiv.setAttribute("onclick","createInfoApp2("+a+"),app.cancelRun("+a+")")
    appd.appendChild(infodiv);

    var iconinfo = document.createElement("i");
    iconinfo.className = "fa fa-info-circle iconinfo";
    infodiv.appendChild(iconinfo);

    var unindiv = document.createElement('div');
    unindiv.className = "uninapp";
    unindiv.setAttribute("onclick","confirmation('Do you want to remove this app from workspace?','app.removeFromWS("+a+")'),app.cancelRun("+a+")");
    appd.appendChild(unindiv);


    var unininfo = document.createElement("i");
    unininfo.className = "fa fa-close iconunin";
    unindiv.appendChild(unininfo);


    var idlediv = document.createElement('div');
    idlediv.className = "idleapp";
    idlediv.setAttribute("onclick","confirmation('Do you want to change this app to Idle mode?<br>It will slow down 10x  but will use 5x minus hardware resources and will restart running automatically','app.startIdle("+a+")'),app.cancelRun("+a+")")
    appd.appendChild(idlediv);

    var iconidle = document.createElement("i");
    iconidle.className = "fa fa-bullseye iconidle";
    idlediv.appendChild(iconidle);

    var running = document.createElement("div")
    running.id = "running"+a;
    running.className = "running";
    appd.appendChild(running);

    if(document.getElementById("place" +a ) !=undefined){
      document.getElementById("place" +a ).innerHTML = "Remove from workspace";
      document.getElementById("place" +a ).setAttribute("onclick",'confirmation("Do you want to remove this app from workspace?","app.removeFromWS('+a+')")')
    }
    changeArchive(atualArch);
  },
  createOnArchive:function(a){
    if(document.getElementById("place"+a) == undefined){
    var archive = document.getElementById("archive").getElementsByClassName('foldersSpace')[0];
    var t = archive.getElementsByTagName("table")[0];
    var tr = document.createElement("tr");
    tr.id=a+"appArchive";
    t.appendChild(tr);

    var td1 = document.createElement("td");
    var color = app.num[a][2] == "white" ?  app.num[a][1] : app.num[a][2];
    td1.innerHTML = "<i style='color:"+color+"'class='fa fa-" + app.num[a][10]+"'></i>" + app.num[a][0];
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    td2.innerHTML = retTypeName(app.num[a][3]);
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.innerHTML = toBytes(app.num[a][6],"memory");
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.innerHTML = "Delete";
    td4.id = "remove"+a;
    td4.setAttribute("onclick",'confirmation("Do you want to delete this app?","app.remove('+a+')")');
    td4.className = "tableAction";
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    td5.className = "tableAction";
    td5.id = "place"+a;
    td5.innerHTML = "Remove from workspace";
    td5.setAttribute("onclick",'confirmation("Do you want to remove this app from workspace?","app.removeFromWS('+a+')")')
    tr.appendChild(td5);
    }
    else{
      document.getElementById("remove"+a).innerHTML = "Delete"
      document.getElementById("remove"+a).setAttribute("onclick",'confirmation("Do you want to delete this app again?","app.remove('+a+')")');
    }
    changeArchive(atualArch);
  },
  startInstall:function(a){
        createWindow("install"+a,"install",app.num[a][0]);
        var inst = document.getElementById('install'+a);
        var space = document.createElement("div");
        space.className = "installSpace";
        inst.appendChild(space);
        var instBar = document.createElement("div");
        instBar.className = "backbar"
        var bar = document.createElement("div");
        bar.id = "instbar"+a
        bar.className = "bar"
        space.appendChild(instBar);
        space.appendChild(bar);

        var infoDown = document.createElement("h4");
        infoDown.id = "infoInst" + a;
        space.appendChild(infoDown);

        var appName = document.createElement("h3");
        appName.innerHTML = "Installing";
        space.appendChild(appName);

        var icon = document.createElement("i");
        icon.className = "fa fa-" + app.num[a][10];
        space.appendChild(icon);
        app.num[a].installed = 0;

        var but1 = document.createElement("button")
        but1.innerHTML = "Close";
        but1.id ="butInst1";
        but1.setAttribute("onclick","closeWindow('install"+a+"')")
        var but2 = document.createElement("button")
        but2.innerHTML = "Cancel";
        but2.id ="butInst2";
        //but2.setAttribute("onclick","") terá de parar a instalacao
        inst.appendChild(but1);
        inst.appendChild(but2);
        app.resumeInstall(a);
  },
  resumeInstall:function(a){
    var speed = storage.speed;

    if(speed/100+app.num[a].installed>app.num[a][6])
    app.num[a].installed = app.num[a][6];
    else
    app.num[a].installed += speed/100;
    $("#instbar"+a).css("width",(app.num[a].installed/app.num[a][6])*590 +"px");
    document.getElementById('infoInst'+a).innerHTML = memoryOf(app.num[a][6],app.num[a].installed)+" ("+toBytes(speed,"memory")+"/sec)";
    setTimeout(function(){
      if( app.num[a].installed!=app.num[a][6])
      app.resumeInstall(a);
        else{
          if(document.getElementById("remove"+a) == undefined)//testa se ja tinhas esta app instalada
          app.installed.push(a);
          app.createOnWorkspace(a);
          app.createOnArchive(a);
          achiv.criaAchiv("app.num["+a+"].timesRunned",app.num[a][0]+" runs");
          deleteWindow("install"+a);
      }
    },10);
  },
  startDownload:function(a){
  if(document.getElementById("downloadSpace"+a) == undefined){
    createWindow("downloads")
    var down = document.getElementById('downloads');
    var space = document.createElement("div");
    space.className = "downloadSpace";
    space.id = "downloadSpace"+a;
    down.appendChild(space);
    var downBar = document.createElement("div");
    downBar.className = "backbar"
    var bar = document.createElement("div");
    bar.id = "downbar"+a
    bar.className = "bar"
    space.appendChild(downBar);
    space.appendChild(bar);

    var stop = document.createElement("i")
    stop.id = "pause"+a;
    stop.className = "fa fa-pause-circle"
    stop.setAttribute("onclick","app.pausePlayDownload("+a+")")
    space.appendChild(stop);

    var infoDown = document.createElement("h4");
    infoDown.id = "infoDown" + a;
    infoDown.innerHTML = "test"
    space.appendChild(infoDown);

    var appName = document.createElement("h3");
    appName.innerHTML = app.num[a][0];
    space.appendChild(appName);

    var icon = document.createElement("i");
    icon.className = "fa fa-file"
    space.appendChild(icon);
    app.num[a].downloaded = 0;
    storage.atualiza();
    if(app.num[a].timesRunned==undefined)
        app.num[a].timesRunned = 0;
    app.resumeDownload(a);
  }
    else{
      document.getElementById("downloadSpace"+a).remove();
      app.startDownload(a);
    }
  },
  resumeDownload:function(a){
    internet.users++;
    if(app.num[a].internetDelay != undefined ){
      var net = internet.retNet();
      document.getElementById('infoDown'+a).innerHTML = memoryOf(app.num[a][6],app.num[a].downloaded)+" ("+toBytes(net,"memory")+"/sec)";
    if(app.num[a].downloaded<app.num[a][6]){
      var add = (net*app.num[a].internetDelay)/1000
      if(add+app.num[a].downloaded>app.num[a][6])
      app.num[a].downloaded =app.num[a][6];
      else
    app.num[a].downloaded += add;
  }
  if(app.num[a].downloaded==app.num[a][6]){
      closeWindow("downloads");
      document.getElementById("pause"+a).className = "fa fa-times-circle"
      document.getElementById("pause"+a).setAttribute("onclick","document.getElementById('downloadSpace"+a+"').remove()")
      document.getElementById('infoDown'+a).innerHTML = memoryOf(app.num[a][6],app.num[a].downloaded)+". Download finished.";
      app.downloaded++;
      atualizaAchiv();
      app.startInstall(a)
  }
    }
    else{
      document.getElementById('infoDown'+a).innerHTML = memoryOf(app.num[a][6],app.num[a].downloaded)+" ("+toBytes(0,"memory")+"/sec)";
    }
    app.num[a].internetDelay = 125 + Math.random()*125;//ms
    $("#downbar"+a).css("width",(app.num[a].downloaded/app.num[a][6])*520 +"px");
    setTimeout(function(){
      internet.users--;
      if(document.getElementById('pause'+a).className == "fa fa-pause-circle" && app.num[a].downloaded!=app.num[a][6])
      app.resumeDownload(a);
    },app.num[a].internetDelay)
  },
  pausePlayDownload:function(a){
    var i = document.getElementById('pause'+a)
    if(i.className == "fa fa-pause-circle"){
      i.className = "fa fa-play-circle"
      document.getElementById('infoDown'+a).innerHTML = memoryOf(app.num[a][6],app.num[a].downloaded) + ". Paused"
    }
    else{
      i.className = "fa fa-pause-circle"
      app.resumeDownload(a);
    }
  }

}
function finalValues(w,lvl){
  var ret = 0;
  if(w==1){//cpu
    ret = 5* Math.pow(lvl,1.5)
  }
  else if(w==2){//ram
    ret = Math.pow(4,lvl)
  }
  else if(w==3){//hd
    ret = Math.pow(5,lvl)
  }
  else if(w==4){//gpu
    ret = Math.pow(3,lvl)-3
  }
  return ret;
}
function funcPrice(lvl){
  var ret = 0;
  if(lvl>1)
    ret+=0.99;
  else
    return 0;
  return  5 * Math.pow(2,lvl)+ret;
}
function createInfoApp(i){
  if(document.getElementById("appInfo"+i) == null){
  createWindow("appInfo"+i,"noHeight",app.num[i][0]);
  var h2 = document.createElement("h2")
  h2.innerHTML = "System Requirements";
  h2.className = "SystemRequirements";
  document.getElementById("appInfo"+i).appendChild(h2);
  document.getElementById("appInfo"+i).getElementsByClassName("close")[0].setAttribute("onclick","deleteWindow('appInfo"+i+"')")
  var table = document.createElement("table")
  table.className = "requirements";
  document.getElementById("appInfo"+i).appendChild(table);
  var tr1 = document.createElement("tr")
  table.appendChild(tr1);
  var th1 = document.createElement("th")
  th1.innerHTML = " ";
  var th2 = document.createElement("th")
  th2.innerHTML = "Minimum";
  var th3 = document.createElement("th")
  th3.innerHTML = "Your Specs";
  tr1.appendChild(th1);
  tr1.appendChild(th2);
  tr1.appendChild(th3);

  //1

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "Operating System";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = "1,2";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = "2 or higher";
  tr.appendChild(td);
  //2

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "CPU";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][4],"speed");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(cpu.speed,"speed");
  tr.appendChild(td);
  if(app.num[i][4]<=cpu.speed)
  td.style.background = goodColor
  else
  td.style.background = badColor
  //3

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "RAM";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][5],"memory");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(ram.capacity,"memory");
  tr.appendChild(td);
  if(app.num[i][5]<=ram.capacity)
  td.style.background = goodColor
  else
  td.style.background = badColor
  //4

  if(app.num[i][7]>0){
  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "GPU";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][7],"memory");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(gpu.memory,"memory");
  tr.appendChild(td);
  if(app.num[i][7]<=gpu.memory)
  td.style.background = goodColor
  else
  td.style.background = badColor
  }
  //5

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "Storage";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][6],"memory");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(storage.retFreeSpace(),"memory");
  tr.appendChild(td);
  if(app.num[i][6]<=storage.retFreeSpace())
  td.style.background = goodColor
  else
  td.style.background = badColor

 //runtime-points
  var h4 = document.createElement("h4")
  document.getElementById("appInfo"+i).appendChild(h4);
  h4.className = "rpused"
  h4.innerHTML = "Runtime based on atual <span class='runtime-points'>RP</span>:"+toTime((app.num[i][11]/rp)*1000);

  var but = document.createElement("button")
  but.className = "buy"
  but.innerHTML = "Buy"
  but.setAttribute("onclick","testBuy("+i+")")
  document.getElementById("appInfo"+i).appendChild(but);

  var price = document.createElement("h3")
  price.className = "priceOnInfo";
  price.innerHTML = toMoney(app.num[i][9]);
  document.getElementById("appInfo"+i).appendChild(price);
  }
}
function createInfoApp2(i){
  if(document.getElementById("appInfo"+i) == null){
  createWindow("appInfo"+i,"noHeight",app.num[i][0]);
  var h2 = document.createElement("h2")
  h2.innerHTML = "System Requirements";
  h2.className = "SystemRequirements";
  document.getElementById("appInfo"+i).appendChild(h2);
  document.getElementById("appInfo"+i).getElementsByClassName("close")[0].setAttribute("onclick","deleteWindow('appInfo"+i+"')")
  var table = document.createElement("table")
  table.className = "requirements";
  document.getElementById("appInfo"+i).appendChild(table);
  var tr1 = document.createElement("tr")
  table.appendChild(tr1);
  var th1 = document.createElement("th")
  th1.innerHTML = " ";
  var th2 = document.createElement("th")
  th2.innerHTML = "Minimum";
  var th3 = document.createElement("th")
  th3.innerHTML = "Your Specs";
  tr1.appendChild(th1);
  tr1.appendChild(th2);
  tr1.appendChild(th3);

  //1

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "Operating System";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = "1,2";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = "2 or higher";
  tr.appendChild(td);
  //2

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "CPU";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][4],"speed");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(cpu.speed,"speed");
  tr.appendChild(td);
  if(app.num[i][4]<=cpu.speed)
  td.style.background = goodColor
  else
  td.style.background = badColor
  //3

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "RAM";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][5],"memory");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(ram.capacity,"memory");
  tr.appendChild(td);
  if(app.num[i][5]<=ram.capacity)
  td.style.background = goodColor
  else
  td.style.background = badColor
  //4
  if(app.num[i][7]>0){
  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "GPU";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][7],"memory");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(gpu.capacity,"memory");
  tr.appendChild(td);
  if(app.num[i][7]<=gpu.capacity)
  td.style.background = goodColor
  else
  td.style.background = badColor
    }
  //5

  var tr = document.createElement("tr")
  table.appendChild(tr);
  var td = document.createElement("td")
  td.innerHTML = "Storage";
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(app.num[i][6],"memory");
  tr.appendChild(td);
  var td = document.createElement("td")
  td.innerHTML = toBytes(storage.capacity,"memory");
  tr.appendChild(td);
  if(app.num[i][6]<=storage.capacity)
  td.style.background = goodColor
  else
  td.style.background = badColor
  }
}
function testBuy(a){
  if(app.num[a][9]<=cash)
    confirmation("Do you want to buy " + app.num[a][0] +" for " + toMoney(app.num[a][9])+"?","app.buy("+a+")");
  else
    info("Your balance does not allow you to buy this app.");
}
function createApps(){
  /*app.create(name,firstColor,secColor,type,lvlCpu,lvlRam,lvlHd,lvlGpu,modifierMoney,lvlPrice,icon,runtime-points)
  type(
    -app
    -game
    -background app
      )
*/
  app.create("Terminal","black","white",1,1,1,1,1,1,1,1,"terminal",10);
  app.create("Txt editor","hsl(0,0%,90%)","#2bc2ca",1,1,1,2,1,1,1,1,"sticky-note",10);
  app.create("Atom","#47b143","white",1,1,1,1,1,1,1,1,"rocket",10);
  app.create("WirePaw","#ff6200","white",1,1,1,1,1,1,2,1,"paw",10);
  app.create("Basic Calculator","black","#00d173",1,1,1,1,1,1,2,1,"calculator",10);
  app.create("Exel","white","#47b143",1,1,1,1,1,1,2,1,"file-excel-o",10);
  app.create("PowerJoint","white","#ff7e3d",1,1,1,1,1,1,3,1,"file-powerpoint-o",10);
  app.create("Word","#3dc5ff","white",1,1,1,1,1,1,3,1,"file-word-o",10);
  app.create("Cheese","#db9600","black",1,1,1,1,1,1,3,1,"moon-o",10);
  app.create("FireSocks","red","white",1,1,1,1,1,1,3,1,"fire",10);
  app.create("Gougle Chromium","#db007c","white",1,1,1,1,1,1,3,1,"chrome",10);
  app.create("Pung","black","white",2,1,1,1,1,1,3,1,"circle",10);
  app.create("Miner","#696969","black",2,1,1,1,1,1,3,1,"certificate",10);
  app.create("Amazona","white","#6300db",1,1,1,1,1,1,0,1,"leaf",10);
  app.create("Calendar","white","#3dc5ff",1,1,1,1,1,1,3,1,"calendar",10);
}
function atualizaLoja(){
  //ordenar apps por importancia
  //usar insertion sort
  var principal = document.getElementsByClassName("principal")[0];
  var notBought = [];
  for (var i = 0; i < app.num.length; i++) {
    if(app.num[i].bought==undefined)
    notBought.push(i);
  }
  var del = app.num.length - notBought.length;
  while(del>0){
    principal.getElementsByClassName("app")[principal.getElementsByClassName("app").length-1].remove();
    del--;
  }
  for (var b = 0; b < notBought.length; b++) {
    var i = notBought[b];
    if( principal.getElementsByClassName("app")[b] != null){
    principal.getElementsByClassName("app")[b].style.background = app.num[i][1];
    principal.getElementsByClassName("app")[b].setAttribute("onclick","createInfoApp("+i+")");
    principal.getElementsByClassName('iconOnShop')[b].className = "iconOnShop fa fa-"+app.num[i][10];
    principal.getElementsByClassName('iconOnShop')[b].style.color = app.num[i][2];
    principal.getElementsByClassName('name')[b].innerHTML = app.num[i][0];
    if(app.num[i][1] == "white"){
      principal.getElementsByClassName('name')[b].style.color = "black";
      principal.getElementsByClassName('price')[b].style.color = "black";
    }
    else{
      principal.getElementsByClassName('name')[b].style.color = "white";
      principal.getElementsByClassName('price')[b].style.color = "white";
    }
    principal.getElementsByClassName('type')[b].className = "type fa fa-" + app.num[i][3];
    var appType = retTypeName(app.num[i][3]);
    principal.getElementsByClassName('type')[b].setAttribute("onmousemove","infobox(10,'right','"+appType+"')")
    principal.getElementsByClassName('type')[b].setAttribute("onmouseout","infobox('close')")
    principal.getElementsByClassName('price')[b].innerHTML = toMoney(app.num[i][9]);
    }
    else{ //cria app na loja
      var newApp = document.createElement("div");
      newApp.className = "app"
      newApp.setAttribute("onclick","createInfoApp("+i+")");
      var ic = document.createElement("i");
      ic.className = "iconOnShop fa fa-"+app.num[i][10]
      document.getElementById('suggest').appendChild(newApp);
      newApp.appendChild(ic);
      var name = document.createElement("h2");
      name.innerHTML = app.num[i][0];
      name.className ="name"
      newApp.appendChild(name)
      var price = document.createElement("h2");
      price.innerHTML =  toMoney(app.num[i][9]);
      price.className ="price"
      newApp.appendChild(price)

      var iconType = document.createElement("i");
      iconType.className = "type fa fa-" + app.num[i][3];
      newApp.appendChild(iconType)
      var appType = retTypeName(app.num[i][3]);
      iconType.setAttribute("onmousemove","infobox(10,'right','"+appType+"')")
      iconType.setAttribute("onmouseout","infobox('close')")
      principal.getElementsByClassName("app")[b].style.background = app.num[i][1];
      principal.getElementsByClassName('iconOnShop')[b].className = "iconOnShop fa fa-"+app.num[i][10];
      principal.getElementsByClassName('iconOnShop')[b].style.color = app.num[i][2];

      if(app.num[i][1] == "white"){
        principal.getElementsByClassName('name')[b].style.color = "black";
        principal.getElementsByClassName('price')[b].style.color = "black";
      }
      else{
        principal.getElementsByClassName('name')[b].style.color = "white";
        principal.getElementsByClassName('price')[b].style.color = "white";
      }

    }
  }
  centrarIcons();
}
function retTypeName(n){

  if(n=="star")
    return "App";
  if(n=="gamepad")
    return "Game";
  else if(n=="tachometer")
    return "Background App";

  return null;
}
function centrarIcons(){
var principal = document.getElementsByClassName("principal")[0];
  for (var i = 0; i < app.num.length; i++) {
    if( principal.getElementsByClassName("app")[i] != null){
    var w = parseFloat($(".principal .app:eq("+i+")").css("width"));
    var wi = parseFloat($(".iconOnShop:eq("+i+")").css("width"));
    var h = parseFloat($(".principal .app:eq("+i+")").css("height"));
    var hi = parseFloat($(".iconOnShop:eq("+i+")").css("height"));
    $(".iconOnShop:eq("+i+")").css("left",(w-wi)/2);
    $(".iconOnShop:eq("+i+")").css("top",(h-hi)/2);
    }
  }
}
createApps();
atualizaLoja();
centrarIcons();
