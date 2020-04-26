<?php
    header("Access-Control-Allow-Origin: *");

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');
    $email = $password = "";
    $email_err = $password_err = "";
    $bool = "false";

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $sql = "select password from admin_details where email = ?";
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
                            //Password is correct
                            $bool = "true";
                        } else{
                            //Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                        }
                    }
                } else{
                    //Display an error message if username doesn't exist
                    $email_err = "No account found with that email.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
            //Close statement
            mysqli_stmt_close($stmt);
        }
        //Close connection
        mysqli_close($conn);
    }
    echo $bool;
?>