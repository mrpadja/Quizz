
avalaible = [];
var ShowImage = document.querySelector("#Show");
var lives = document.querySelector(".lives")
let check = document.querySelector(".yes")
const AnswerContainer = document.querySelector(".answers")
let key = Math.floor(Math.random() * avalaible.length);
let over = document.querySelector('GameOver')
let Playerscore = document.querySelector('.scorenumber');
let GoodAnswer =  new Audio('./Assets/music/correct2.mp3');
let BadAnswer =  new Audio('./Assets/music/wrong2.mp3');
let sweep =  new Audio('./Assets/music/switchquestion.wav');
let nextSound =  new Audio('./Assets/music/next.mp3');
let GameOverSound =  new Audio('./Assets/music/gameOver2.wav');
let EndMessage = document.querySelector("#EndMessage");
GameOverScore = document.querySelector('.score_End')



timeout =''
timeout2=''
lives.innerHTML= 3;  
Playerscore.innerHTML = 0;
GameOverScore.innerHTML = 0;


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

function next(){
    let q = key;
    if(avalaible.length > 0){
    if (q > -1) {
        avalaible.splice(q, 1);
      }
    }
    return [avalaible]
}


function myFunction() {
    var copyText = document.getElementById("Link");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
  }
 




function gameOver(){
    let userData = localStorage.getItem('loginData')
    if (userData){
        userData = JSON.parse(userData)

        let data = {
            user_id:userData.user.id ,
            score: Number( Playerscore.innerHTML)
        }

        $.ajax({
            method: "POST",
            url: "https://quizzapi.xyz/api/scores",
            data,
            success:function(response){
                console.log(response)
            },
            error:function(){
    
            },
    
        })



        GameOverSound.play();
        document.getElementById("Over").style.display = "flex";
        if(userData.user){
            document.getElementById("player").innerHTML = userData.user.name;
        }
        
        GameOverScore.innerHTML = Playerscore.innerHTML ;

        if(GameOverScore.innerHTML <51){
            EndMessage.innerHTML =`<h3 class="first_Text" id="EndMessage">Désolé ${userData.user.name} Votre score est de: </h3>`
            GameOverScore.style.color = "red"
        }
        else if( GameOverScore.innerHTML >50 && GameOverScore.innerHTML<100 ){
            EndMessage.innerHTML =`<h3 class="first_Text" id="EndMessage">Pas mal ${userData.user.name} Votre score est de: </h3>`
            GameOverScore.style.color = "yellow"
        }
    }
   
    
   

}

 
function initBarcount(){
    let TimeLeft = document.querySelector("#TimeLeft")
    let Countdown = document.querySelector("#Countdown")
    
    startTimer = setInterval( function barCount(){
        if (TimeLeft.clientWidth < Countdown.clientWidth){
            TimeLeft.style.width = TimeLeft.clientWidth + 1 +"px";
        }
        else{
            TimeLeft.style.width = Countdown.clientWidth + "px";
            clearInterval(startTimer);
        }
    },20)
}




 function start() {
    initBarcount()
    // let time = document.createElement('div')
    // time.classList.add("progress-bar")
    // document.getElementById("gameCard").appendChild(time);
    
    
    if(typeof avalaible.length !== 'undefined' && avalaible.length > 0 && avalaible){
        ShowImage.src = avalaible[key].imgUrl;
        for(let i=1; i<=4; i++){
            document.getElementById(String(i)).innerText= avalaible[key].rep[i-1];
        }
        
    
        
       timeout = window.setTimeout(function(){
            if(Number(lives.innerHTML) > 0){

            //****** call the function Next to remove the current question
                next();  
                key = Math.floor(Math.random() * avalaible.length);
                lives.innerHTML--; 

            //****** Reset the timer bar
                TimeLeft.style.width = 0
                clearInterval(startTimer); 
            //****** Recall the Start function
            //  sweep.play();
            nextSound.play()
                start()
            }
        },10000);
        if(Number(lives.innerHTML) === 0){
            TimeLeft.style.width = Countdown.clientWidth + "px";
            gameOver()
            window.clearTimeout(timeout)
        }

        

    }else{
        gameOver()
    }
   };




   AnswerContainer.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
        return;
        }
        if (typeof avalaible[key] !== 'undefined' && event.target.innerText === avalaible[key].rep[avalaible[key].real]){
            document.getElementById(String((Number(avalaible[key].real)+1))).classList.add('correct');
            // check.style.display = "block"
                            let score = Number(Playerscore.innerHTML) + 10
                            GoodAnswer.play()
                            
                            // console.log(score)
                            Playerscore.innerHTML = score
                            

                            timeout2 = window.setTimeout(function(){
                                sweep.play();
                                document.getElementById(String((Number(avalaible[key].real)+1))).classList.remove('correct');
                                    next();
                                    key = Math.floor(Math.random() * avalaible.length);
                                   
                                    TimeLeft.style.width = 0
                                    
                                    clearInterval(startTimer); 
                                    start();

                            },1000);
                            
                            
        }else{
            event.target.classList.add('bad');
            BadAnswer.play();
            lives.innerHTML--; 
            timeout2 = window.setTimeout(function(){
                event.target.classList.remove('bad');
                    next();
                    key = Math.floor(Math.random() * avalaible.length);
    
                    TimeLeft.style.width = 0
                    clearInterval(startTimer);
                    start();

            },1000);
        }
    window.clearTimeout(timeout)
  })





  window.onload=  start() 