<?php 
	require_once 'game_config.php';

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}	

    if ($_POST['submit'] == "OK" && $_POST['submit'] && !empty($_POST['login']) && !empty($_POST['passwd']))
    {
        $exist = 0;
        $sql = "SELECT id, login FROM users";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0)
        {
            while ($row = mysqli_fetch_assoc($result))
            {
                if ($row['login'] == $_POST['login'])
                {
                    echo "User exists already<br/>";
                    $exist = 1;
                    break;
                }
            }
        }
        if (!$exist)
        {
            $pwd = real_escape_string($_POST['passwd']);
            $login = real_escape_string($_POST['login']);
            $sql = "INSERT INTO users (login, password)
                VALUES ('" . $login . "', '" . hash('whirlpool', $pwd) . "')";
            mysqli_query($conn, $sql);
            mysqli_close($conn);
            header('Location: game.php');
        }
    }


	
    if ($_POST['login'] && $_POST['passwd'] && auth($_POST['login'], $_POST['passwd'])) {
    	$pwd = real_escape_string($_POST['passwd']);
    	$login = real_escape_string($_POST['login']);

	    $sql = "SELECT * FROM `users` WHERE `login` = '$login'";
	    $result = mysqli_query($conn, $sql);
	    if (mysqli_num_rows($result) > 0) {
	        $row = mysqli_fetch_assoc($result);
	        if ($row['password'] === hash('whirlpool', $pwd)) {
		        $_SESSION['login'] = $_POST['login'];
	            mysqli_close($conn);
		        header('Location: game.php');
	        } else {
	        	echo "login error";
	        	mysqli_close($conn);
	        }
	    }
    }
    else
        $_SESSION['login'] = "";    
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<title>Document</title>	
	<link rel="stylesheet" href="my.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
</head>
<body>



<div class="wrap main">

<a name="fb_share">share</a>
<a href="gsme.php">Enter to GAME!</a>
<script src="https://www.facebook.com/connect.php/js/FB.Share" type="text/javascript"></script>
</div>
<?php 
// unset($_SESSION['player']);
// unset($_SESSION['enemy']);
?>
<script src="js/my.js"></script>
  <script>
    //var tree = document.getElementsByClassName('wrap')[0];
   // new TreeDragZone(tree);
   // new TreeDropTarget(tree);

    // DragManager.onDragCancel = function(dragObject) {
    //   dragObject.avatar.rollback();
    // };
    // DragManager.onDragEnd = function(dragObject, dropElem) {
    //   dropElem.classList.add('ok');
    // };
  </script>
</body>
</html>