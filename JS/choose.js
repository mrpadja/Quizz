let userData = localStorage.getItem('loginData')
let batlle = document.getElementById("battleisOn")





    function createbattle(event){
        event.preventDefault()
        userData = JSON.parse(userData)
        let touserId  = document.querySelector("#userId");
        
        let data = {
            from_user_id: userData.user.id,
            to_user_id: touserId.value
        }
        
    
        $.ajax({
            method: "POST",
            url: "https://quizzapi.xyz/api/duels",
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
        success:function(response){
            
            let parent = document.querySelector('#rankAdversary')
            parent.innerHTML =''
            response.forEach((rank, i) => {
                let rankCard = document.createElement('level_names')
                rankCard.classList='level_names'
                rankCard.innerHTML =` <input type="hidden" value="${rank.user_id}" id="userId">
                <input type="text" value="${rank.user_name}" readonly>
                <h3>${rank.score}</h3>
                <button type="submit" onclick="createbattle(event);">Défier</button>`
                parent.appendChild(rankCard)
            });
        },
        error:function(){

        },

    })


