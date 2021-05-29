<?php
            $database = $_GET['base'];
            require "login.php";
            $sql = "show tables";
            $res = mysqli_query($link, $sql)or die(mysqli_error($link));
            $row = mysqli_fetch_all($res);
            echo json_encode($row);
?>