

// intFrameHeight = window.innerHeight;
let Username= document.querySelector("#UserName");
let isconected = document.querySelector('#isconected');
let disconnect = document.querySelector('#disconnect');

let userData = localStorage.getItem('loginData')

if (userData){
    userData = JSON.parse(userData)
    if(userData && userData.access_token && userData.user.id){
        document.getElementById("disconnect").style.display = "block"
    }
}




let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.document.getelementbyid('#spaceGame').style.setProperty('--vh', `${vh}px`);





function start(){
    let userData = localStorage.getItem('loginData')
    if (userData){
        userData = JSON.parse(userData) 
        if(userData && userData.access_token && userData.user.id){
            window.location.href = 'gameplay.html'
        }else{
            window.location.href = 'login.html'
        }
    }else{
        window.location.href = 'login.html'
    }

    console.log(userData)
}





function OpenRank(){
    document.getElementById("RankBtn").classList.add('selected');
    document.getElementById("Home").classList.remove('selected');
    document.getElementById("HomeSection").style.display = "none"
    document.getElementById("RankSection").style.display = "block"

    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/scores",
        success:function(response){
            console.log(response)
            let parent = document.querySelector('#RankSection')
            parent.innerHTML =''
            response.forEach((rank, i) => {
                let rankCard = document.createElement('bestRank')
                rankCard.classList='bestRank'
                rankCard.innerHTML =`<div class="circle"><span class="rankClass">${i+1}</span> </div>
                <h3 class="rank_Name">${rank.user_name}</h3>
                <h3>${rank.score}</h3>`
                parent.appendChild(rankCard)
            });
        },
        error:function(){

        },

    })




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