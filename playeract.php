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
	
	$pl_game = $_SESSION['player'];
	$pl_enemy = $_SESSION['enemy'];
	$trg = $_POST['target'];
	$arr = null;

	$res = 'miss';
	if (!empty($_POST['target']) && !empty($_POST['act'])) {
		if ($_POST['act'] === 'user') {
			$pl_game->attacksCoords($trg);
			$fleet = $pl_enemy->getShips();
		} elseif ($_POST['act'] === 'enemy') {
			$pl_enemy->attacksCoords($trg);
			$fleet = $pl_game->getShips();
		}

		//$count = count($fleet);
		for ($i=0; $i < 10; $i++) {
			if ($fleet[$i]) {
				$arr = $fleet[$i]->getNbr();
				foreach ($arr as $key) {
					if ($key == $trg) {
						$typea = $fleet[$i]->getType();
						$fleet[$i]->hit();
						if ($fleet[$i]->getLives() >= 1) {
							$res = 'damage';
						} else {
							if ($_POST['act'] === 'user') {
								$pl_enemy->shipDestroyed($i);
							} else {
								$pl_game->shipDestroyed($i);
							}
							$res = 'destroyed';
							goto end;
						}
					}
				}				
			}
		}
		end:
		$u_total = $pl_enemy->totalShips();
		$u_total = 10 - $u_total;
		$e_total = $pl_game->totalShips();
		$e_total = 10 - $e_total;
		$ret = array('act' => $res, 'user' => $_SESSION['login'], 'u_total' => $u_total, 'e_total' => $e_total, 'typea' => $typea);	
		print_r(json_encode($ret));
	} else {
		print_r(json_encode(array('act' => $res)));
	}
?>