<?php
    $groupName = $_POST['groupName']; // sending data using post to php
    $studentID = $_POST['studentID'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');
    if($conn->connect_error){
        die('Connection Failed: '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into user_details(groupName, studentID, email, password)
            values(?, ?, ?, ?)");
        $stmt->bind_param("ssss", $groupName, $studentID, $email, $password);
        $stmt->execute();
        echo "signup successful...";
        $stmt->close();
        $conn->close();
    }
?>