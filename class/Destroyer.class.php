<?php
require_once 'Ship.class.php';
/**
 * 
 */
class Destroyer extends Ship {
	const LIVES = 2;

	public function __construct(array $type) {
		$ship = array();
		$ship['type'] = $type['type'];
		$ship['lives'] = self::LIVES;
		$ship['pos'] = $type['pos'];
		parent::__construct($ship);
	}

	public function hit() {
		$this->getDamage();
	}

	public function __destruct() {}
}
?>