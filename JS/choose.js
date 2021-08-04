let userData = JSON.parse(localStorage.getItem('loginData'))
let batlle = document.getElementById("battleisOn")

console.log(userData)



    function createbattle(event, id){
        event.preventDefault()
        
        let userData = localStorage.getItem('loginData')
        userData = JSON.parse(userData)
      
        
        
        let data = {
            from_user_id: userData.user.id,
            to_user_id: id
        }

        
    
        $.ajax({
            method: "POST",
            url: "https://quizzapi.xyz/api/duels",
            headers: {
                "Authorization": 'Bearer '+userData.access_token
             },
            data,
            success:function(response){

                localStorage.setItem('battle', 'true')
                localStorage.setItem('battle_id', JSON.stringify(response.duel_id))

                window.location.href = 'gameplay.html'
            },
            error:function(errors){
                
            },
        })
       
    
    }



    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/scores",
        headers: {
            "Authorization": 'Bearer '+userData.access_token
        },
        success:function(response){
            
            let parent = document.querySelector('#rankAdversary')
            parent.innerHTML =''
            for(let i = 0; i < response.length; i++){
          
                let rankCard = document.createElement('level_names')
                rankCard.classList='level_names'
                if(response[i].user_name != userData.user.name)
                rankCard.innerHTML =` <input type="hidden" value="${response[i].user_id}" id="toUserId">
                <input type="text" value="${response[i].user_name}" readonly>
                <h3>${response[i].score}</h3>
                <button type="submit" onclick="createbattle(event, ${response[i].user_id});">Défier</button>`
                parent.appendChild(rankCard)
           
        }
        },
        error:function(){

        },

    })


