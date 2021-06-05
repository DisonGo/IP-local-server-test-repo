<?php
            $database = $_GET['base'];
            $table = $_GET['table'];
            require "login.php";
            $sql = "SELECT 
            TABLE_NAME,COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
          FROM
            INFORMATION_SCHEMA.KEY_COLUMN_USAGE
          WHERE
            TABLE_NAME = '".$table."' and
            REFERENCED_TABLE_NAME != 'null'";
            $res = mysqli_query($link, $sql)or die(mysqli_error($link));
            $row = mysqli_fetch_all($res);
            echo json_encode($row);
?>