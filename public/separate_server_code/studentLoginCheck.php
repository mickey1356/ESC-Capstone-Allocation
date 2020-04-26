<?php
    header("Access-Control-Allow-Origin: *");

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');
    $email = $password = "";
    $email_err = $password_err = "";
    $bool = "false";

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $sql = "select password from user_details where email = ?";
        if($stmt = mysqli_prepare($conn, $sql)){
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            $param_email = trim($_POST["email"]);
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);
                //Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    mysqli_stmt_bind_result($stmt, $updatedPassword);
                    if(mysqli_stmt_fetch($stmt)){
                        $password = trim($_POST["password"]);
                        if($password == $updatedPassword){
                            $bool = "true";
                        } else{
                            echo "The password you entered was not valid.";
                        }
                    }
                } else{
                    echo "No account found with that email.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
            mysqli_stmt_close($stmt);
        }
        mysqli_close($conn);
    }
    echo $bool;
?>