<?php
    if (!headers_sent()) {
        $test = false;
        $needValue; 
        foreach (getallheaders() as $name => $value) {
            if ($name == "Origin"){
                require "supportedOrigin.php";
                foreach($origin as $i =>$val){
                    if($value==$val)
                    {
                        global $test,$needValue;
                        $needValue = $value;
                        $test = true;
                    }
                }
            }
        }
        if($test){
            header("HTTP/1.1 200 OK");
            header('Access-Control-Allow-Origin:'.$needValue);
        }else{
            header("HTTP/1.1 401 Unauthorized");
            echo "No Origin applied";
            exit;
        }
    } else {
        header("HTTP/1.1 401 Unauthorized");
        exit;
    }
?>