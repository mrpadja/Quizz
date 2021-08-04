let userData =JSON.parse( localStorage.getItem('loginData'))
console.log(userData)




    $.ajax({
        method: "GET",
        url: "https://quizzapi.xyz/api/duels",
        headers: {"Authorization": 'Bearer '+userData.access_token
        },
        success:function(response){
            
            console.log(response)
            let parent = document.querySelector('#rank_historik')
            parent.innerHTML =''
            response.forEach((rank, i) => {
                let dCard = document.createElement('demand_Card')
                
                if(rank.status === 'finished'){
                    if(rank.from_user_id === userData.user.id){
                        if(rank.from_user_score === rank.to_user_score){
                            dCard.classList='win'
                            dCard.innerHTML =`  <h3>Vous avez eu un match null avec <span>${rank.to_user_name}</span> </h3>
                            <h3><span>${rank.from_user_score}</span> / <span>${rank.to_user_score}</span> </h3>`
                            parent.appendChild(dCard)
                        }
                        else if(rank.from_user_score > rank.to_user_score ){
                            dCard.classList='win'
                            dCard.innerHTML =`  <h3>Vous avez gagné  contre <span>${rank.to_user_name}</span> </h3>
                            <h3><span>${rank.from_user_score}</span> / <span>${rank.to_user_score}</span> </h3>`
                            parent.appendChild(dCard)
                        }else{
                            dCard.classList='lost'
                            dCard.innerHTML =`<h3>Vous avez perdu contre <span>${rank.to_user_name}</span> </h3>
                            <h3><span>${rank.to_user_score}</span> / <span>${rank.from_user_score}</span> </h3>`
                            parent.appendChild(dCard)

                        }

                    }else if(rank.from_user_score === rank.to_user_score){
                        dCard.classList='win'
                        dCard.innerHTML =`  <h3>Vous avez eu un match null avec <span>${rank.from_user_name}</span> </h3>
                        <h3><span>${rank.from_user_score}</span> / <span>${rank.to_user_score}</span> </h3>`
                        parent.appendChild(dCard)
                    }
                    else if(rank.from_user_score > rank.to_user_score){
                        dCard.classList='lost'
                        dCard.innerHTML =`<h3>Vous avez perdu contre <span>${rank.to_user_name}</span> </h3>
                        <h3><span>${rank.from_user_score}</span> / <span>${rank.to_user_score}</span> </h3>`
                        parent.appendChild(dCard)
                    }else{
                        dCard.classList='win'
                        dCard.innerHTML =`  <h3>Vous avez gagné  contre <span>${rank.from_user_name}</span> </h3>
                        <h3><span>${rank.to_user_score}</span> / <span>${rank.from_user_score}</span> </h3>`
                        parent.appendChild(dCard)
                    }
                    
                    
                    
            }
            });

            
        },
        error:function(errors){
            
        },
    })