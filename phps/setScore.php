<?php
    require "testAccess.php";
    require "scoreUpdate.php";
    class newScore{
        public string $Name;
        public int $score;
        function __construct(string $name,int $scr){
            $this->Name = $name;
            $this->score = $scr;
        }
    }
    $data = new newScore($_POST["Name"],$_POST["score"]);
    echo setScore($data);
?>