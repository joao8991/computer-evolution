function changeScreen(){

  if($("#software").css("margin-left") == "0px"){
    $("#software").css("margin-left","-100%")
    $("#hardware").css("margin-left","0")
    $("#changeToHard").css("display","none")
    $("#changeToSoft").css("display","block")

  }
  else{
    $("#software").css("margin-left","0")
    $("#hardware").css("margin-left","100%")
    $("#changeToHard").css("display","block")
    $("#changeToSoft").css("display","none")
  }
}
$(document).ready(function(){
    $("body").click(function(){
        clicks++;
        atualizaAchiv(0);
    });
        $("#confirmChanges").click(function(){
            $("#software").css("background",document.getElementById("backcolor").value)
            $("#iconWorkspace").css("color",document.getElementById("wsinput2").getElementsByTagName("input")[0].value)
            $("#iconWorkspace").css("font-size",document.getElementById("wsinput5").getElementsByTagName("input")[0].value +"px")
            document.getElementById("iconWorkspace").className = "fa fa-" + document.getElementById("wsinput4").getElementsByTagName("input")[0].value

                x = parseFloat($("#iconWorkspace").css("width"));
                $("#iconWorkspace").css("left",(1100-x)/2+"px")
                x = parseFloat($("#iconWorkspace").css("height"));
                $("#iconWorkspace").css("top",(580-x)/2+"px")
        });

    $("#up .fa.fa-plus-square").click(function(){
      power.atualiza();
    });

    $("#up .fa.fa-minus-square").click(function(){
      power.atualiza();
    });
});
var atualArch = 1;
function changeArchive(a){
  var elems = document.getElementById("archiveMenu").getElementsByTagName("h3");
  for (var i = 0; i < elems.length; i++) {
    if((i+1)==a)
    elems[i].className="active"
    else
    elems[i].className="notactive"
  }
  var appsHere = document.getElementById("archive").getElementsByTagName("tr")
  var size=0, items =0 ;
  for (var i = 1; i < appsHere.length; i++) {
    var x = parseFloat(appsHere[i].id)
    if(a==1){
    appsHere[i].style.display = ""
    items++;
    size += app.num[x][6];
  }
    else if(app.num[x][6] == app.num[x].downloaded && app.num[x].onWorkspace  && a==2){
      appsHere[i].style.display = ""
      items++;
      size += app.num[x][6];
    }
    else if(app.num[x][6] == app.num[x].downloaded && !app.num[x].onWorkspace  && a==3){
        appsHere[i].style.display = ""
        items++;
        size += app.num[x][6];
      }
    else if(app.num[x][6] != app.num[x].downloaded && a==4){
        appsHere[i].style.display = ""
        items++;
        size += app.num[x][6];
}
    else{
      appsHere[i].style.display = "none"

    }
  }
  atualArch = a;
  document.getElementById("infoArchive").innerHTML = items +" items, " + toBytes(size,"memory") + " free";
}
