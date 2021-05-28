<?php
    $database = "u1368634_valves_of_pipeline_valv";
    require "login.php";
    $sql = "SHOW Columns IN `Клапаны (вентили)`;";
    $res = mysqli_query($link,$sql);
    echo json_encode($arr);
?>