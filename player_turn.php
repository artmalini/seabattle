<?php 
	require_once "class/Ship.class.php";
	require_once "class/Destroyer.class.php";
	require_once "class/Game.class.php";

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<title>Document</title>	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="js/my.js"></script>
<style>
html {
	padding: 0;
	margin: 0;
  height: 100%;
}
body {
  min-height: 100%;
}
.back {
	background-color: antiquewhite;
	/* min-height: 100%; */
}
.base-tmp {
	width: 1500px;
	height: 100%;
	background-color: #a1a4b0;
	margin-left: 10%;
	margin-top: 10%;
}
.wrap {
   margin-left: 295px;
   margin-right: 279px;
   perspective: 646px;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
	/* width: 100%; */
	/* border: 1px solid #ddd; */
	transform-style: preserve-3d;
	transform: rotateX(57deg);
}

th, td {
	/* text-align: left; */
	border: 1px solid #b4b4ff;
	padding: 0;
}
.ships-dock {
	position: relative;
	width: 50px;
	height: 50px;
}
tr:nth-child(even) { 
	background-color: #1768cf;
}
 .dragg, .draggable2 {
 	    background-color: green;
 	    width: 50px;
 	    height: 100px;
 	    padding: 0;
 	    position: absolute;
 } 

 #ac-wrapper {
display: none; 
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(255,255,255,.6);
z-index: 1001;
}
#popup{
width: 555px;
height: 375px;
background: #FFFFFF;
border: 5px solid #000;
border-radius: 25px;
-moz-border-radius: 25px;
-webkit-border-radius: 25px;
box-shadow: #64686e 0px 0px 3px 3px;
-moz-box-shadow: #64686e 0px 0px 3px 3px;
-webkit-box-shadow: #64686e 0px 0px 3px 3px;
position: relative;
top: 20%;
margin: auto;
}
#popup .close {
    position: absolute;
    right: 20px;
    top: 18px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: url('http://g02.a.alicdn.com/kf/HTB1jHxALVXXXXa.XpXX760XFXXXE.png') no-repeat;
}
</style>
</head>
</head>
<body class="player_turn">
<?php
$pl_game = $_SESSION['player'];
$pl_enemy = $_SESSION['enemy'];
?>

<div class="back">
	<div class="base-tmp">
		<div>
			<div class="wrap">
			<?php
				$nbr = 1;
				$find = 0;
				$dragg = 1;
				$mas = $pl_enemy->getShips();

				echo '<table>
					<tbody>';
				for ($i=1; $i < 11; $i++) {
					echo '<tr>';
					for ($j=1; $j < 11; $j++) {
						for ($k=0; $k < 2; $k++) { 
							if ($mas[$k]->getNbr() === $nbr) {
								$find = 1;
								echo '<td class="has_ship yes" data-nbr='.$nbr.'><div class="ships-dock" data-pos_y='.$mas[$k]->getPos()['y'].' data-pos_x='.$mas[$k]->getPos()['x'].'>
								<div id="dragg'.$dragg++.'" class="dragg '.$mas[$k]->getType().'" data-stay="'.$mas[$k]->geStay().'" data-size="'.$mas[$k]->getSize().'" draggable="true"></div></td>';						
								break;
							}
							$find = 0;
						}
						if ($find == 0) {
							echo '<td class="has_ship no" data-nbr='.$nbr.'>
							<div class="ships-dock" data-pos_y='.$i.' data-pos_x='.$j.'></div></td>';
						}
						$nbr++;
					}
					echo '</tr>';
				}
						
				echo '</tbody>
				</table>';
			?>
			</div>
		</div>
	 <div id="ac-wrapper">
		<div id="popup">
			<div class="next_close"></div>
		<center>
			<h2>You choose target coordinats!</h2>
				<input type="button" class="next_action" value="Attack!">
				<input type="button" class="next_cancel" value="Cancel">
		</center>
		</div>
	</div>
	</div>
</div>

<?php 


//echo $pl_game->totalShips() . '</br>';

print_r($pl_enemy->getShips());
//$mas = $pl_enemy->getShips();

//print_r($mas);
 
//echo "****\n";

//print_r($pl_game->getShips());
//$hitter = $pl_game->getShips();
//print_r($hitter[0]);
//$hitter[0]->hit();
// echo "lives: " . $hitter[0]->getLives();

// print_r($hitter[0]);
// if ($hitter[0]->getLives() == 0)
// 	$pl_game->shipDestroyed(0);
// echo "****\n";

// print_r($pl_game->getShips());

// unset($_SESSION['player']);
// unset($_SESSION['enemy']);
?>
  <script>
// $(document).ready(function(){
// 	 setTimeout(function(){
// 			$('#ac-wrapper').css('display','block');
// 	 },5000); 
// 			$('.close').click(function() {       
// 				$('#ac-wrapper').css('display','none');
// 			});
// });
    // };
  </script>
</body>
</html>