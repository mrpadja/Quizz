function createUser(event){
    event.preventDefault()

    let name  = document.querySelector("#name");
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    let data = {
        name: name.value,
        email: email.value,
        password: password.value
    }

    $.ajax({
        method: "POST",
        url: "https://quizzapi.xyz/api/users",
        data
    })
    .done(function( response ) {
        console.log(response.message);
    });

}


function login(event){
    event.preventDefault()

    let email = document.querySelector('#upEmail');
    let password = document.querySelector('#upPassword');
    let data = {
            email: email.value,
            password: password.value
    }

    $.ajax({
        method: "POST",
        url: "https://quizzapi.xyz/api/login",
        data,
        success:function(response){
            localStorage.setItem('loginData', JSON.stringify(response))
            window.location.href = 'index.html'
        },
        error:function(){

        },

    })

}