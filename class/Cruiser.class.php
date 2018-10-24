<?php
require_once 'Ship.class.php';
/**
 * 
 */
class Cruiser extends Ship {
	const LIVES = 3;

	public function __construct(array $type) {
		$ship = array();
		$ship['type'] = $type['type'];
		$ship['lives'] = self::LIVES;
		$ship['pos'] = $type['pos'];
		$ship['nbr'] = $type['nbr'];
		$ship['stay'] = $type['stay'];
		$ship['size'] = $type['size'];
		parent::__construct($ship);
	}

	public function hit() {
		$this->getDamage();
	}

	public function __destruct() {}
}
?>