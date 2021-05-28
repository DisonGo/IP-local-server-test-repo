<?php
    $database = "u1368634_mybase";
    require "login.php";
    function getScores(){
        global $link;
        $sql = "select * from Scores group by Total_score";
        $res = mysqli_query($link,$sql);
        $arr = [];
        while ($row = mysqli_fetch_array($res)) {
            global $arr;
            $arr[$row['ID']] = (object)[
                "ID"=>$row['ID'],
                "Name"=>$row['Name'],
                "score"=>$row['Total_score']
            ];
        }
        return json_encode($arr);
    };
    function setScore($dataArr){
        global $link;
        $name = $dataArr->Name;
        $score = $dataArr->score;
        $sql = "insert into Scores (Name,Total_score) Values ('$name','$score');";
        $res = mysqli_query($link,$sql);
        return mysqli_affected_rows($link)." rows was inserted";
    }
?> 