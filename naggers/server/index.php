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
            getRecentPosts(false);
            break;
        }
        case "getCommentsForPost":{
            $postID = htmlspecialchars($_POST["postID"]);
            $postIDint = intval( $postID );
            $sqlquer = "SELECT * FROM Comments WHERE PostID = ". TDB($postIDint)."
            ORDER BY LikeAmount DESC;";
            echo(json_encode(sql_MultipleRow($sqlquer)));
            break;
        }
    }
}

function getRecentPosts($isUserLoggedIn){
    $result = "";
    if($isUserLoggedIn){
        $clientName = htmlspecialchars($_POST["clientName"]);
        $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". $clientName ."';");
        $sqlquer = "
                SELECT P.*,
                    CASE
                        WHEN L.PostID IS null THEN 0
                        ELSE 1
                    END AS isLikedByCurrentUser
                FROM Posts P 
                LEFT OUTER JOIN Likes L ON
                L.PostID = P.ID AND L.UserID = ".$userID." 
                ORDER BY P.ID DESC LIMIT  ". 10 . " ;";
    }else{
        $sqlquer = "
                SELECT *, 0 as isLikedByCurrentUser
                FROM Posts
                ORDER BY ID DESC LIMIT  ". 10 . ";";
    }
    

    echo(json_encode(sql_MultipleRow($sqlquer)));
}


if (isset($_GET["request"])) {
    $jwt = parseJwt($_SERVER["HTTP_JWT"]);
    if ($jwt) {
        //user ir logged in  
        switch ($_GET["request"]) {


            case "uploadComment": {
                $headers = getallheaders();
                $email = ($jwt->email);
                $gottenNickname = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");

                $date = date('Y-m-d H:i:s');  

                $text = htmlspecialchars($_POST["text"]);
                $postID = htmlspecialchars($_POST["postID"]);

                $accountExists = ($gottenNickname != "" ? true : false);
                
                $quer = "INSERT INTO Comments (AuthorName, Body, LikeAmount, Date_Time, PostID)
                VALUES ('" . TDB($gottenNickname) . "','" . TDB($text) . "', 0, '" . TDB($date)."', ".TDB($postID).");";


                if($accountExists){
                    //echo($quer);
                    sql_Execute($quer);
                    echo (json_encode(array("answer" => true)));
                }
                break;
            }
            
            case "getRecentPosts": {
                getRecentPosts(true);
                break;
            }

            case "postDislike":{
                $postID = htmlspecialchars($_POST["postID"]);
                $clientName = htmlspecialchars($_POST["clientName"]);

                $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". $clientName ."';");

                //echo("SELECT 1 FROM likes WHERE userid = '". $userID ."' AND postid = '". $postID .";");
                $hasUserAllreadyLikedThePost = sql_StringExecute("SELECT 1 FROM Likes WHERE userid = '". $userID ."' AND postid = ". $postID .";");    

                if($hasUserAllreadyLikedThePost == 1){
                    $res = sql_Execute_Transaction([
                        "DELETE FROM Likes WHERE PostID=".$postID." AND UserID = ".$userID.";",
                        "UPDATE Posts SET LikeAmount = LikeAmount - 1 WHERE ID = ". TDB($postID) .";"]);
                    echo (json_encode(array("statuss" => "disliked")));
                }else{
                    echo(json_encode(array("statuss" => "user has not liked the post (manuprat kkas nestrada)")));
                    break; 
                }

                break;
            }

            case "postLike": {
                $postID = htmlspecialchars($_POST["postID"]);
                $clientName = htmlspecialchars($_POST["clientName"]);

                $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". $clientName ."';");

                $hasUserAllreadyLikedThePost = sql_StringExecute("SELECT 1 FROM Likes WHERE userid = '". $userID ."' AND postid = '". $postID ."'; ");

                if($hasUserAllreadyLikedThePost != 1){
                    $res = sql_Execute_Transaction([
                    "INSERT INTO Likes (`postid`, `userid`) VALUES ('". TDB($postID) ."','".TDB($userID) ."' );",
                    "UPDATE Posts SET LikeAmount = LikeAmount + 1 WHERE ID = ". TDB($postID) ." ;" ]);
                    echo (json_encode(array("statuss" => "liked")));
                }else{
                    echo(json_encode(array("statuss" => "userAllreadyLikedThePost")));
                    break; 
                }

                break;
            }



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
