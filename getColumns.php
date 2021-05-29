<?php
            $database = $_GET['base'];
            $table = $_GET['table'];
            require "login.php";
            $sql = "show columns in `".$table."`";
            $res = mysqli_query($link, $sql)or die(mysqli_error($link));
            $row = mysqli_fetch_all($res);
            echo json_encode($row);
?>