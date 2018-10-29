<?php
 if (session_start()) {
 	$_SESSION['login'] = "";
 	$_SESSION['player'] = "";
 	$_SESSION['enemy'] = "";
	session_destroy();
 }
 header('Location: index.php');
?>