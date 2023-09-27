<?php

include 'config.php';


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function sql_StringExecute($myQuery)
{
    global $conn;

    $result =  $conn->query($myQuery);

    $row = mysqli_fetch_row($result);
    if (isset($row)) {
        return $row[0];
    } else {
        return "";
    }
}


function TDB($a)
{
    global $conn;
    return  mysqli_real_escape_string($conn, $a);
}
