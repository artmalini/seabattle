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
	unset($_SESSION['player']);
	//unset($_SESSION['enemy']);

	if (!isset($_SESSION['player']) && empty($_SESSION['player'])) {
		$_SESSION['player'] = new Game();
	}
	//if (!isset($_SESSION['enemy']) && empty($_SESSION['enemy'])) {
	//	$_SESSION['enemy'] = new Game();
	//}

if (!empty($_POST['coord']) && !empty($_POST['stay']) && !empty($_POST['type'])) {
	$coord = explode(',', $_POST['coord']);
	$stay = explode(',', $_POST['stay']);
	$type = explode(',', $_POST['type']);

	$ship = array();
	$k = 0;
	$s_type = 0;
	$i = 0;
	$max = 0;
	foreach ($type as $key) {
		if ($key) {
			if ($key == 'cutter') {
				$max = 0;
			}			
			if ($key == 'destroyer') {
				$max = 1;
			}
			if ($key == 'cruiser') {
				$max = 2;
			}
			if ($key == 'aircraft') {
				$max = 3;
			}			
				$pos = 0;
				$ship[$i]['type'] = $key;
				$ship[$i]['stay'] = $stay[$s_type];
				$ship[$i]['size'] = $max + 1;
				$ship[$i]['nbr'] = array();
				foreach ($coord as $crd) {
					$ship[$i]['nbr'][] = $coord[$k];
					if ($pos == $max) {
						$k++;
						$pos++;						
						break ;
					}
					$k++;
					$pos++;
				}
		$s_type++;
		$i++;
		}
	}

	$pl_game = $_SESSION['player'];
	//$pl_enemy = $_SESSION['enemy'];
	$build = array();
	foreach ($ship as $key => $mass) {
		foreach ($mass as $m_key => $m_value) {
				$build[$m_key] = $m_value;
		}
		$pl_game->addShip($build);
		unset($build);
	}


	print_r($ship);
	//print_r($pl_game->getShips());
	//echo "string";
}
?>