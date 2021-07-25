
var ShowImage = document.querySelector("#Show");
var lives = document.querySelector(".lives")
let check = document.querySelector(".yes")
let avalaible = array_();
const AnswerContainer = document.querySelector(".answers")
let key = Math.floor(Math.random() * avalaible.length);
let over = document.querySelector('GameOver')
let Playerscore = document.querySelector('.scorenumber');
let GoodAnswer =  new Audio('./Assets/music/correct.mp3');
let BadAnswer =  new Audio('./Assets/music/wrong.mp3');
let GameOverSound =  new Audio('./Assets/music/gameOver2.wav');
let EndMessage = document.querySelector("#EndMessage");
GameOverScore = document.querySelector('.score_End')



timeout =''
timeout2=''
lives.innerHTML= 3;  
Playerscore.innerHTML = 0;
GameOverScore.innerHTML = 0;

user = window.localStorage.getItem('User');






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
    let user =document.querySelector('#user').value
    GameOverSound.play();
    document.getElementById("Over").style.display = "flex";
    if(user){
        document.getElementById("player").innerHTML = user;
    }
    
    GameOverScore.innerHTML = Playerscore.innerHTML ;
    
    if(GameOverScore.innerHTML <51){
        EndMessage.innerHTML =`<h3 class="first_Text" id="EndMessage">Désolé ${user} Votre score est de: </h3>`
        GameOverScore.style.color = "red"
    }
    else if( GameOverScore.innerHTML >50 && GameOverScore.innerHTML<100 ){
        EndMessage.innerHTML =`<h3 class="first_Text" id="EndMessage">Pas mal ${user} Votre score est de: </h3>`
        GameOverScore.style.color = "yellow"
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
            document.getElementById(String((avalaible[key].real+1))).classList.add('correct');
            // check.style.display = "block"
                            let score = Number(Playerscore.innerHTML) + 10
                            GoodAnswer.play()
                            // console.log(score)
                            Playerscore.innerHTML = score
                            

                            timeout2 = window.setTimeout(function(){
                                document.getElementById(String((avalaible[key].real+1))).classList.remove('correct');
                                    next();
                                    key = Math.floor(Math.random() * avalaible.length);
                                    // console.log('vraaaaaaaaaaaaaa')
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
                    console.log('vraaaaaaaaaaaaaa')
                    TimeLeft.style.width = 0
                    clearInterval(startTimer);
                    start();

            },1000);
        }
    window.clearTimeout(timeout)
  })





  window.onload= start()