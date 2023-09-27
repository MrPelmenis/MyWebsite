<?php


include 'config.php';
include 'sql.php';

/////////////////
/*
$servername;
$username;
$password;
*/
////////////////

cors();


echo sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . "normundsmalnacs@gmail.com" . "'");


/*$header = $_SERVER['HTTP_X_TOKEN'];
if (!$header) {
    return null;
}
return $header;
*/


if (isset($_GET["myName"])) {
    //$arr = array('vards' => "nomrduns");
    $headers = getallheaders();
    $jwt = parseJwt($_SERVER["HTTP_JWT"]);
    $email = ($jwt->email);;

    //echo json_encode($jwt);

    echo json_encode(array("nickname" => sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'")));
}



if (isset($_GET["request"])) {
    switch ($_GET["request"]) {
        case 'login': {
                echo ("Login recieved, nick: " . htmlspecialchars($_GET["nick"])  . " pass: " . htmlspecialchars($_GET["pass"]));
                break;
            }
    }
}


function cors()
{

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}



function parseJwt($token)
{
    $base64Url = explode('.', $token)[1];
    $base64 = str_replace('-', '+', str_replace('_', '/', $base64Url));
    $jsonPayload = json_decode(base64_decode($base64));

    return $jsonPayload;
}
