<?php 
	require_once 'game_config.php';
	require_once "class/Ship.class.php";
	require_once "class/Destroyer.class.php";
	require_once "class/Game.class.php";

	if (session_status() === PHP_SESSION_NONE) {
		session_start(); 
	}
	if (empty($_SESSION['login'])) {
		header('Location: index.php');
	}
	
	unset($_SESSION['player']);
	unset($_SESSION['enemy']);

	if (!isset($_SESSION['player']) && empty($_SESSION['player'])) {
		$_SESSION['player'] = new Game();
	}
	if (!isset($_SESSION['enemy']) && empty($_SESSION['enemy'])) {
		$_SESSION['enemy'] = new Game();
	}
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

<div class="back">
	<div class="base-tmp">
		<div>
<div class="wrap main">
<table>
						<tbody><tr><td class="has_ship yes " data-nbr="1">
											<div class="ships-dock" data-pos_y="1" data-pos_x="1">
												<div class="trg"></div>
												<div class="hit"></div>
												<div id="dragg1" class="dragg ply-destroyer1" data-type="destroyer" data-stay="vertical" data-size="2" draggable="true"></div>
											</div>
										</td><td class="has_ship no " data-nbr="2">
										<div class="ships-dock" data-pos_y="1" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="3">
										<div class="ships-dock" data-pos_y="1" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="4">
										<div class="ships-dock" data-pos_y="1" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="5">
										<div class="ships-dock" data-pos_y="1" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="6">
										<div class="ships-dock" data-pos_y="1" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="7">
										<div class="ships-dock" data-pos_y="1" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="8">
										<div class="ships-dock" data-pos_y="1" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="9">
										<div class="ships-dock" data-pos_y="1" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="10">
										<div class="ships-dock" data-pos_y="1" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>

									<tr><td class="has_ship yes" data-nbr="11">
										<div class="ships-dock" data-pos_y="2" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="12">
										<div class="ships-dock" data-pos_y="2" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="13">
										<div class="ships-dock" data-pos_y="2" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="14">
										<div class="ships-dock" data-pos_y="2" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship yes " data-nbr="15">
										<div class="ships-dock" data-pos_y="2" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
											<div id="dragg3" class="dragg ply-cruiser1" data-type="cruiser" data-stay="horizontal" data-size="3" draggable="true"></div>
										</div>
									</td><td class="has_ship yes " data-nbr="16">
										<div class="ships-dock" data-pos_y="2" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship yes " data-nbr="17">
										<div class="ships-dock" data-pos_y="2" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="18">
										<div class="ships-dock" data-pos_y="2" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="19">
										<div class="ships-dock" data-pos_y="2" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="20">
										<div class="ships-dock" data-pos_y="2" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>

									<tr><td class="has_ship no " data-nbr="21">
										<div class="ships-dock" data-pos_y="3" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="22">
										<div class="ships-dock" data-pos_y="3" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="23">
										<div class="ships-dock" data-pos_y="3" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="24">
										<div class="ships-dock" data-pos_y="3" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="25">
										<div class="ships-dock" data-pos_y="3" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="26">
										<div class="ships-dock" data-pos_y="3" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="27">
										<div class="ships-dock" data-pos_y="3" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="28">
										<div class="ships-dock" data-pos_y="3" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="29">
										<div class="ships-dock" data-pos_y="3" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="30">
										<div class="ships-dock" data-pos_y="3" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>

									<tr><td class="has_ship no " data-nbr="31">
										<div class="ships-dock" data-pos_y="4" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="32">
										<div class="ships-dock" data-pos_y="4" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="33">
										<div class="ships-dock" data-pos_y="4" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="34">
										<div class="ships-dock" data-pos_y="4" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="35">
										<div class="ships-dock" data-pos_y="4" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="36">
										<div class="ships-dock" data-pos_y="4" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="37">
										<div class="ships-dock" data-pos_y="4" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="38">
										<div class="ships-dock" data-pos_y="4" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="39">
										<div class="ships-dock" data-pos_y="4" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="40">
										<div class="ships-dock" data-pos_y="4" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>


									<tr><td class="has_ship no " data-nbr="41">
										<div class="ships-dock" data-pos_y="5" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="42">
										<div class="ships-dock" data-pos_y="5" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="43">
										<div class="ships-dock" data-pos_y="5" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="44">
										<div class="ships-dock" data-pos_y="5" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="45">
										<div class="ships-dock" data-pos_y="5" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="46">
										<div class="ships-dock" data-pos_y="5" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="47">
										<div class="ships-dock" data-pos_y="5" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="48">
										<div class="ships-dock" data-pos_y="5" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="49">
										<div class="ships-dock" data-pos_y="5" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="50">
										<div class="ships-dock" data-pos_y="5" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>


									<tr><td class="has_ship no " data-nbr="51">
										<div class="ships-dock" data-pos_y="6" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="52">
										<div class="ships-dock" data-pos_y="6" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="53">
										<div class="ships-dock" data-pos_y="6" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="54">
										<div class="ships-dock" data-pos_y="6" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="55">
										<div class="ships-dock" data-pos_y="6" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="56">
										<div class="ships-dock" data-pos_y="6" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="57">
										<div class="ships-dock" data-pos_y="6" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="58">
										<div class="ships-dock" data-pos_y="6" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="59">
										<div class="ships-dock" data-pos_y="6" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="60">
										<div class="ships-dock" data-pos_y="6" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>


									<tr><td class="has_ship no " data-nbr="61">
										<div class="ships-dock" data-pos_y="7" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="62">
										<div class="ships-dock" data-pos_y="7" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="63">
										<div class="ships-dock" data-pos_y="7" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="64">
										<div class="ships-dock" data-pos_y="7" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="65">
										<div class="ships-dock" data-pos_y="7" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="66">
										<div class="ships-dock" data-pos_y="7" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="67">
										<div class="ships-dock" data-pos_y="7" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="68">
										<div class="ships-dock" data-pos_y="7" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="69">
										<div class="ships-dock" data-pos_y="7" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="70">
										<div class="ships-dock" data-pos_y="7" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>


									<tr><td class="has_ship no " data-nbr="71">
										<div class="ships-dock" data-pos_y="8" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="72">
										<div class="ships-dock" data-pos_y="8" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="73">
										<div class="ships-dock" data-pos_y="8" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="74">
										<div class="ships-dock" data-pos_y="8" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="75">
										<div class="ships-dock" data-pos_y="8" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="76">
										<div class="ships-dock" data-pos_y="8" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="77">
										<div class="ships-dock" data-pos_y="8" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship yes " data-nbr="78">
											<div class="ships-dock" data-pos_y="8" data-pos_x="8">
												<div class="trg"></div>
												<div class="hit"></div>
												<div id="dragg2" class="dragg ply-destroyer2" data-type="destroyer" data-stay="vertical" data-size="2" draggable="true"></div>
											</div>
										</td><td class="has_ship no " data-nbr="79">
										<div class="ships-dock" data-pos_y="8" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="80">
										<div class="ships-dock" data-pos_y="8" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>


									<tr><td class="has_ship no " data-nbr="81">
										<div class="ships-dock" data-pos_y="9" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="82">
										<div class="ships-dock" data-pos_y="9" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="83">
										<div class="ships-dock" data-pos_y="9" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="84">
										<div class="ships-dock" data-pos_y="9" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="85">
										<div class="ships-dock" data-pos_y="9" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="86">
										<div class="ships-dock" data-pos_y="9" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="87">
										<div class="ships-dock" data-pos_y="9" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship yes" data-nbr="88">
										<div class="ships-dock" data-pos_y="9" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="89">
										<div class="ships-dock" data-pos_y="9" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="90">
										<div class="ships-dock" data-pos_y="9" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr>


									<tr><td class="has_ship no " data-nbr="91">
										<div class="ships-dock" data-pos_y="10" data-pos_x="1">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="92">
										<div class="ships-dock" data-pos_y="10" data-pos_x="2">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="93">
										<div class="ships-dock" data-pos_y="10" data-pos_x="3">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="94">
										<div class="ships-dock" data-pos_y="10" data-pos_x="4">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="95">
										<div class="ships-dock" data-pos_y="10" data-pos_x="5">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="96">
										<div class="ships-dock" data-pos_y="10" data-pos_x="6">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="97">
										<div class="ships-dock" data-pos_y="10" data-pos_x="7">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="98">
										<div class="ships-dock" data-pos_y="10" data-pos_x="8">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="99">
										<div class="ships-dock" data-pos_y="10" data-pos_x="9">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td><td class="has_ship no " data-nbr="100">
										<div class="ships-dock" data-pos_y="10" data-pos_x="10">
											<div class="trg"></div>
											<div class="hit"></div>
										</div>
									</td></tr></tbody>
					</table>
			</div>
		</div>
	<div class="act"><input type="button" class="next_action" value="Next Action"></div>
	<div class="act"><input type="button" class="fleet" value="Create"></div>
	</div>
