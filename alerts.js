var alertNum = 0;
function createAlert(title,text){
  var box = document.createElement("div");
  box.className = "alertBox";
  box.id = "alert" + alertNum;
  box.setAttribute("onclick","this.remove()")

  var t = document.createElement("h1");
  t.innerHTML = title

  var txt = document.createElement("p");
  txt.innerHTML = text;

  document.getElementById("content").appendChild(box);
  box.appendChild(t);
  box.appendChild(txt);
  var h = alertNum;// variavel que guarda o alertNum atual
  setTimeout(function(){
    if($("#alert"+h) != undefined){
      $("#alert"+h).remove();
    }
  },10000)
  alertNum++;
}
