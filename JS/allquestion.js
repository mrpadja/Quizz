$.ajax({
    method: "GET",
    url: "https://quizzapi.xyz/api/questions",
    success:function(response){
        localStorage.setItem('avalaible', JSON.stringify(response))
    },
    error:function(){

    },
})

avalaible = JSON.parse(localStorage.getItem('avalaible'))

avalaible.sort(function (a, b) {
    return a.id - b.id;
  });

console.log(avalaible)


avalaible.forEach((rank, i) => {
    let parent = document.querySelector('#Questiontable')
    let actualquestion = document.createElement('question_listed')
    actualquestion.classList='question_listed'
    actualquestion.innerHTML =`
    <img src="${rank.imgUrl}" alt="">
            <h4>${rank.rep[0]}</h4>
            <h4>${rank.rep[1]}</h4>
            <h4>${rank.rep[2]}</h4>
            <h4>${rank.rep[3]}</h4>
            <div class="actions">
                Action
            </div>`
    parent.appendChild(actualquestion)
});