<?php
    //Sending data using post to php
    $id = $_POST['id'];
    $groupName = $_POST['groupName']; 
    $prototype = $_POST['prototype'];
    $category = $_POST['category'];
    $company = $_POST['company'];
    $width = $_POST['width'];
    $height = $_POST['height'];
    $sizeNweight = $_POST['sizeNweight'];
    $powerpoints = $_POST['powerpoints'];
    $pedestal = $_POST['pedestal'];
    $otherRequest = $_POST['otherRequest'];
    $PosX = '';
    $PosY = '';
    $level = '';
    $a_width = '0';
    $a_height = '0';

    //Rounding up values
    function roundUp($val){
        return ceil($val * 2) / 2;
    }
    $newWidth = roundUp($width);
    $newHeight = roundUp($height);

    //Database connection
    $conn = new mysqli('localhost', 'root', 'password', 'capstone_form');
    if($conn->connect_error){
        die('Connection Failed: '.$conn->connect_error);
    }else{
        $stmt = $conn->prepare("insert into registration(id, groupName, prototype, category, company, width, height, sizeNweight, powerpoints, pedestal, otherRequest, PosX, PosY, level, a_width, a_height)
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssssissiiiii", $id, $groupName, $prototype, $category, $company, $newWidth, $newHeight, $sizeNweight, $powerpoints, $pedestal, $otherRequest, $PosX, $PosY, $level, $a_width, $a_height);
        $stmt->execute();
        echo "registration successful...";
        $stmt->close();
        $conn->close();
    }
?>