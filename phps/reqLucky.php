<?php
    $database = "u1368634_mybase";
    require ("login.php") ;
    $sql = "select (lucky_number) from users";
    $res = mysqli_query($link,$sql);
    function printLucky(){
        global $res;
        while ($row = mysqli_fetch_array($res)) {
            print("lucky_number:" . $row['lucky_number']."\n");
        }
    }  
    printLucky()
?>