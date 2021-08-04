let userData = localStorage.getItem('loginData')
let username = document.querySelector('#HomeUsername')
let highScore = document.querySelector('#HomeUserScore')
    
if (userData){
    userData = JSON.parse(userData)
    username.innerHTML = userData.user.name;

    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/users/score",
        headers: {
            "Authorization": 'Bearer '+ userData.access_token
        },
        success:function(response){
            console.log(response)
            highScore.innerHTML = response.score
            
        },
        error:function(){

        },

    })
}




function logout(){
    $.ajax({
        method: "POST",
        url: "https://quizzapi.xyz/api/logout",
        success:function(response){
            localStorage.removeItem('loginData')
            window.location.href = 'index.html'
        },
        error:function(){

        },

    })
    localStorage.removeItem('loginData')
    window.location.href = 'index.html'
}
