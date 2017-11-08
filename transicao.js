var back = document.createElement("div");
back.id = "backTrans";
document.body.appendChild(back);
var name1 = document.createElement("h1");
name1.id = "name1";
name1.innerHTML ="iDoors"
back.appendChild(name1);
var l = (window.innerWidth-1100)/2;
$("#backTrans").css("left",l+"px");


function endTransicao(){
  document.getElementById("box").getElementsByTagName("h3")[0].innerHTML = computerName;
setTimeout(function(){
  name1.style.opacity=0;
  setTimeout(function(){
    back.style.opacity=0;
    setTimeout(function(){
      backTrans.style.display ="none"
    },400);
  },500);
},400);
}
