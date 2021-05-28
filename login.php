<?php
    $host = '31.31.198.106';
    $username ='u1368634_root';
    $pass = 'CReperok1';
    $link = mysqli_connect($host,$username ,$pass ,$database );
    // $link->set_charset("utf8");
    mysqli_query($link,"set names utf8");
?>