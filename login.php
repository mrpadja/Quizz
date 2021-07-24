<?php

// CONNECTION
require_once'db_connect.php';

// SESSION
session_start();

// CREATE
if(isset($_POST['create'])){
    $error=[];
    $upName =$_POST["name"];
    $upEmail =$_POST["email"];
    $upPassword=$_POST["password"];

    if(empty($upName) or empty($upEmail) or empty($upPassword)){
        $error[]="You need to fill all the input!!";
    }else{
        if (!filter_var($upEmail, FILTER_VALIDATE_EMAIL)) {
            $error[] = "Invalid email format";
          }else{

            $sql = "SELECT email FROM users WHERE email='$upEmail' ";
            $result = mysqli_query($connect,$sql);
            if(mysqli_num_rows($result)>0){
                $error[] ="this email is already attached to an account";
            }else{

            
            $upPassword=md5($upPassword);
            $sql = "INSERT INTO users(username,email,password) VALUES('$upName', '$upEmail', '$upPassword')";
            $result = mysqli_query($connect,$sql);

            if($result){
                $success ="Account created!!";
            }
        }
          }


    }

}

// CONNECT

if (isset($_POST['btn_login'])){

    $erros = [];
    $email = mysqli_escape_string($connect, $_POST['email']);
    $password = mysqli_escape_string($connect, $_POST['password']);

    if (empty($email) or empty($password)){
        $erros []="<li>You need to fill the input!!<li>";
    }else{
        $sql = "SELECT email FROM users WHERE email='$email' ";
        $result = mysqli_query($connect,$sql);

        if(mysqli_num_rows($result)>0){
            $password = md5($password); 
            $sql="SELECT * FROM users WHERE email ='$email' AND password='$password'";
            $result = mysqli_query($connect, $sql);
                if(mysqli_num_rows($result) == 1){
                    $dados = mysqli_fetch_array($result);
                    mysqli_close($connect);
                    $_SESSION['logedIn']= true;
                    $_SESSION['id_user']= $dados['id'];
                    $_SESSION['username']= $dados['username'];
                    // var_dump($dados); exit;

                    header("Location: index.php");
                }else{
                    $erros[]="<li>Email and password missmatched<li>";
                }

        }else{
            $erros[]="<li>User not existed!<li>";
        }
    }

}


?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/login.css">
    <title>Login</title>
</head>
<body>
    <section class="log_holder" >
        <div class="log_cards">

            <?php if(!empty($success)){
                    echo "<h3 class='success'>$success</h3>" ;
                    
                } 
                if(!empty($error)){
                    foreach($error as $erro){
                        echo "<h3 class='error'>$erro</h3>";
                    }
                }
            
            ?>

            <!-- CONNECT TO ACOUNT -->
            <form action="<?php echo$_SERVER['PHP_SELF'];?>" method= "POST">
                <h3>Login</h3>
                
                <label for="email">Email:</label>
                <input type="email" name="email"><br>
                <label for="password">password:</label>
                <input type="password" name="password"><br>
                <button type="submit" name='btn_login'>login</button>

            </form>

            <!-- CREATE ACCOUNT FORM -->
            
            <form action="<?php echo$_SERVER['PHP_SELF'];?>" class="create" method="POST"> 
               
                <h3>Create Acount</h3>
                <label for="name">Nom:</label>
                <input type="text" name="name"><br>
                <label for="email">Email:</label>
                <input type="email" name="email"><br>
                <label for="password">password:</label>
                <input type="password" name="password"><br>
                <button type="submit" name="create">Create</button>

            </form>

        </div>

    </section>
    
</body>
</html>