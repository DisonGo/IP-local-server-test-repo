<?php
            $database = $_GET['base'];
            require "login.php";
            $sql = "show tables";
            $res = mysqli_query($link, $sql)or die(mysqli_error($link));
            $arr = [];
            while ($row = mysqli_fetch_all($res)) {
                global $arr;
                array_push($arr,$row);
                // $arr[$row['ID']] = (object)[
                //     "ID"=>$row['ID'],
                //     "Name"=>$row['Name'],
                //     "score"=>$row['Total_score']
                // ];
            }
            echo json_encode($arr);
?>