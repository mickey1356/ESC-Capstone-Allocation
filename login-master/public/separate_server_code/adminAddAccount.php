<?php
    header("Access-Control-Allow-Origin: *");

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $email = $password = "";
        $sqlemail = "select * from admin_details where email = ?";
        $sqlpassword = "select * from admin_details where password = ?";

        //Check email
        if ($stmt = mysqli_prepare($conn, $sqlemail)){
            mysqli_stmt_bind_param($stmt, "s", $param_email);
            $param_email = trim($_POST["email"]);
            if (mysqli_stmt_Execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1){
                    $email_err = "This email is already registered";
                } else {
                    $email = trim($_POST["email"]);
                }
            } else{
                echo "Something went wrong, please try again later";
            }
            mysqli_stmt_close($stmt);
        }

        //Check password
        if ($stmt = mysqli_prepare($conn, $sqlpassword)){
            mysqli_stmt_bind_param($stmt, "s", $param_password);
            $param_password = trim($_POST["password"]);
            if (mysqli_stmt_Execute($stmt)){
                mysqli_stmt_store_result($stmt);
                $password = trim($_POST["password"]);
            } else{
                echo "Something went wrong, please try again later";
            }
            mysqli_stmt_close($stmt);
        }
            
        //Insert email and password into database
        if (empty($email_err)){
            $sql = "insert into admin_details(email, password) values(?, ?)";
            if ($stmt = mysqli_prepare($conn, $sql)){
                mysqli_stmt_bind_param($stmt, "ss", $param_email, $param_password);
                $param_email = $email;
                $param_password = $password;
                mysqli_stmt_Execute($stmt);
                echo "registration successful...";
                mysqli_stmt_close($stmt);
            }
            mysqli_close($conn);
        }
    }
?>