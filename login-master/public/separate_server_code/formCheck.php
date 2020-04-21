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
    $PosX = '0';
    $PosY = '0';
    $level = '1';
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
        $sqlID = "select * from registration where id = ?";

        //Check id
        if ($stmt = mysqli_prepare($conn, $sqlID)){
            mysqli_stmt_bind_param($stmt, "s", $id);
            if (mysqli_stmt_Execute($stmt)){
                mysqli_stmt_store_result($stmt);
                if (mysqli_stmt_num_rows($stmt) == 1){
                    //Check if id exists, if yes then update database
                    $sqlupdate= "update registration set groupName = ?, prototype = ?, category = ?, company = ?, width = ?, height = ?, sizeNweight = ?, powerpoints = ?, pedestal = ?, otherRequest = ?, PosX = ?, PosY = ?, level = ?, a_width = ?, a_height = ? where id = ?";
                    if($stmt = mysqli_prepare($conn, $sqlupdate)){
                        mysqli_stmt_bind_param($stmt, "ssssddsissddidds", $groupName, $prototype, $category, $company, $newWidth, $newHeight, $sizeNweight, $powerpoints, $pedestal, $otherRequest, $PosX, $PosY, $level, $a_width, $a_height, $id);
                        if(mysqli_stmt_execute($stmt)){
                            echo "Data updated successful...";
                        } else{
                            echo "Oops! Something went wrong. Please try again later.";
                        }
                        mysqli_stmt_close($stmt);
                    }
                } else {
                    //Check if id exists, if no then insert into database
                    $stmt = $conn->prepare("insert into registration(id, groupName, prototype, category, company, width, height, sizeNweight, powerpoints, pedestal, otherRequest, PosX, PosY, level, a_width, a_height)
                        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt->bind_param("sssssddsissddidd", $id, $groupName, $prototype, $category, $company, $newWidth, $newHeight, $sizeNweight, $powerpoints, $pedestal, $otherRequest, $PosX, $PosY, $level, $a_width, $a_height);
                    $stmt->execute();
                    echo "Registration successful...";
                    $stmt->close();
                    $conn->close();
                }
            } else{
                echo "Something went wrong, please try again later";
            }
        }
    }
?>