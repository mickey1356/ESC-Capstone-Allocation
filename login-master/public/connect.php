<?php
    $groupName = $_POST['groupName']; // sending data using post to php
    $prototype = $_POST['prototype'];
    $showcaseSpace = $_POST['showcaseSpace'];
    $sizeNweight = $_POST['sizeNweight'];
    $powerpoints = $_POST['powerpoints'];
    $pedestal = $_POST['pedestal'];
    $otherRequest = $_POST['otherRequest'];

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');
    if($conn->connect_error){
        die('Connection Failed: '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into registration(groupName, prototype, showcaseSpace, sizeNweight, powerpoints, pedestal, otherRequest)
            values(?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssiss", $groupName, $prototype, $showcaseSpace, $sizeNweight, $powerpoints, $pedestal, $otherRequest);
        $stmt->execute();
        echo "registration successful...";
        $stmt->close();
        $conn->close();
    }
?>