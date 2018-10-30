<?php
	require_once 'game_config.php';

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}	

	$status = '';
    if ($_POST['submit'] == "Enter to GAME!" && $_POST['submit'] && !empty($_POST['login']) && !empty($_POST['passwd'])) {
        $exist = 0;
        $sql = "SELECT id, login FROM users";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0)
        {
            while ($row = mysqli_fetch_assoc($result))
            {
                if ($row['login'] == $_POST['login'])
                {
                    $status = "* User exists already";
                    mysqli_close($conn);
                    $exist = 1;
                    break;
                }
            }
        }
        if (!$exist)
        {
            $pwd = $conn->real_escape_string($_POST['passwd']);
            $login = $conn->real_escape_string($_POST['login']);
            $sql = "INSERT INTO users (login, password)
                VALUES ('" . $login . "', '" . hash('whirlpool', $pwd) . "')";
            mysqli_query($conn, $sql);
            mysqli_close($conn);
            $_SESSION['login'] = $login;
            header('Location: game.php');
        }
    } 
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<title>Register</title>	
	<link rel="stylesheet" href="css/my.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body class="main-board">



<section class="main-board">

	<div class="container">
		<div class="row">
			<div class="col-md-9 col-sm-12">
					<form action="/register.php" method="POST" class="log-reg">
					  <div class="log-reg-cont">
					  	<h1>Register Form</h1>
					  	<br />
					  	<span class="inp-err"><?php echo $status; ?></span>
					  	<input type="text" name="login" placeholder="Login min 4 symbols" pattern=".{4,17}" value="" />
						<br />
						<br />
						<input type="password" name="passwd" placeholder="Password min 6 symbols" pattern=".{6,17}" value="" />
						<br />
						<input type="submit" name="submit" value="Enter to GAME!" />
						<a class="log-create" href="index.php">back to login</a>
					  </div>
					</form>
			</div>
		</div>
	</div>
</section>
<script src="js/my.js"></script>
</body>
</html>