</div>

<?php 
$pl_game = $_SESSION['player'];
$mas = array();
$mas[0] = 'destroyer1';
$mas[1] = 'destroyer2';
$y = 1;
$x = 1;
$nbr = array(1,11);
$stay = 'vertical';
$size = 2;
for ($i=0; $i < 2; $i++) { 
	$ship['type'] = $mas[$i];
	$ship['nbr'] = $nbr;
	$ship['stay'] = $stay;
	$ship['size'] = $size;
	$ship['pos']['y'] = $y;
	$ship['pos']['x'] = $x;
	$y += 7;
	$x += 7;
	$nbr = array(78,88);//all poinnts
	$pl_game->addShip($ship);
}


$pl_enemy = $_SESSION['enemy'];
$mas = array();
$mas[0] = 'destroyer1';
$mas[1] = 'destroyer2';
$y = 1;
$x = 1;
$nbr = array(1,11);
$stay = 'vertical';
$size = 2;
for ($i=0; $i < 2; $i++) { 
	$ship['type'] = $mas[$i];
	$ship['nbr'] = $nbr;
	$ship['stay'] = $stay;
	$ship['size'] = $size;
	$ship['pos']['y'] = $y;
	$ship['pos']['x'] = $x;
	$y += 7;
	$x += 7;
	$nbr = array(78,88);
	$pl_enemy->addShip($ship);
}

//echo $pl_game->totalShips() . '</br>';

print_r($pl_game);
//print_r($pl_enemy);
echo "****\n";

print_r($pl_game->getShips());
echo "total: " . count($pl_game->getShips()) . '</br>';
// $hitter = $pl_game->getShips();
// $hitter[0]->hit();
// echo "lives: " . $hitter[0]->getLives();

// print_r($hitter[0]);
// if ($hitter[0]->getLives() == 0)
// 	$pl_game->shipDestroyed(0);
// echo "****\n";

//print_r($pl_game->getShips());

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