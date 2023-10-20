<?php

include 'config.php';


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function sql_StringExecute($myQuery)
{
    global $conn;

    $result =  $conn->query(($myQuery));

    $row = mysqli_fetch_row($result);
    if (isset($row)) {
        return $row[0];
    } else {
        return "";
    }
}


function sql_Execute_Transaction($querryList){
    global $conn;
    $conn->begin_Transaction();
    $res = $querryList;
    try{
        foreach ($querryList as $query) {
            $conn->query(($query));
        }
        $conn->commit();
    }catch (\Throwable $e) {
        $conn->rollback();
    }    
    return $res;
}

function sql_Execute($myQuery)
{
    global $conn;
    $result = $conn->query(($myQuery));
}

function sql_MultipleRow($myQuery){
    global $conn;
    $result = $conn->query(($myQuery));
    return $result->fetch_all(MYSQLI_ASSOC);
}

function TDB($a)
{
    global $conn;
    return  mysqli_real_escape_string($conn, $a);
}
