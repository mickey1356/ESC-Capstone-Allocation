<?php

    header("Access-Control-Allow-Origin: *");
    
    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $groupName = $studentID = $email = $password = "";
        $sqlgroupName = "select * from user_details where groupName = ?";
        $sqlstudentID = "select * from user_details where studentID = ?";
        $sqlemail = "select * from user_details where email = ?";
        $sqlpassword = "select * from user_details where password = ?";

        //Check group name
        if ($stmt = mysqli_prepare($conn, $sqlgroupName)){
            mysqli_stmt_bind_param($stmt, "s", $param_groupName);
            $param_groupName = trim($_POST["groupName"]);
            if (mysqli_stmt_Execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1){
                    $groupName_err = "Someone from your group is already registered";
                } else {
                    $groupName = trim($_POST["groupName"]);
                }
            } else{
                echo "Something went wrong, please try again later";
            }
            mysqli_stmt_close($stmt);
        }

        //Check studentID
        if ($stmt = mysqli_prepare($conn, $sqlstudentID)){
            mysqli_stmt_bind_param($stmt, "s", $param_studentID);
            $param_studentID = trim($_POST["studentID"]);
            if (mysqli_stmt_Execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1){
                    $studentID_err = "Your student ID is already registered";
                } else {
                    $studentID = trim($_POST["studentID"]);
                }
            } else{
                echo "Something went wrong, please try again later";
            }
            mysqli_stmt_close($stmt);
        }

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
            
        //Insert group name, studentID, email and password into database
        if (empty($studentID_err) && empty($email_err) && empty($groupName_err)){
            $sql = "insert into user_details(groupName, studentID, email, password) values(?, ?, ?, ?)";
            if ($stmt = mysqli_prepare($conn, $sql)){
                mysqli_stmt_bind_param($stmt, "ssss", $param_groupName, $param_studentID, $param_email, $param_password);
                $param_groupName = $groupName;
                $param_studentID = $studentID;
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