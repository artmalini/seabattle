
$(document).ready(function () {
		
		$('.table-wrap').on('click', '.bat_over_ok', function() {
		 	window.location.href = '/game.php';
		});	

		if ($('body').hasClass('board-ships')) {
			$('.ply').each(function() {
				var model = $(this);
				var stay = $(model).data('stay');
				var type = $(model).data('type');
				if (stay.localeCompare('vertical') == 0) {
					$(model).css({'background': 'url(res/'+type+'-v.png) no-repeat'});
				}
				if (stay.localeCompare('horizontal') == 0) {
					$(model).css({'background': 'url(res/'+type+'-h.png) no-repeat'});
				}
			});
		}
	

	function add_classer() {
		console.log('read');
		$('.has_ship.yes').each(function() {
			var nbr = $(this).data('nbr');
			var stay = $(this).find('.ply').data('stay');
			var size = $(this).find('.ply').data('size');
			console.log(nbr);
			if (stay) {
				if (stay.localeCompare('vertical') == 0) {
					for (var i = size; i > 1; i--) {
						var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size * 10))+'"]');
						$(tmp).removeClass('no').addClass('yes');
						console.log(tmp[0]);
					}
				}
				if (stay.localeCompare('horizontal') == 0) {
					for (var i = size; i > 1; i--) {
						var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size))+'"]');
						$(tmp).removeClass('no').addClass('yes');
						console.log(tmp[0]);
					}
				}
			}
		});
	}
	add_classer();

	function err_message() {
		var str = '<div class="ac-status">'+
						'<div class="player_miss">'+
							'<h3>Error: Wrong position!</h3>'+
						'</div>'+
					'</div>';
		$('.base-tmp').append(str);
		setTimeout(function(){
			$('.player_miss h3').fadeOut();
			$('.ac-status').remove();
		}, 500);
	}


	//$.event.addProp('dataTransfer');
	var stay, size, nbr, old_nbr, fit, dt = null;
	$('.dragg').on("touchstart dragstart", function (event) {
		console.log('dragstart');

		//dt = event.originalEvent.dataTransfer;
		//dt.setData('Text', $(this).attr('id'));
		//$.event.setData('Text', $(this).attr('id'));
		dt = $(this).attr('id');
		stay = $(this).data('stay');
		size = $(this).data('size');
		old_nbr = $(this).closest('td').data('nbr');

 		//if previous dragg out from window
	   var out = $('.dragg').closest('td').hasClass('no');
	   if (out) {
			$('.dragg').closest('td').removeClass('no').addClass('yes');
			add_classer();
	   }
	});

	function vertical_handler() {
		var tmp = size;

		if (stay && stay.localeCompare('vertical') == 0) {
			$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('yes').addClass('no');
			for (var i = tmp; i > 1; i--) {
				var tm = $('.wrap').find('[data-nbr="'+(old_nbr + (--tmp * 10))+'"]');				
				$(tm).removeClass('yes').addClass('no');
				//console.log(tmp);
			}
		}
	}

	function horizont_handler() {
		var tmp = size;

		if (stay.localeCompare('horizontal') == 0) {
			$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('yes').addClass('no');
			for (var i = tmp; i > 1; i--) {
				var tm = $('.wrap').find('[data-nbr="'+(old_nbr + (--tmp))+'"]');
				$(tm).removeClass('yes').addClass('no');
				//console.log(tmp);
			}
		}
	}

	function vertical_check(nbr, pos_x, pos_y, size) {
		var tm_size = size;

		if (nbr > 10 && !((nbr % 10) == 1)) {
			if (pos_x == 1) {
				if ($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]')[0]);
					return -1;
				}
				if ($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
					return -2;
				}
			} else if (pos_x > 1 && pos_x < 10) {
				if ($('.wrap').find('[data-nbr="'+(nbr - (10 - 1))+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - (10 - 1))+'"]')[0]);
					return -3;
				}
				if ($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]')[0]);
					return -4;
				}
				if ($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
					return -5;
				}
			} else if (pos_x == 10) {
				if ($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]')[0]);
					return -6;
				}
				if ($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
					return -7;
				}
				if ($('.wrap').find('[data-nbr="'+(nbr - 1)+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - 1)+'"]')[0]);
					return -7;
				}				
			}
		}
		console.log('----');
		for (var i = 0, j = 0; i < tm_size; i++, j = 10) {
			if ((nbr % 10) != 0) {
				if ($('.wrap').find('[data-nbr="'+((nbr + (j * i)) + 1)+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+((nbr + (j * i)) + 1)+'"]')[0]);
					return -8;
				}
			}
			if (nbr > 1 && pos_x > 1) {
				if ($('.wrap').find('[data-nbr="'+((nbr + (j * i)) - 1)+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+((nbr + (j * i)) - 1)+'"]')[0]);
					return -9;
				}
			}
		}
		console.log('----');
		if ((nbr + (10 * (tm_size - 1))) < 100) {
			nbr = (nbr + (10 * tm_size)) > 99 ? -1 : nbr;
			console.log(nbr);//-1 for bottom
			if (nbr > 0) {
				//var tmp = (pos_x == 1 || pos_x == 10) ? 1 : 2;
				if (pos_x == 1) {
					if ($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size)+'"]'))[0]);
						return -10;
					}
					if ($('.wrap').find('[data-nbr="'+(nbr + 1 + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr + 1 + (10 * tm_size)+'"]'))[0]);
						return -11;
					}
				} else if (pos_x > 1 && pos_x < 10) {
					if ($('.wrap').find('[data-nbr="'+(nbr - 1 + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr - 1 + (10 * tm_size)+'"]'))[0]);
						return -12;
					}
					if ($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size)+'"]'))[0]);
						return -13;
					}
					if ($('.wrap').find('[data-nbr="'+(nbr + 1 + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr + 1 + (10 * tm_size)+'"]'))[0]);			 					
						return -14;
					}
				} else if (pos_x == 10) {
					if ($('.wrap').find('[data-nbr="'+(nbr - 1 + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr - 1 + (10 * tm_size)+'"]'))[0]);
						return -15;
					}
					if ($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size)+'"]')).hasClass('yes')) {
						console.log($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size)+'"]'))[0]);			 					
						return -16;
					}
				}
			}
		}
		console.log('xxxx');
		return 1;
	}

	function horizontal_check(nbr, pos_x, pos_y, size) {
		var tm_size = size;

					if (nbr > 10 && !((nbr % 10) == 1)) {
						if (pos_x == 1) {
							if ($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]'));
								return -1;
							}
							if($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
								return -2;
							}
						} else if (pos_x > 1 && pos_x < 10) {
							if ($('.wrap').find('[data-nbr="'+(nbr - 1)+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr - 1)+'"]'));
								return -3;
							}
							if ($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
								return -4;
							}
							if ($('.wrap').find('[data-nbr="'+(nbr + (10 - 1))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr + (10 - 1))+'"]')[0]);
								return -5;
							}
						} else if (pos_x == 10) {
							if ($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr - 10)+'"]')[0]);
								return -6;
							}
							if ($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
								return -7;
							}
						}
					}
					console.log('----');
					for (var i = 0, j = 0; i < tm_size; i++, j = 10) {
						if ((nbr % 10) != 0) {
							if ($('.wrap').find('[data-nbr="'+(nbr + i - (10))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr + i - (10))+'"]'));
								return -8;
							}
							if ($('.wrap').find('[data-nbr="'+(nbr + i + (10))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr + i + (10))+'"]'));
								return -9;
							}
						}
					}
					console.log('----');
					if (nbr >= 1) {
						if (pos_x >= 1 && pos_x < 10 && ((nbr + tm_size - 1) % 10 != 0)) {
							if ($('.wrap').find('[data-nbr="'+(nbr + (tm_size))+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr + (tm_size))+'"]')[0]);
								return -10;
							}
							if ($('.wrap').find('[data-nbr="'+(nbr + (tm_size) - 10)+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr + (tm_size) - 10)+'"]')[0]);
								return -11;
							}
							if ($('.wrap').find('[data-nbr="'+(nbr + (tm_size) + 10)+'"]').hasClass('yes')) {
								console.log($('.wrap').find('[data-nbr="'+(nbr + (tm_size) + 10)+'"]')[0]);
								return -12;
							}
						} else if ((nbr + tm_size - 1) % 10 == 0) {
							var chk = $('.wrap').find('[data-nbr="'+(nbr + (tm_size - 1))+'"]');
							if ($(chk).hasClass('yes') == 1)
								return -13;
							console.log($(chk).hasClass('no'));
						}
					}
					console.log('xxxx');
					//console.log(calc_n);
					//console.log(calc_e);
					//console.log(calc_w);
					//console.log(calc_s);
		return 1;
	}

	$('.ships-dock').on("touchmove touchend dragenter dragover drop", function (event) {
		console.log('move drag');
		horizont_handler();
		vertical_handler();
		event.preventDefault();
		if (event.type === 'drop' || event.type == 'touchend') {
			console.log('droped');
			nbr = $(this).closest('td').data('nbr');//dropped dock

			//var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
			var data = dt;
			fit = $(this).closest('td');
			//console.log($(fit).hasClass('no'));
			//	console.log($(this).closest('td'));
			//	console.log(this);//transfer ship
			 //console.log('data :'+data);
			 //var stay = $(ship).find('.ships-dock');//.data('stay');//.find('.dragg');
			 //var size =
			 var pos_y = $(this).closest('td').find('.ships-dock').data('pos_y');
			 var pos_x = $(this).closest('td').find('.ships-dock').data('pos_x');	 
				console.log(stay);
				console.log('size '+size);
				console.log('nbr '+nbr);
				console.log('pos_y: '+pos_y);
				console.log('pos_x: '+pos_x);

			var calc_n = 0;
			var calc_e = 0;
			var calc_w = 0;
			var calc_s = 0;

			 if (stay.localeCompare('vertical') == 0) {
				console.log('xxxxx-vert');
				if ($(fit).hasClass('no') == 1) {
					if (((size - 1) + pos_y) > 10) {
						err_message();
						return -1;
					}
					if (vertical_check(nbr, pos_x, pos_y, size) != 1) {
							console.log('error vertical');
						err_message();
						$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
						add_classer();
						return -1;
					}
				} else {
					return -1;
				}
			 }


			 if (stay.localeCompare('horizontal') == 0) {
				console.log('xxxxx-horiz');
				if ($(fit).hasClass('no') == 1) {
					if (((size - 1) + pos_x) > 10) {
						err_message();
						return -1;
					}					
					if (horizontal_check(nbr, pos_x, pos_y, size) != 1) {
							console.log('error horizont');
						err_message();
						$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
						add_classer();
						return -1;
					}
				} else {
					err_message();
					return -1;
				}
			}

			vertical_handler();
			horizont_handler();
		  	var de = $('#' + data).detach();

			de.appendTo($(this));		   
		  	$(de).closest('td').removeClass('no').addClass('yes');
		   	add_classer();
		   //console.log(de);
		} else {
			return ;
		}
	});



	$('.dragg').on('click', function() {
		console.log('click event');
		var pos_y = $(this).closest('td').find('.ships-dock').data('pos_y');
		var pos_x = $(this).closest('td').find('.ships-dock').data('pos_x');
		var obj = this;
		stay = $(this).data('stay');
		var tmp_stay = stay;
		size = $(this).data('size');
		old_nbr = $(this).closest('td').data('nbr');
		nbr = old_nbr;

		console.log(nbr);
		//nbr = $(this).closest('td').data('nbr');
		//console.log(size);
		//
 		/*if previous dragg out from window*/
	   var out = $('.dragg').closest('td').hasClass('no');
	    console.log(stay);
	   if (out) {
			$('.dragg').closest('td').removeClass('no').addClass('yes');
			add_classer();
	   }

	   if (stay.localeCompare('vertical') == 0) {
	   		vertical_handler()
	   		var type = $(obj).data('type');
	   		$(obj).data('stay', 'horizontal');
	   		$(obj).css({'width': size * 50 + 'px', 'height': '50px', 'background': 'url(res/'+type+'-h.png) no-repeat'});
	   		console.log(obj);
	   		console.log($(this).data('stay'));

			if (((size - 1) + pos_x) > 10) {
				console.log('no error horizont');
				err_message();
				setTimeout(function () {$(obj).css({'width': '50px', 'height': size * 50 + 'px', 'background': 'url(res/'+type+'-v.png) no-repeat'});}, 300);
				$(obj).data('stay', 'vertical');
				$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
				add_classer();
				return -1;
			}
			if (horizontal_check(nbr, pos_x, pos_y, size) != 1) {
					console.log('error horizont');
				err_message();
				setTimeout(function () {$(obj).css({'width': '50px', 'height': size * 50 + 'px', 'background': 'url(res/'+type+'-v.png) no-repeat'});}, 300);
				$(obj).data('stay', 'vertical');
				$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
				add_classer();
				return -1;
			}

			$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
			add_classer();
	   }

	   if (stay.localeCompare('horizontal') == 0) {
	   		horizont_handler();
	   		var type = $(obj).data('type');
	   		$(obj).data('stay', 'vertical');
	   		$(obj).css({'width': '50px', 'height': size * 50 + 'px', 'background': 'url(res/'+type+'-v.png) no-repeat'});
	   		console.log(obj);
	   		console.log($(this).data('stay'));

			if (((size - 1) + pos_y) > 10) {
				console.log('no error vertical');
				err_message();
				setTimeout(function () {$(obj).css({'width': size * 50 + 'px', 'height': '50px', 'background': 'url(res/'+type+'-h.png) no-repeat'});}, 300);
				$(obj).data('stay', 'horizontal');
				add_classer();
				return -1;
			}
			if (vertical_check(nbr, pos_x, pos_y, size) != 1) {
					console.log(vertical_check(nbr, pos_x, pos_y, size));
					console.log('error vertical');
				err_message();
				setTimeout(function () {$(obj).css({'width': size * 50 + 'px', 'height': '50px', 'background': 'url(res/'+type+'-h.png) no-repeat'});}, 300);
				$(obj).data('stay', 'horizontal');
				$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
				add_classer();
				return -1;
			}

			$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
			add_classer();
	   }

	})



	/*---------------------------------------------------------------------

	
	 Ships player_turn.php
	-----------------------------------------------------------------------*/
	if ($('body').hasClass('player_turn')) {
		//add_classer();

		/*moves Player_turn.php*/
		var tmp, myobj, y, x;		
		$('.has_ship').on('click', function() {
			//console.log($(this).hasClass('hitted'));
			if (!$(this).hasClass('hitted')) {
				myobj = $(this);
				tmp = $(this).data('nbr');
				console.log(tmp);

				$('.ac-wrapper').css('display','block');
					console.log($(this).find('.ships-dock'));
					y = $(this).find('.ships-dock').data('pos_y');
					x = $(this).find('.ships-dock').data('pos_x');
					//console.log(y,x);
					var data = '<p class="rem">Y: '+y+' X: '+x+'</p>';
					$('.ac-wrapper').find('h2').append(data);
				
				$('.next_close').on('click', function() {
					$('.ac-wrapper').css('display','none');
				});
				$('.next_cancel').on('click', function() {
					$('.ac-wrapper').find('.rem').remove();//delete coords if not needed
					$('.ac-wrapper').css('display','none');
				});
			}

			//.fadeOut(1000);
			//$('.ac-status').fadeOut('slow');
		});

		$('.has_ship.no.hitted').each(function() {
			//console.log($(this));
			$(this).find('.trg').css({"display":"block"});
		});
		$('.has_ship.yes.hitted').each(function() {
			$(this).find('.hit').css({"display":"block"});
		});


		$('.attack_action').on('click', function() {
			console.log(tmp);
			if (!$('.attack_action').hasClass('ok')) {
				$('.attack_action').addClass('ok');
				var trg = tmp;
				$.ajax({
					url:'playeract.php',
					data:{
						target: trg,
						act: 'user'
					},
					type:'POST',
					success:function(data) {
						// Нужно Вернуть сюда количество кораблей, если 10 то нужно сделать ко. игры
						var ret = JSON.parse(data);
						//console.log('res: '+ret.user);
						console.log(ret.act.localeCompare('damage') == 0);

						if (ret.u_total == 10) {
							var res = '<div class="bat_over_status">'+
											'<div class="bat_over_statis">'+
												'<h2>Game Over! You WIN</h2>'+
												'<h2>Total Score:</h2>'+
													'<span class="bat_u_score">'+ret.user+' '+ret.u_total+'</span>'+
													'<span class="bat_e_score">Enemy '+ret.e_total+'</span>'+
											'</div>'+
											'<div class="foot_bat_over_ok"></div>'+
											'<div class="bat_over_ok">Play again</div>'+
										'</div>';
							$('.table-wrap').prepend(res);
						}

						if (ret.act.localeCompare('destroyed') == 0) {
							var res = '<div class="bat_all_status">'+
											'<div class="bat_statis">'+
												'<h2>Score:</h2>'+
													'<span class="bat_u_score">'+ret.user+' '+ret.u_total+'</span>'+
													'<span class="bat_e_score">Enemy '+ret.e_total+'</span>'+
													'<img src="res/'+ret.typea+'_1.jpg" alt="">'+
											'</div>'+
											'<div class="foot_bat_all_ok"></div>'+
											'<div class="bat_all_ok">destroyed</div>'+
										'</div>';
							$('.table-wrap').prepend(res);
						}

						myobj.addClass('hitted');

						$('.has_ship.no.hitted').each(function() {
							$(this).find('.trg').css({"display":"block"});
						});
						$('.has_ship.yes.hitted').each(function() {
							$(this).find('.hit').css({"display":"block"});
						});
						if (myobj.hasClass('yes')) {
							var str = '<div class="ac-status">'+
											'<div class="player_hit">'+
												'<h2 data-heading="Successful">Successful</h2><h2 data-heading="Strike">Strike</h2>'+
											'</div>'+
										'</div>';
							$('.base-tmp').append(str);
							setTimeout(function(){
								$('.ac-status').fadeOut(2000);
								$('.ac-status').remove();
								$('.attack_action').removeClass('ok');
							}, 1500);
						} else {
							var str = '<div class="ac-status">'+
											'<div class="player_miss">'+
												'<h2>Miss</h2>'+
												'<h3>Enemy turn</h3>'+
											'</div>'+
										'</div>';
							$('.base-tmp').append(str);
							setTimeout(function(){
								$('.player_miss h3').animate({'padding-top': '60px'}).fadeOut();
								$('.attack_action').removeClass('ok');
								window.location.href = '/enemy_turn.php';
							}, 1500);
							//console.log(myobj);
						}
					}
				});
			}
			$('.ac-wrapper').css('display','none');
			$('.ac-wrapper').find('.rem').remove();

		});	

		$('.table-wrap').on('click .bat_all_ok', function() {
			$('.bat_all_status').remove();
		});
	
	}









	/*---------------------------------------------------------

	
	 Ships enemy_turn
	----------------------------------------------------------*/
	if ($('body').hasClass('enemy_turn')) {
			$('.has_ship.yes').each(function() {
				var nbr = $(this).data('nbr');
				var stay = $(this).find('.ply').data('stay');
				var size = $(this).find('.ply').data('size');
				if (stay) {
					if (stay.localeCompare('vertical') == 0) {
						for (var i = size; i > 1; i--) {
							var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size * 10))+'"]');
							$(tmp).removeClass('no').addClass('yes');
						}
					}
					if (stay.localeCompare('horizontal') == 0) {
						for (var i = size; i > 1; i--) {
							var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size))+'"]');
							$(tmp).removeClass('no').addClass('yes');
							//console.log(tmp);
						}
					}
				}
			});
		//Math.floor(Math.random() * 100) + 1;
		//
		if (typeof(Storage) !== "undefined") {
			if (!sessionStorage.getItem("cells")) {
				var mas = new Array();
				for (var i = 1; i < 101; i++) {
					mas.push(i);
				}
				sessionStorage.setItem("cells", JSON.stringify(mas));
			}
		}
		//sessionStorage.removeItem("cells");
		var nbr = 0;
		//ship.west = 0;
		var ship = {
			sec_nbr: nbr,
			nbr: nbr,
			contact: 0,
			west: 0,
			north: 0,
			east: 0,
			south: 0
		}
		sessionStorage.setItem("ship", JSON.stringify(ship));
		var data = JSON.parse(sessionStorage.getItem("ship"));
		//
		//nbr = data.nbr;
		if (parseInt(data.nbr) == 0) {
			var get_mas = JSON.parse(sessionStorage.getItem("cells"));
			var num = Math.floor(Math.random() * get_mas.length);
				console.log('just rundom :'+num);
			var roll = get_mas.splice(num - 1, 1);
				console.log(get_mas.length);
				console.log('we get :'+roll[0]);	
			sessionStorage.removeItem("cells");
			sessionStorage.setItem("cells", JSON.stringify(get_mas));
			nbr = roll[0];
			//data.nbr = nbr;///should be delete after
		}

		//if (!sessionStorage.getItem("ship")) {}

		var myobj = $('body').find('[data-nbr="'+nbr+'"]');
		$.ajax({
			url:'playeract.php',
			data:{
				target: nbr,
				act: 'enemy'
			},
			type:'POST',
			success:function(data) {
				// Нужно Вернуть сюда количество кораблей, если 10 то нужно сделать ко. игры
				var ret = JSON.parse(data);
				console.log('res: '+ret);

				if (ret.e_total && ret.e_total == 10) {
					var res = '<div class="bat_over_status">'+
									'<div class="bat_over_statis">'+
										'<h2>Game Over! You Loose</h2>'+
										'<h2>Total Score:</h2>'+
											'<span class="bat_u_score">'+ret.user+' '+ret.u_total+'</span>'+
											'<span class="bat_e_score">Enemy '+ret.e_total+'</span>'+
									'</div>'+
									'<div class="foot_bat_over_ok"></div>'+
									'<div class="bat_over_ok">Play again</div>'+
								'</div>';
					$('.table-wrap').prepend(res);
				}

				if (ret.act && ret.act.localeCompare('destroyed') == 0) {
					var res = '<div class="bat_all_status">'+
									'<div class="bat_statis">'+
										'<h2>Score:</h2>'+
											'<span class="bat_u_score">'+ret.user+' '+ret.u_total+'</span>'+
											'<span class="bat_e_score">Enemy '+ret.e_total+'</span>'+
											'<img src="res/'+ret.typea+'_1.jpg" alt="">'+
									'</div>'+
									'<div class="foot_bat_all_ok"></div>'+
									'<div class="bat_all_ok">shipwreck</div>'+
								'</div>';					
					setTimeout(function() {
						$('.table-wrap').prepend(res);
					}, 2000);
					setTimeout(function(){
						window.location.href = '/enemy_turn.php';
					}, 6000);
				}				

				var trg = JSON.parse(sessionStorage.getItem("ship"));
				if (ret.act.localeCompare('miss') == 0) {// later on hit))
					if (trg.west != 0 || trg.north != 0 || trg.east != 0 || trg.south != 0)
						trg.contact = 1;
					//if (trg.contact == 1) {
					// trg.nbr = trg.sec_nbr;
					// get_mas[trg.nbr - 1] == trg.nbr
					//}
					console.log('miss target');

					trg.contact = 1;
					if (trg.west == 0) {
						trg.nbr = nbr - 1;
						trg.west = trg.nbr;
					} 
					else if (trg.north == 0) {
						trg.nbr = nbr - 10;
						trg.north = trg.nbr;
					}
					else if (trg.east == 0) {
						trg.nbr = nbr + 1;
						trg.east = trg.nbr;
					}
					else if (trg.south == 0) {
						trg.nbr = nbr + 10;
						trg.south = trg.nbr;
					}
					//for (var key in trg)
					//	console.log(key);

					//sessionStorage.setItem("ship", JSON.stringify(trg));
				}


				$('.attack_action').removeClass('ok');
				myobj.addClass('hitted');

				$('.has_ship.no.hitted').each(function() {
					$(this).find('.trg').css({"display":"block"});
				});
				$('.has_ship.yes.hitted').each(function() {
					$(this).find('.hit').css({"display":"block"});
				});
				if (myobj.hasClass('yes')) {
					var str = '<div class="ac-status">'+
									'<div class="player_hit">'+
										'<h2 data-heading="Enemy">Enemy</h2><h2 data-heading="Strike">Strike</h2>'+
									'</div>'+
								'</div>';
					$('.base-tmp').append(str);
					setTimeout(function(){
						$('.ac-status').fadeOut(2000);
						$('.ac-status').remove();
						window.location.href = '/enemy_turn.php';
					}, 5000);
				} else {
					var str = '<div class="ac-status">'+
									'<div class="player_miss">'+
										'<h2>Enemy Miss!!!</h2>'+
										'<h3>Your turn</h3>'+
									'</div>'+
								'</div>';
					setTimeout(function() {
						$('.base-tmp').append(str);
					}, 2000);
					setTimeout(function(){
						$('.player_miss h3').animate({'padding-top': '60px'}).fadeOut();
						window.location.href = '/player_turn.php';
					}, 3000);
					//console.log(myobj);
				}
			}
		});		
	}










	function add_coord() {
		var coord = '';
		$('.ply').each(function(i, elem) {
			var nbr = $(this).closest('.has_ship.yes').data('nbr');
			var stay = $(this).data('stay');
			var size = $(this).data('size');
			var tmp_size = size;
			coord += nbr + ',';
			if (stay) {
				if (stay.localeCompare('vertical') == 0) {
					for (var i = size; i > 1; i--) {
						var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size * 10))+'"]');
						coord += $(tmp).data('nbr') + ',';
						//console.log(coord);
					}
				}
				if (stay.localeCompare('horizontal') == 0) {
					for (var i = size; i > 1; i--) {
						var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size))+'"]');
						coord += $(tmp).data('nbr') + ',';
						//console.log(coord);
					}
				}
			}			
		});
		return coord;
	}

	function add_type() {
		var types = '';

		$('.has_ship.yes').each(function() {
			var val = $(this).find('.ply').data('type');
			if (val)
				types += val + ','; 
		});
		return types;
	}

	function add_stay() {
		var stays = '';

		$('.has_ship.yes').each(function() {
			var val = $(this).find('.ply').data('stay');
			if (val)
				stays += val + ','; 
		});
		return stays;
	}


	/*Game actions game.php*/


	$('.save_fleet').on('click', function() {
		console.log("save_fleet");
		if (!$('.save_fleet').hasClass('ok')) {
			$('.save_fleet').addClass('ok');
			var coord = add_coord();
			var type = add_type();
			var stay = add_stay();
			console.log(type);
			console.log(coord);
			console.log(stay);

			$.ajax({
				url: 'gather_fleet.php',
				data: {
					coord: coord,
					type: type,
					stay: stay
				},
				type: 'POST',
				success: function(val) {
					console.log('res: ' + val);
					$('.save_fleet').after('<div class="save_status">Fleet on positions </br> Press start and fight!</div>');
					setTimeout(function() {
						$('.save_status').fadeOut().remove();
						$('.save_fleet').removeClass('ok');
						$('.start_game').addClass('start').css({'display':'block'});
					}, 1000);
				}
			});
		}
	});

	$('.yes').on('click', function() {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			var tmp = this;
		
			if ($(tmp).find('.ply').length == 0) {
					$(tmp).find('.circle').css({'display':'block'});
					setTimeout(function() {
						$(tmp).find('.circle').css({'display':'none'});
						$(tmp).removeClass('on');
					}, 2000);
				}
			}
	});

	$('.all_ok').on('click', function() {
		$('.all_status').toggle();
	});
	$('.faq').on('click', function() {
		$('.all_status').toggle();
	});


	$('.exit_game').on('click', function() {
		if(confirm('Leave the game')) {
			window.location.href = '/logout.php';
		}
	});

	$('.start_game').on('click', function() {
		if ($('.start_game').hasClass('start')) {
			window.location.href = '/player_turn.php';
		}
	});

})