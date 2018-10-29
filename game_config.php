<?php
    // $host = "fdb23.biz.nf";
    // $user = "2863053_seabattle";
    // $pass = "123456xDlol";
    // $db = "2863053_seabattle";
    $host = "localhost";
    $user = "root";
    $pass = "";
    $db = "seabattle";

    $conn = @mysqli_connect($host, $user, $pass, $db);
	if(!$conn)
	{
?>
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <title>Process to install</title>
	    <link rel="stylesheet" href="css/my.css">
	</head>
	<body>
		<div class="centr-msg">
	        <a class="centr-word" href="install.php">Please click to install</a>
	     </div>
	</body>
	</html>		
<?php
	die(); 
	}
?>