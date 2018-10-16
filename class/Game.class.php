<?php

class Game {
	private $title;
	private $ships = array();
	private $attacks = null;
	//private $enemy_armada = array();
	private $nbr = 0;
	const SEA = 'Sea Battle';
	
	public function __construct() {
		$this->title = self::SEA;
		$this->attacks = array();
		//$this->enemy_armada = new Enemy($mas);
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

	public	function attacksCoords($val) {
		$this->attacks[] = $val;
	}

	public function getAttackCoords() {
		return $this->attacks;
	}

	public function __destruct() {}
}
?>