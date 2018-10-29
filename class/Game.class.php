<?php

class Game {
	private $title;
	private $ships = array();
	private $attacks = null;
	private $nbr = 0;
	const SEA = 'Sea Battle';
	
	public function __construct() {
		$this->title = self::SEA;
		$this->attacks = array();		
	}

	public function getShips() {
		return $this->ships;
	}

	public function totalShips() {
		return $this->nbr;
	}

	public function shipDestroyed($key){
		unset($this->ships[$key]);
		$this->nbr--;
	}

	public function addShip(array $name) {
		switch ($name['type']) {
			case 'aircraft':
				$this->ships[] = new Aircraft($name);
				$this->nbr++;
				break;
			case 'destroyer':
				$this->ships[] = new Destroyer($name);
				$this->nbr++;
				break;				
			case 'cruiser':
				$this->ships[] = new Cruiser($name);
				$this->nbr++;
				break;
			case 'cutter':
				$this->ships[] = new Cutter($name);
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