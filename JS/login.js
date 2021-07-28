function createUser(event){
    event.preventDefault()

    let message =document.querySelector('#messageLogin');
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
        data,
        success:function(response){
        message.innerHTML="Votre compte a été créé, vous pouvez vous connecter maintenant"
        message.style.color="green"
        },
        error:function(errors){
            errors = JSON.parse(errors.responseText)
            message.innerHTML=errors.error
        },
    })
   

}


function login(event){
    event.preventDefault()
    let message =document.querySelector('#messageLogin');
    let email = document.querySelector('#upEmail');
    let password = document.querySelector('#upPassword');

    if(email && password){
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
                window.location.href = 'Homescreen.html'
            },
            error:function( errors){
                errors = JSON.parse(errors.responseText)
                message.innerHTML=errors.error
            },

        })
    }else{
        console.log('yghhkjhhjkhg')
    }

}