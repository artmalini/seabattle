<?php 
	require_once "class/Ship.class.php";
	require_once "class/Aircraft.class.php";
	require_once "class/Cutter.class.php";
	require_once "class/Cruiser.class.php";
	require_once "class/Destroyer.class.php";
	require_once "class/Game.class.php";

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}

	if (empty($_SESSION['login'])) {
		header('Location: index.php');
	}
	
	if (empty($_SESSION['login'])) {
		header('Location: index.php');
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<title>Enemy</title>
	<link rel="stylesheet" href="css/my.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="js/my.js"></script>
</head>
<body class="enemy_turn board-ships">
<?php
$pl_game = $_SESSION['player'];
$pl_enemy = $_SESSION['enemy'];
?>

<section class="wrap base-tmp trs">
	<div class="container">
		<div class="row">
				<div class="col-md-12 col-sm-12">
					<div class="table-wrap">
			<?php
				$nbr = 1;
				$find = 0;
				$dragg = 1;
				$mas = $pl_game->getShips();
				$view_attack = $pl_enemy->getAttackCoords();
				//$count = count($mas) ? count($mas) : 0;
				$hit = null;

				if ($mas > 0) {
					echo '<table>
						<tbody>';						
					for ($i=1; $i < 11; $i++) {
						echo '<tr>';
						for ($j=1; $j < 11; $j++) {
							for ($k=0; $k < 10; $k++) {
								if ($mas[$k] && $mas[$k]->getNbr()[0] == $nbr) {
									$find = 1;
									if ($mas[$k]->getStay() == 'horizontal') {
										$l = 1;
									} else {
										$l = 2;
									}
									if (in_array($nbr, $view_attack)) {
										$hit = 'hitted';
									} else {
										$hit = null;
									}
									echo '<td class="has_ship yes ' .$hit.'" data-nbr='.$nbr.'>
											<div class="ships-dock" data-pos_y='.$i.' data-pos_x='.$j.'>
												<div class="trg"></div>
												<div class="hit"></div>
												<div id="dragg'.$dragg++.'" class="ply ply-'.$mas[$k]->getType().$l.'" data-type="'.$mas[$k]->getType().'" data-stay="'.$mas[$k]->getStay().'" data-size="'.$mas[$k]->getSize().'"></div>
											</div>
										</td>';
									break;
								}
								$find = 0;
							}
							if ($find == 0) {
								if (in_array($nbr, $view_attack)) {
									$hit = 'hitted';
								} else {
									$hit = null;
								}						
								echo '<td class="has_ship no ' .$hit.'" data-nbr='.$nbr.'>
										<div class="ships-dock" data-pos_y='.$i.' data-pos_x='.$j.'>
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td>';
							}
							$nbr++;
						}
						echo '</tr>';
					}						
					echo '</tbody>
					</table>';
				}
			?>
				<div class="rule-wrap">
					<div class="act exit_game"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</section>

<?php 

//print_r($view_attack);
//echo $pl_game->totalShips() . '</br>';

//print_r($pl_game);
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
</body>
</html>