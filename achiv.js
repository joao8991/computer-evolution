var achiv = {
  lvl:[1,1],
  criaAchiv:function(testValue,nomeAchiv){
    this.lvl.push(1);
    valueAtualInString += (","+testValue)
    var tr = document.createElement("tr")
    document.getElementById('AchiTab').appendChild(tr);
    var td = document.createElement("td")
    td.innerHTML = nomeAchiv;
    tr.appendChild(td)
    td = document.createElement("td")
    tr.appendChild(td)
    var prog = document.createElement("progress")
    prog.max=100;
    prog.value = 0;
    var h3 = document.createElement("h3");
    td.appendChild(prog)
    td.appendChild(h3);
    td = document.createElement("td")
    tr.appendChild(td)
    td.innerHTML = achiv.lvl[achiv.lvl.length-1];
    td = document.createElement("td")
    tr.appendChild(td)
    td.innerHTML = reward(achiv.lvl.length-1,achiv.lvl[achiv.lvl.length-1])+"$";
    atualizaAchiv(achiv.lvl.length-1)
  }
}

var valueAtualInString = "clicks,appRunned"
function atualizaAchiv(a){
  //a == undefined faz atualiza todas as achivs
  var div = document.getElementById('AchiTab');

  // valor que vai ser testado.
  var valueAtual = eval("["+valueAtualInString+"]");

  var i = 0;
  var f = valueAtual.length-1;
  if(a!=undefined){
    i=a;
    f=a;
  }

  for ( ; i <= f; i++) {
    var val1 = valueAchiv(1,achiv.lvl[i]);
    var val2 = valueAchiv(1,achiv.lvl[i])-valueAchiv(1,achiv.lvl[i]-1);
    var k = valueAtual[i]-valueAchiv(1,achiv.lvl[i]-1)
    div.getElementsByTagName("progress")[i].value = (k/val2)*100
    div.getElementsByTagName("h3")[i].innerHTML = valueAtual[i]+"/"+val1;
    if(valueAtual[i]>=val1){
      achivDone(i)
    }
  }
}
function reward(a,n){
  return Math.pow(10,n-1)*10;
}
function valueAchiv(a,n){
  if(n==0)
  return 0;
  else{
    return Math.pow(10,n-1)*10;
  }
}
function achivDone(a){
  var div = document.getElementById('AchiTab');
    cash += reward(a,achiv.lvl[a])
    achiv.lvl[a]++;
    div.getElementsByTagName("td")[((a)*4)+2].innerHTML = achiv.lvl[a];
    div.getElementsByTagName("td")[((a)*4)+3].innerHTML = reward(a,achiv.lvl[a])+"$";
    var nomeDaAchiv = div.getElementsByTagName("td")[((a)*4)].innerHTML;
    createAlert("Achievement #"+achiv.lvl[a],"You complete \"" + nomeDaAchiv + "\" achievement and won " + reward(a,achiv.lvl[a])+"$")
    atualizaAchiv(a)

}
function startAchivs(){
    achiv.criaAchiv("app.downloaded","Apps downloaded")
}
