<?php

    //Link to another page
    if (isset($_POST['submitform'])){   
        ?>
    <script type="text/javascript">
        window.location = "http://localhost:3000/form";
    </script>      
        <?php
        }

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');

    $new_password = $confirm_password = "";
    $new_password_err = $confirm_password_err = "";
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
    
        //Check new password
        if(empty(trim($_POST["new_password"]))){
            $new_password_err = "Please enter the new password.";
        } else{
            $new_password = trim($_POST["new_password"]);
        }
        
        //Check confirm password
        if(empty(trim($_POST["confirm_password"]))){
            $confirm_password_err = "Please confirm the password.";
        } else{
            $confirm_password = trim($_POST["confirm_password"]);
            if(empty($new_password_err) && ($new_password != $confirm_password)){
                $confirm_password_err = "Password did not match.";
            }
        }
            
        //Update password in database
        if(empty($new_password_err) && empty($confirm_password_err)){
            $sql = "update user_details set password = ? where studentID = ?";
            if($stmt = mysqli_prepare($conn, $sql)){
                mysqli_stmt_bind_param($stmt, "si", $param_password, $param_studentID);
                $param_password = trim($_POST["new_password"]);
                $param_studentID = trim($_POST["studentID"]);
                if(mysqli_stmt_execute($stmt)){
                    echo "Password updated successfully";
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
                mysqli_stmt_close($stmt);
            }
        }
        mysqli_close($conn);
    }
?>