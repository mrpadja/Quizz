<?php

// SESSION
session_start();
$Username = $_SESSION['username'];



if (!isset($_SESSION['logedIn']) && $_SESSION['logedIn'] != true){
    header('Location: index.php');
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/gameplay.css">
    <title>gameplay</title>
</head>
<body>


    <section class="spaceGame">

        <div class="GamePlayCard" id="gameCard">
            <div class="game_Info">
                <a href="index.php"><h3 class="quitter">Quitter X</h3></a>
                <h3 class="score">Score: <span class="scorenumber">90</span></h3>
                <h3 class="score"> <span class="lives">3</span> <span class="heart">&#10084;</span></h3>

            </div>

            <div class="img_Holder">
                <img id="Show" src="https://ak.picdn.net/shutterstock/videos/1039407446/thumb/1.jpg" alt="">
            </div>

            <h2 class="question">QUI EST-CE ?</h2>

            <div class="answers">
                <button class="btn" id="1">Rep1 <span class="yes" id="yes">&#x2713;</span></button>
                <button class="btn" id="2">Rep2 <span id="yes">&#x2713;</span></button>
                <button class="btn" id="3">Rep3 <span class="yes" id="yes" >&#x2713;</span></button>
                <button class="btn" id="4">Rep4 <span class="yes" id="yes">&#x2713;</span></button>

            </div>

            <div class="countdown"  id="Countdown">
                <div class="timeLeft" id="TimeLeft"> </div>
            </div>
         
        </div>
    
    </section>

    <section class="GameOver" id="Over">
        <div class="last_Message">
            <h3 class="first_Text" id="EndMessage">Félicitations <span id="player">Damas</span>  Votre score est de: </h3>
            <h2 class="score_End">120</h2>
            <h3>partager QUIZ avec des amis </h3>
            <div class="share">
                <input class="link" type="text" value="http://www.quizpadja.com/" id="Link">
                <img onclick="myFunction()" src="/Assets/images/copy 1.png" alt="" >
                <a href=
                "whatsapp://send?text=GFG Example for whatsapp sharing"
                        data-action="share/whatsapp/share"
                        target="_blank">
                        <img src="./Assets/images/WhatsApp.svg.png" alt="">
                </a>
            </div>

            <button class="backHome" onclick="location.href ='index.php'">Accueil</button>
            <button class="replay" onclick="location.href = 'gameplay.php'">Réjouer</button>
            

        </div>

    </section>

    <input type="hidden" id='user' value="<?= $Username?>">
    
    <script src="./JS/questions.js"></script>
    <script src="./JS/gameplay.js"></script>
    <!-- <script src="./JS/home.js"></script> -->

</body>
</html>