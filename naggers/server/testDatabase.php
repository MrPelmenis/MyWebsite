<?php

include 'config.php';
include 'sql.php';


echo(sql_MultipleRow("SELECT * FROM Posts ORDER BY id DESC LIMIT 2;"));