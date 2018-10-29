<?php 
	require_once 'game_config.php';

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}	

		if ($_POST['submit'] == "Enter to GAME!" && $_POST['submit'] && !empty($_POST['login']) && !empty($_POST['passwd']))
		{
			$pwd = $conn->real_escape_string($_POST['passwd']);
			$login = $conn->real_escape_string($_POST['login']);

			$sql = "SELECT * FROM `users` WHERE `login` = '$login'";
			$result = mysqli_query($conn, $sql);
			if (mysqli_num_rows($result) > 0) {
					$row = mysqli_fetch_assoc($result);
					if ($row['password'] === hash('whirlpool', $pwd)) {
						$_SESSION['login'] = $login;
							mysqli_close($conn);
						header('Location: game.php');
					} else {
						$status = "* login error";
						mysqli_close($conn);
					}
			} else {
						mysqli_close($conn);
						header('Location: register.php');
				}  
		}
		
	 
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<title>SeaBattle</title>	
	<link rel="stylesheet" href="css/my.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
</head>
<body class="main-board">

	 <section>
				<div class="container">
					 <div class="row">
							 <div class="col-md-9 col-sm-12">
											 <form action="#" method="POST" class="log-reg">
												 <div class="log-reg-cont">
													 <h1>Welcome</h1>
													 <br />
													 <span class="inp-err"><?php echo $status; ?></span>
													 <input type="text" name="login" placeholder="Login" value="" />
													 <br />
													 <br />
													 <input type="password" name="passwd" placeholder="Password" value="" />
													 <br />
													 <input type="submit" name="submit" value="Enter to GAME!" />
													 <a class="log-create" href="register.php">Create Account<a/>
												 </div>
											 </form>
							 </div>
					 </div>
			 </div>
	 </section>
<script src="js/my.js"></script>
</body>
</html>