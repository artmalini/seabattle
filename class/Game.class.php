<?php

class Game {
	private $title;
	private $ships = array();
	private $nbr = 0;
	const SEA = 'Sea Battle';
	
	public function __construct() {
		$this->title = self::SEA;
	}
	public function getShips() {
		return $this->ships;
	}
	public function totalShips() {
		return $this->nbr;
	}
	public function shipDestroyed($key){
		unset($this->ships[$key]);
	}
	public function addShip(array $name) {
		switch ($name['type']) {
			case 'destroyer1':
				$this->ships[] = new Destroyer($name);
				$this->nbr++;
				break;
			case 'destroyer2':
				$this->ships[] = new Destroyer($name);
				$this->nbr++;
				break;
			default:
				break;

		}
	}
	public function __destruct() {}
}
?>