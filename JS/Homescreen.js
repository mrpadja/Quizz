let userData = localStorage.getItem('loginData')
let username = document.querySelector('#HomeUsername')
    
if (userData){
    userData = JSON.parse(userData)
    username.innerHTML = userData.user.name;

    console.log(userData)
    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/scores",
        success:function(response){
            console.log(response)
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
