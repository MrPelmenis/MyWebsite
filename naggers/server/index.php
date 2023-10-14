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


//echo sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . "normundsmalnacs@gmail.com" . "'");


/*$header = $_SERVER['HTTP_X_TOKEN'];
if (!$header) {
    return null;
}
return $header;
*/


if (isset($_GET["requestAnonymus"])) {
    switch ($_GET["requestAnonymus"]) {
        case "getRecentPosts": {
            getRecentPosts();
        }
        
    }
}

function getRecentPosts(){
    $result = sql_MultipleRow("SELECT * FROM Posts ORDER BY id DESC LIMIT  ". 10 . ";");
    echo(json_encode($result));
}


if (isset($_GET["request"])) {
    //works if user is or isnt logged
    switch ($_GET["request"]) {
        case "getRecentPosts": {
            getRecentPosts();
        }
    }

    

    $jwt = parseJwt($_SERVER["HTTP_JWT"]);
    if ($jwt) {
        //user ir logged in  
        switch ($_GET["request"]) {
            case "uploadPost": {
                $headers = getallheaders();
                $email = ($jwt->email);
                $gottenNickname = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");

                $date = date('Y-m-d H:i:s');  

                $title = htmlspecialchars($_POST["title"]);
                $body = htmlspecialchars($_POST["body"]);

                $accountExists = ($gottenNickname != "" ? true : false);

                if($accountExists){
                    sql_Execute("INSERT INTO Posts (TITLE, BODY, AuthorName, AuthorEmail, LikeAmount, DATE_TIME)
                     VALUES ('" . TDB($title) . "', '" . TDB($body) . "', '" . TDB($gottenNickname) .
                     "', '" . TDB($email) . "', 0, '" . TDB($date) . "'); ");
                     echo (json_encode(array("answer" => true)));
                }
                

                
                break;
            }

            case "getUsersNickname": {
                    $headers = getallheaders();
                    $email = ($jwt->email);
                    $gottenNickname = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");
                    $accountExists = ($gottenNickname != "" ? true : false);
                    echo (json_encode(array("nickname" => $gottenNickname, "accountExists" => $accountExists)));
                    break;
                }

            case 'nickNameUpdate': {
                    $nickname = htmlspecialchars($_POST["nickname"]);
                    $email = ($jwt->email);
                    $checkName = sql_StringExecute("SELECT 1 FROM Users WHERE Nickname='" . TDB($nickname) . "' AND Email <> '" . TDB($email) . "'");

                    $accountExistsCheck = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");
                    if ($checkName == "") {
                        if ($accountExistsCheck == "") {
                            sql_Execute("INSERT INTO Users (Email, Nickname) VALUES ('" . TDB($email) . "', '" . TDB($nickname) . "')");
                            echo (json_encode(array("success" => true)));
                        } else {
                            sql_Execute("UPDATE Users SET Nickname = '" . TDB($nickname) . "' WHERE Email = '" . TDB($email) . "'");
                            echo (json_encode(array("success" => false)));
                        }
                    } else {
                        echo (json_encode(array("success" => false)));
                    }
                    break;
                }
        }
    }else{
        //userIsnt logged in
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
