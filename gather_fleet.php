<?php
if (!empty($_POST['coord']) && !empty($_POST['stay']) && !empty($_POST['type'])) {
	$coord = explode(',', $_POST['coord']);

	print_r($coord);
	//echo "string";
}
?>