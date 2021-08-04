let userData =JSON.parse( localStorage.getItem('loginData'))
console.log(userData)

function acceptbattle(id){
    localStorage.setItem('battle', 'true')
    localStorage.setItem('battleId', JSON.stringify(id))
    window.location.href = 'gameplay.html'
}


function refusebattle(id){
    let userData =JSON.parse( localStorage.getItem('loginData'))
    let data ={
        duel_id: id,
        status: "rejected"
    }

    $.ajax({
        method: "PUT",
        url: "https://quizzapi.xyz/api/duels",
        headers: {
            "Authorization": 'Bearer '+ userData.access_token
        },
        data,
        success:function(response){
         console.log(response)
         location.reload()
        },
        error:function( errors){
         
        },

    })
}



    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/duels",
        headers: {"Authorization": 'Bearer '+userData.access_token
        },
        success:function(response){
            
            console.log(response)
            let parent = document.querySelector('#rankDemand')
            parent.innerHTML =''
            response.forEach((rank, i) => {
                let dCard = document.createElement('demand_Card')
                dCard.classList='demand_Card'
                if(rank.status === 'pending'){
                    if(rank.from_user_id === userData.user.id){
                    dCard.innerHTML =` <h3>${rank.from_user_score}</h3>
                    <img src="/Assets/images/vs.png" alt="">
                    <h3>${rank.to_user_name}</h3>`
                    parent.appendChild(dCard)
                    }else{


                        dCard.innerHTML =` <h3>${rank.from_user_name}</h3>
                        <img src="/Assets/images/vs.png" alt="">
                        <div class="demand_action">
                            <button class="Demand_yes" onclick="acceptbattle(${rank.id})">Accepter</button>
                            <button class="Demand_no" onclick="refusebattle(${rank.id})">Refuser</button>`
                        parent.appendChild(dCard)
                    }
            }
            });

            
        },
        error:function(errors){
            
        },
    })
   






