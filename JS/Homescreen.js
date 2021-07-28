let userData = localStorage.getItem('loginData')
let username = document.querySelector('#HomeUsername')
    
if (userData){
    userData = JSON.parse(userData)
    username.innerHTML = userData.user.name;

    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/scores",
        success:function(response){
            console.log(response)
            let score = document.querySelector('#HomeUserScore')
            score.innerHTML =response.score
           
        },
        error:function(){
    
        },
    
    })
}

