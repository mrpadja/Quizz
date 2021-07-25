let Username= document.querySelector("#UserName");
let isconected = document.querySelector('#isconected');
let disconnect = document.querySelector('#disconnect');


if(isconected.value){
    document.getElementById("disconnect").style.display = "block"
}



function OpenRank(){
    document.getElementById("RankBtn").classList.add('selected');
    document.getElementById("Home").classList.remove('selected');
    document.getElementById("HomeSection").style.display = "none"
    document.getElementById("RankSection").style.display = "block"
}
function OpenHome(){
    document.getElementById("Home").classList.add('selected');
    document.getElementById("RankBtn").classList.remove('selected');
    document.getElementById("RankSection").style.display = "none"
    document.getElementById("HomeSection").style.display = "block"
}

function commencer(event){
    event.preventDefault()
    localStorage.setItem("User",Username.value);
    window.location.href ="./gameplay.html" 
}