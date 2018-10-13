<?php 
	require_once "class/Ship.class.php";
	require_once "class/Destroyer.class.php";
	require_once "class/Game.class.php";

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}

	if (!isset($_SESSION['player'])) {
		$_SESSION['player'] = new Game();
	}
	if (!isset($_SESSION['enemy'])) {
		$_SESSION['enemy'] = new Game();
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
 	    background-color: brown;
 	    width: 50px;
 	    height: 100px;
 	    padding: 0;
 	    position: absolute;
 } 
</style>
</head>
</head>
<body>

<div class="back">
	<div class="base-tmp">
		<div>
			<div class="wrap">
			<table>
				<tbody>
					<tr>
					  <td class="has_ship yep" data-nbr="1">
					  	<div class="ships-dock" data-pos_y="1" data-pos_x="1"><div id="dragg1" class="dragg destroyer1" data-pos="vertical" data-size="2" draggable="true">ok</div>
					  	</div>
					  </td>
					  <td data-nbr="2"><div class="ships-dock" data-pos_y="2" data-pos_x="1"></div></td>
					  <td data-nbr="3"><div class="ships-dock"></div></td>
					  <td data-nbr="4"><div class="ships-dock"></div></td>
					  <td data-nbr="5"><div class="ships-dock"></div></td>
					  <td data-nbr="6"><div class="ships-dock"></div></td>
					  <td data-nbr="7"><div class="ships-dock"></div></td>
					  <td data-nbr="8"><div class="ships-dock"></div></td>
					  <td data-nbr="9"><div class="ships-dock"></div></td>
					  <td data-nbr="10"><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td class="has_ship yep" data-nbr="11">
					  	<div class="ships-dock" data-pos_y="1" data-pos_x="2"></div>
					  </td>
					  <td data-nbr="12"><div class="ships-dock"></div></td>
					  <td data-nbr="13"><div class="ships-dock"></div></td>
					  <td data-nbr="14"><div class="ships-dock"></div></td>
					  <td data-nbr="15"><div class="ships-dock"></div></td>
					  <td data-nbr="16"><div class="ships-dock"></div></td>
					  <td data-nbr="17"><div class="ships-dock"></div></td>
					  <td data-nbr="18"><div class="ships-dock"></div></td>
					  <td data-nbr="19"><div class="ships-dock"></div></td>
					  <td data-nbr="20"><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td data-nbr="21"><div class="ships-dock"></div></td>
					  <td data-nbr="22"><div class="ships-dock"></div></td>
					  <td data-nbr="23"><div class="ships-dock"></div></td>
					  <td data-nbr="24"><div class="ships-dock"></div></td>
					  <td data-nbr="25"><div class="ships-dock"></div></td>
					  <td data-nbr="26"><div class="ships-dock"></div></td>
					  <td data-nbr="27"><div class="ships-dock"></div></td>
					  <td data-nbr="28"><div class="ships-dock"></div></td>
					  <td data-nbr="29"><div class="ships-dock"></div></td>
					  <td data-nbr="30"><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td class="has_ship yep" data-nbr="1">
					  	<div class="ships-dock" data-pos_y="8" data-pos_x="8"><div id="dragg2" class="dragg destroyer2" data-pos="vertical" data-size="2" draggable="true"></div>
					  	</div>
					  </td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td class="has_ship yep data-nbr="11">
					  	<div class="ships-dock" data-pos_y="1" data-pos_x="2"></div>
					  </td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
					<tr>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					  <td><div class="ships-dock"></div></td>
					</tr>
				</tbody>
			</table>
			</div>
		</div>
	</div>
</div>

<?php 
$pl_game = $_SESSION['player'];
$mas = array();
$mas[0] = 'destroyer1';
$mas[1] = 'destroyer2';
$y = 1;
$x = 1;
for ($i=0; $i < 2; $i++) { 
	$ship['type'] = $mas[$i];
	$ship['pos']['y'] = $y;
	$ship['pos']['x'] = $x;
	$y += 7;
	$x += 7;
	$pl_game->addShip($ship);
}


$pl_enemy = $_SESSION['enemy'];
$mas = array();
$mas[0] = 'destroyer1';
$mas[1] = 'destroyer2';
$y = 1;
$x = 1;
for ($i=0; $i < 2; $i++) { 
	$ship['type'] = $mas[$i];
	$ship['pos']['y'] = $y;
	$ship['pos']['x'] = $x;
	$y += 7;
	$x += 7;
	$pl_enemy->addShip($ship);
}

//echo $pl_game->totalShips() . '</br>';

print_r($pl_game);
//print_r($pl_enemy);
echo "****\n";

//print_r($pl_game->getShips());
$hitter = $pl_game->getShips();
//print_r($hitter[0]);
$hitter[0]->hit();
echo "lives: " . $hitter[0]->getLives();

print_r($hitter[0]);
//$hitter[0]->hit();
if ($hitter[0]->getLives() == 0)
	$pl_game->shipDestroyed(0);
echo "****\n";

print_r($pl_game->getShips());

unset($_SESSION['player']);
unset($_SESSION['enemy']);
?>
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