<?php

include 'config.php';
include 'sql.php';



cors();

if (isset($_GET["requestAnonymus"])) {
    switch ($_GET["requestAnonymus"]) {
        case "getRecentPosts": {
            getRecentPosts(false, ""); //gives "" because it can't be filled
            break;
        }
        case "getCommentsForPost":{
            getCommentsForPost(false);
            break;
        }

        case "getProfilePictureForUser":{

            $clientName =$_GET["clientName"];
            $imgSrc = sql_StringExecute("SELECT ProfilePicture
            from Users
            WHERE Nickname = '" . TDB($clientName) . "';");
            header('Content-type:image/png');
            if(is_null($imgSrc))
            {
                $imgSrc = file_get_contents('./DefaultProfilePic.png');
            }
            echo($imgSrc);
            break;
        }
    }
}

function getRecentPosts($isUserLoggedIn, $postID){
    $result = "";
    if($isUserLoggedIn){
        $clientName = htmlspecialchars($_POST["clientName"]);
        $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". TDB($clientName) ."';");
        $sqlquer = "
                SELECT P.*,
                    CASE
                        WHEN L.PostID IS null THEN 0
                        ELSE 1
                    END AS isLikedByCurrentUser
                FROM Posts P 
                LEFT OUTER JOIN Likes L ON
                L.PostID = P.ID AND L.UserID = ".$userID."
                
                ". ($postID == ""?"":"WHERE P.ID=" . $postID. "") ."
                
                ORDER BY P.DATE_TIME DESC;";
    }else{
        $sqlquer = "
                SELECT *, 0 as isLikedByCurrentUser
                FROM Posts
                ". ($postID == ""?"":"WHERE Posts.ID=" .$postID. "") ."

                ORDER BY Posts.DATE_TIME DESC;";
    }
    

    echo(json_encode(sql_MultipleRow($sqlquer)));
}


function getCommentsForPost($isUserLoggedIn){
    $postID = htmlspecialchars($_POST["postID"]);
    $clientName = htmlspecialchars($_POST["clientName"]);
    $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". $clientName ."';");

    if($isUserLoggedIn){
        //userLoggedIn.........
        $sqlquer = "
            SELECT C.*,
                CASE
                    WHEN CL.ID IS NOT NULL THEN 1
                    ELSE 0
                END AS isLikedByCurrentUser
            FROM Comments C 
            LEFT OUTER JOIN CommentLikes CL ON C.ID = CL.CommentID AND CL.UserID = " . TDB($userID) . "
            WHERE C.PostID = " . TDB($postID) . "
            ORDER BY C.LikeAmount DESC;";
        //echo($sqlquer);
    }else{
        //userNotloggedInN
        $sqlquer = "
                SELECT *, 0 as isLikedByCurrentUser
                FROM Comments
                ORDER BY LikeAmount DESC;";
    }
    //echo($sqlquer);
    echo(json_encode(sql_MultipleRow($sqlquer)));
}



if (isset($_GET["request"])) {
    $jwt = json_decode($_SERVER["HTTP_JWT"]);
    $idToken = ($jwt->id_token);

    $istJWTValid = false;


    try{
        $istJWTValid = verifyJWT($idToken);
    }
    catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }

    $istJWTValid = true;

    
    if ($istJWTValid) {
        //user ir logged in  
        switch ($_GET["request"]) {

            case "deleteComment":{
                $commentID = $_POST["commentID"];

                $sqlComments = "DELETE FROM Comments WHERE ID=". TDB($commentID) .";";
                $sqlLike = "DELETE FROM CommentLikes WHERE CommentID=". TDB($commentID) .";";


                sql_Execute_Transaction([$sqlComments, $sqlLike]);

                echo (json_encode(array("deleted" => true)));
                break;
            }


            case "updateComment":{
                $commentID = $_POST["commentID"];
                $body = $_POST["body"];

                $sql = "UPDATE Comments SET Body = '" . TDB($body) . "' WHERE ID = " . TDB($commentID) . ";";
                //echo($sql);

                sql_Execute($sql);

                echo (json_encode(array("updated" => true)));
                break;
            }

            case "updatePost":{
                $postID = $_POST["postID"];
                $title = $_POST["title"];
                $body = $_POST["body"];

                $sql = "UPDATE Posts SET BODY = '" . TDB($body) . "', TITLE = '" . TDB($title) . "' WHERE ID = " . TDB($postID) . ";";
                //echo($sql);

                sql_Execute($sql);

                echo (json_encode(array("updated" => true)));
                break;
            }

            case "deletePost":{
                $postID = $_POST["postID"];

                $sqlPosts = "DELETE FROM Posts WHERE ID=". TDB($postID) .";";
                $sqlComments = "DELETE FROM Comments WHERE PostID=". TDB($postID) .";";
                $sqlLike = "DELETE FROM Likes WHERE PostID=". TDB($postID) .";";                
                sql_Execute_Transaction([$sqlComments, $sqlPosts, $sqlLike]);

                echo (json_encode(array("deleted" => true)));
                break;
            }

            case "profileImgUpdate":{
                $clientName = htmlspecialchars($_POST["clientName"]);
                $imgSrc = $_POST["imgSrc"];
                $imgSrc = explode (",", $imgSrc)[1];  
                //Removes the "png;base64, part from html..."

                $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". TDB($clientName) ."';");
                $imgSrc = base64_decode($imgSrc);            
                

                $imgSrc = addslashes($imgSrc);
                $sql = "UPDATE Users SET ProfilePicture = '".$imgSrc."' WHERE ID = ". TDB($userID) ." ;";
                sql_Execute($sql);
                echo (json_encode(array("answer" => true)));
                break;
            }

            
            case "getCommentsForPost":{
                getCommentsForPost(true);
                break;
            }

            case "commentLike": {
                $commentID = htmlspecialchars($_POST["commentID"]);
                $clientName = htmlspecialchars($_POST["clientName"]);

                $userID = sql_StringExecute("SELECT ID FROM Users WHERE `nickname` = '". TDB($clientName) ."';");


                $hasUserAllreadyLikedTheCommentQuery = "SELECT 1 FROM CommentLikes WHERE userid = '". TDB($userID) ."' AND commentId = '". TDB($commentID) ."'; ";
                $hasUserAllreadyLikedTheComment = sql_StringExecute($hasUserAllreadyLikedTheCommentQuery);
                
                $likedOrDisliked = "";
                $currentLikeAmount = "";

                if($hasUserAllreadyLikedTheComment != 1){
                    $res = sql_Execute_Transaction([
                    "INSERT INTO CommentLikes (`commentid`, `userid`) VALUES ('". TDB($commentID) ."','".TDB($userID) ."' );",
                    "UPDATE Comments SET LikeAmount = LikeAmount + 1 WHERE ID = ". TDB($commentID) ." ;" ]);
                    $likedOrDisliked = "liked"; 

                }else{
                    $res = sql_Execute_Transaction([
                        "DELETE FROM CommentLikes WHERE CommentID=".TDB($commentID)." AND UserID = ".TDB($userID).";",
                        "UPDATE Comments SET LikeAmount = LikeAmount - 1 WHERE ID = ". TDB($commentID) .";"]);
                    $likedOrDisliked = "disliked";     
                }
                $currentLikeAmount =  sql_StringExecute("SELECT LikeAmount FROM Comments WHERE ID='" . TDB($commentID) . "'");
                echo(json_encode(array("statuss" => $likedOrDisliked, "currentLikeAmount" => $currentLikeAmount)));

                break;
            }

            case "uploadComment": {
                $headers = getallheaders();
                $id_token = parseBase64($jwt->id_token);
                    
                $email = ($id_token->email);
                $gottenNickname = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");

                $date = gmdate('Y-m-d H:i:s');  

                $text = ($_POST["text"]);
                $postID = htmlspecialchars($_POST["postID"]);

                $accountExists = ($gottenNickname != "" ? true : false);
                
                $quer = "INSERT INTO Comments (AuthorName, Body, LikeAmount, Date_Time, PostID)
                VALUES ('" . TDB($gottenNickname) . "','" . TDB($text) . "', 0, '" . TDB($date)."', ".TDB($postID).");";


                if($accountExists){
                    sql_Execute($quer);
                    echo (json_encode(array("answer" => true)));
                }
                break;
            }
            
            case "getRecentPosts": {
                $postID = htmlspecialchars($_POST["postID"]);
                getRecentPosts(true, $postID);
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
                $id_token = parseBase64($jwt->id_token);
                    
                $email = ($id_token->email);
                $gottenNickname = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");

                $date = gmdate('Y-m-d H:i:s');

                $title = ($_POST["title"]);
                $body = ($_POST["body"]);
                //echo($body);
                $accountExists = ($gottenNickname != "" ? true : false);

                if($accountExists){
                    sql_Execute("INSERT INTO Posts (TITLE, BODY, AuthorName, AuthorEmail, LikeAmount, DATE_TIME)
                     VALUES ('" . TDB($title) . "', '" . TDB($body) . "', '" . TDB($gottenNickname) .
                     "', '" . TDB($email) . "', 0, '" . TDB($date) . "'); ");
                     echo (json_encode(array("postID" => sql_StringExecute("SELECT MAX(Posts.ID) from Posts"))));
                }
                

                
                break;
            }

            case "getUsersNickname": {
                $headers = getallheaders();

                $id_token = parseBase64($jwt->id_token);
                    
                $email = ($id_token->email);
                $gottenNickname = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");
                $accountExists = ($gottenNickname != "" ? true : false);
                echo (json_encode(array("nickname" => $gottenNickname, "accountExists" => $accountExists)));
                break;
            }


            
            case "changeUserName":{
                $nickname = htmlspecialchars($_POST["nickname"]);
                $id_token = parseBase64($jwt->id_token);
                    
                $email = ($id_token->email);
                $currentName = sql_StringExecute("SELECT Nickname FROM Users WHERE `Email` = '". TDB($email) ."';");

                $checkq = "SELECT 1 FROM Users WHERE Nickname='" . TDB($nickname) . "';";
                $checkName = sql_StringExecute($checkq);

                if($checkName == ""){
                    sql_Execute("UPDATE Users SET Nickname = '" . TDB($nickname) . "' WHERE Email = '" . TDB($email) . "'");

                    //postos
                    $qqq = "UPDATE Posts SET AuthorName = '" . TDB($nickname) . "' WHERE AuthorName = '" . TDB($currentName) . "'";
                    sql_Execute("UPDATE Posts SET AuthorName = '" . TDB($nickname) . "' WHERE AuthorName = '" . TDB($currentName) . "'");

                    //komentos
                    sql_Execute("UPDATE Comments SET AuthorName = '" . TDB($nickname) . "' WHERE AuthorName = '" . TDB($currentName) . "'");

                    echo (json_encode(array("success" => true)));
                }else{
                    echo (json_encode(array("success" => false)));
                }

                break;
            }
        

            case 'nickNameUpdate': {
                    $nickname = $_POST["nickname"];
                    $id_token = parseBase64($jwt->id_token);
                    
                    $email = ($id_token->email);
                    
                    $checkName = sql_StringExecute("SELECT 1 FROM Users WHERE Nickname='" . TDB($nickname) . "' AND Email <> '" . TDB($email) . "'");

                    

                    $accountExistsCheck = sql_StringExecute("SELECT Nickname FROM Users WHERE Email='" . TDB($email) . "'");


                    if ($checkName == "") {
                        if ($accountExistsCheck == "") {
                            sql_Execute("INSERT INTO Users (Email, Nickname) VALUES ('" . TDB($email) . "', '" . TDB($nickname) . "')");
                            echo (json_encode(array("success" => true)));
                        } else {
                            sql_Execute("UPDATE Users SET Nickname = '" . TDB($nickname) . "' WHERE Email = '" . TDB($email) . "'");
                            echo (json_encode(array("success" => true)));
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



function convertToString($stdClassObject) {
    // Check if the input is an instance of stdClass
    if (!($stdClassObject instanceof stdClass)) {
        throw new InvalidArgumentException('Input must be an instance of stdClass');
    }

    // Convert stdClass object to a JSON-encoded string
    $jsonString = json_encode($stdClassObject);

    return $jsonString;
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



function parseBase64($token)
{
    $base64Url = explode('.', $token)[1];
    $base64 = str_replace('-', '+', str_replace('_', '/', $base64Url));
    $jsonPayload = json_decode(base64_decode($base64));
    return $jsonPayload;
}




function verifyJWT( $jwt ) {
        $keyStr = file_get_contents("https://www.googleapis.com/oauth2/v1/certs");

        $keys = json_decode($keyStr, true);
    
        global $Google_ClientID;
        
        // split the jwt
        $tokenParts = explode( '.', $jwt ); 
    
        $head = json_decode( base64_decode( strtr( $tokenParts[0], '-_', '+/' ) ), true );
        $body = json_decode( base64_decode( strtr( $tokenParts[1], '-_', '+/' ) ), true );
    
        // check expiration time
        /*if ( time() >= $body['exp'] ) {
            return false;
        }*/
    
        // check aud
        if ( $body['aud'] !== $Google_ClientID ) {
            return false;
        }
    
        // check iss
        if ( ! in_array( $body['iss'], [ 'accounts.google.com', 'https://accounts.google.com' ] ) ) {
            return false;
        }
    
        // verify the signature
        $signature = base64_decode( strtr( $tokenParts[2], '-_', '+/' ) );
    
    
    
        $valid = openssl_verify( $tokenParts[0] . '.' . $tokenParts[1], $signature, $keys[$head['kid']], 'SHA256' );
        
    
        if ( $valid == 1 ) {
            return true;
        }
    
        return false;    
}