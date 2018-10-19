<?php
	require_once "class/Ship.class.php";
	require_once "class/Destroyer.class.php";
	require_once "class/Game.class.php";

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}
	
	$pl_game = $_SESSION['player'];
	$pl_enemy = $_SESSION['enemy'];
	$trg = $_POST['target'];
	$arr = null;

	$res = 'miss';
	if (!empty($_POST['target']) && !empty($_POST['act'])) {
		if ($_POST['act'] === 'user') {
			$pl_game->attacksCoords($trg);
			$objects = $pl_game->getAttackCoords();
			$fleet = $pl_enemy->getShips();
		} elseif ($_POST['act'] === 'enemy') {
			$pl_enemy->attacksCoords($trg);
			$objects = $pl_enemy->getAttackCoords();
			$fleet = $pl_game->getShips();
		}

		$count = count($fleet);
		for ($i=0; $i < $count; $i++) {
			$arr = $fleet[$i]->getNbr();
			foreach ($arr as $key) {
				if ($key == $trg) {
					$fleet[$i]->hit();
					if ($fleet[$i]->getLives() > 0) {
						$res = 'damage';
					} else {
						$pl_enemy->shipDestroyed($i);
						$res = 'destroyed';
					}
				}
			}
		}
	}
	echo json_encode($res);
?>