<?php
            $database = $_GET['base'];
            $table = $_GET['table'];
            $key = $_GET['key'];
            $value = $_GET['value'];
            require "login.php";
            $sql = "select * from `".$table."` where `".$key."`='".$value."'";
            $res = mysqli_query($link, $sql)or die(mysqli_error($link));
            $row = mysqli_fetch_all($res);
            echo json_encode($row);
?>