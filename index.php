<?php

require_once'db_connect.php';

// SESSION
session_start();

// VERIFICATION

if (!isset($_SESSION['logedIn']) && $_SESSION['logedIn'] != true){
    header('Location: index.php');
}


if(isset($_POST['start'])){
    if(isset($_SESSION['logedIn']) && $_SESSION['logedIn']){
        header('Location: gameplay.php');
    }else{
        header('Location: login.php');
    }
}


?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/App.css">
    <title>Quizz</title>
</head>
<body>
    <section class="spaceGame">
        <div class="GameCard">

            <div class="HeadButtons">
                <button class="selected" id="Home" onclick="OpenHome()">Jouer</button>
                <button class="nselected" id="RankBtn" onclick="OpenRank()">meilleurs scores</button>
            </div>


            <div class="accueil" id="HomeSection" >
            <img class="logo" src="/Assets/images/logo.png" alt="">

            <form action="<?php echo$_SERVER['PHP_SELF'];?>" method= "POST">
                 <!-- <h2 class="userInfo">Ajouter un nom pour Commencer !!!</h2>
                 <input class="userName" id="UserName" type="text" placeholder="Ex: Mr Padja" required> <br> -->
                 <button class="start_game" type='submit' name='start'>Commencer</button>
            </form> 
            </div>
            
            
            <div class="rank" id="RankSection">

                <div class="bestRank">
                    <div class="circle"><span class="rankClass">1</span> </div>
                    <h3 class="rank_Name">Mr padja</h3>
                    <h3>1590</h3>
                </div>

                <div class="bestRank">
                    <div class="circle"><span class="rankClass">2</span> </div>
                    <h3 class="rank_Name">Mr padja</h3>
                    <h3>1390</h3>
                </div>


            </div>
        </div>
    
    </section>

    <script src="/JS/home.js"></script>
</body>
</html>