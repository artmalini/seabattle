<?php
/**
 * 
 */
class Ship {
	private $type;
	private $lives;
	private $pos;
	private $nbr;
	private $stay;
	private $size;
	
	public function __construct(array $val) {
		$this->type = $val['type'];
		$this->lives = $val['lives'];
		$this->pos = $val['pos'];
		$this->nbr = $val['nbr'];
		$this->stay = $val['stay'];
		$this->size = $val['size'];
	}

	public function getDamage() {
		if ($this->lives > 0) {
			$this->lives--;
		} else {
			$this->lives = 0;
		}
	}

	public function getType() {
		return $this->type;
	}

	public function getLives() {
		return $this->lives;
	}

	public function getPos() {
		return $this->pos;
	}

	public function getNbr() {
		return $this->nbr;
	}

	public function getStay() {
		return $this->stay;
	}

	public function getSize() {
		return $this->size;
	}

	public function __destruct() {}
}
?>