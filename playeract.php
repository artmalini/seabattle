<?php
	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}
	$pl_enemy = $_SESSION['enemy'];
	echo json_encode(array('returned_val' => 'yoho'));
?>