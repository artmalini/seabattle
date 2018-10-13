<?php
/**
 * 
 */
class Ship {
	private $type;
	private $lives;
	private $pos;
	
	public function __construct(array $val) {
		$this->type = $val['type'];
		$this->lives = $val['lives'];
		$this->pos = $val['pos'];
	}

	public function getDamage() {
		if ($this->lives > 0) {
			$this->lives--;
		} else {
			$this->lives = 0;
		}
	}

	public function getLives() {
		return $this->lives;
	}

	public function __destruct() {}
}
?>