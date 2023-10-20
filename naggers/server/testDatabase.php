<?php

include 'config.php';
include 'sql.php';



$clientID = 10;

$postID = 9;

$hasUserAllreadyLikedThePost = sql_StringExecute("SELECT ID FROM likes WHERE 'UserID' = '" . $clientID . "' ;" );


if(!$hasUserAllreadyLikedThePost){
    sql_Execute("INSERT INTO likes (`postid`, `userid`) VALUES ('". $postID ."','". $clientID ."' ); ");
}