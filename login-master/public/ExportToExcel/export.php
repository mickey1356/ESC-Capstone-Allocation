<!--export to excel file-->
<?php
include 'DBController.php';
$db_handle = new DBController();
$productResult = $db_handle->runQuery("select * from registration");

if (isset($_POST["export"])) {
    $filename = "Export_excel.xls";
    header("Content-Type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=\"$filename\"");
    $isPrintHeader = false;
    if (! empty($productResult)) {
        foreach ($productResult as $row) {
            if (! $isPrintHeader) {
                echo implode("\t", array_keys($row)) . "\n";
                $isPrintHeader = true;
            }
            echo implode("\t", array_values($row)) . "\n";
        }
    }
    exit();
}
?>

<div id="table-container" class='table'>
    <link rel="stylesheet" href="style.css">
    <table id="tab">
        <thead class='thread'>
            <tr>
                <th>Group Name</th>
                <th>Category</th>
                <th>Company</th>
                <th>Prototype</th>
                <th>Width</th>
                <th>Breadth</th>
                <th>Height</th>
                <th>Size and Weight</th>
                <th>Powerpoints</th>
                <th>Pedestal</th>
                <th>Other Request</th>
                <!-- <th width="20%">Average Rating</th> -->
            </tr>
        </thead>
        <tbody>
 
            <?php
            $query = $db_handle->runQuery("select * from registration");
            if (! empty($productResult)) {
                foreach ($productResult as $key => $value) {
                    ?>
                 
                     <tr>
                <td><?php echo $productResult[$key]["groupName"]; ?></td>
                <td><?php echo $productResult[$key]["category"]; ?></td>
                <td><?php echo $productResult[$key]["company"]; ?></td>
                <td><?php echo $productResult[$key]["prototype"]; ?></td>
                <td><?php echo $productResult[$key]["width"]; ?></td>
                <td><?php echo $productResult[$key]["breadth"]; ?></td>
                <td><?php echo $productResult[$key]["height"]; ?></td>
                <td><?php echo $productResult[$key]["sizeNweight"]; ?></td>
                <td><?php echo $productResult[$key]["powerpoints"]; ?></td>
                <td><?php echo $productResult[$key]["pedestal"]; ?></td>
                <td><?php echo $productResult[$key]["otherRequest"]; ?></td>
               
            </tr>
             <?php
                }
            }
            ?>
      </tbody>
    </table>

    <div class="btn">
        <form action="" method="post">
            <button type="submit" id="btnExport" name='export'
                value="Export to Excel" class="btn btn-info">Export to
                excel</button>
        </form>
    </div>
</div>