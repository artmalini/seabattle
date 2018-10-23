
$(document).ready(function () {

	function add_classer() {
		console.log('read');
		$('.has_ship.yes').each(function() {
			var nbr = $(this).data('nbr');
			var stay = $(this).find('.dragg').data('stay');
			var size = $(this).find('.dragg').data('size');
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

	var stay, size, nbr, old_nbr, fit = null;
	$('.dragg').on("dragstart", function (event) {
		var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).attr('id'));
		stay = $(this).data('stay');
		size = $(this).data('size');
		old_nbr = $(this).closest('td').data('nbr');

		//console.log(old_nbr);
		//nbr = $(this).closest('td').data('nbr');
		//console.log(size);
		//
 		/*if previous dragg out from window*/
	   var out = $('.dragg').closest('td').hasClass('no');
	    console.log(out);
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
				if ($('.wrap').find('[data-nbr="'+(nbr - (10 - 1))+'"]').hasClass('yes')) {
					console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + 1))+'"]')[0]);
					return -7;
				}
			}

			//for (var i = -1; i < 2; i++) {
				//if ((nbr - (10 + i) % 10 != 0)) {
					//calc_n = $('.wrap').find('[data-nbr="'+(nbr - (10 + i))+'"]');
					//console.log($('.wrap').find('[data-nbr="'+(nbr - (10 + i))+'"]')[0]);
				//}				
			//}
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
			//j = 10;
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

				//for (var i = -1; i < tmp; i++) {
				//	calc_s = $('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size) + (i))+'"]');
				//	console.log($('.wrap').find('[data-nbr="'+(nbr + (10 * tm_size) + (i))+'"]')[0]);
				//}
			}
		}
		console.log('xxxx');
		//console.log(calc_n);
		//console.log(calc_e);
		//console.log(calc_w);
		//console.log(calc_s);
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
							if ($('.wrap').find('[data-nbr="'+(nbr - (10 - 1))+'"]').hasClass('yes')) {
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

	$('.ships-dock').on("dragenter dragover drop", function (event) {
		horizont_handler();
		vertical_handler();
		event.preventDefault();
		if (event.type === 'drop') {
			console.log('droped');
			nbr = $(this).closest('td').data('nbr');//dropped dock

			var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
			fit = $(this).closest('td');
			console.log($(fit).hasClass('no'));
				console.log($(this).closest('td'));
				console.log(this);//transfer ship				
			 console.log('data :'+data);
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
				console.log('xxxxx');
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
				console.log('xxxxx');
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
					//$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
					//add_classer();
					err_message();
					return -1;
				}
			 }

			 vertical_handler();
			 horizont_handler();
			// if (stay.localeCompare('vertical') == 0) {
			// 	$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('yes').addClass('no');
			// 	for (var i = size; i > 1; i--) {
			// 		var tmp = $('.wrap').find('[data-nbr="'+(old_nbr + (--size * 10))+'"]');				
			// 		$(tmp).removeClass('yes').addClass('no');
			// 		//console.log(tmp);
			// 	}
			// }
			// 
			// if (stay.localeCompare('horizontal') == 0) {
			// 	$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('yes').addClass('no');
			// 	for (var i = size; i > 1; i--) {
			// 		var tmp = $('.wrap').find('[data-nbr="'+(old_nbr + (--size))+'"]');
			// 		$(tmp).removeClass('yes').addClass('no');
			// 		//console.log(tmp);
			// 	}
			// }
			
		   var de = $('#' + data).detach();
		  // console.log($('#' + data));
		   // if (event.originalEvent.target.tagName === "DIV") {
			//    de.insertBefore($(event.originalEvent.target));
			//}
			//else {
				de.appendTo($(this));
		   // }
		   $(de).closest('td').removeClass('no').addClass('yes');
		   add_classer();


		   console.log(de);
		} else {
			// $('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
			//add_classer();			
			console.log('out drop');
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
	   		$(obj).data('stay', 'horizontal');
	   		$(obj).css({'width': size * 50 + 'px', 'height': '50px'});
	   		console.log(obj);
	   		console.log($(this).data('stay'));

			if (((size - 1) + pos_x) > 10) {
				console.log('no error horizont');
				err_message();
				setTimeout(function () {$(obj).css({'width': '50px', 'height': size * 50 + 'px'});}, 300);
				$(obj).data('stay', 'vertical');
				$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
				add_classer();				
				return -1;
			}
			if (horizontal_check(nbr, pos_x, pos_y, size) != 1) {
					console.log('error horizont');
				err_message();
				setTimeout(function () {$(obj).css({'width': '50px', 'height': size * 50 + 'px'});}, 300);
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
	   		$(obj).data('stay', 'vertical');
	   		$(obj).css({'width': '50px', 'height': size * 50 + 'px'});
	   		console.log(obj);
	   		console.log($(this).data('stay'));

			if (((size - 1) + pos_y) > 10) {
				console.log('no error vertical');
				err_message();
				setTimeout(function () {$(obj).css({'width': size * 50 + 'px', 'height': '50px'});}, 300);
				$(obj).data('stay', 'horizontal');
				add_classer();				
				return -1;
			}
			if (vertical_check(nbr, pos_x, pos_y, size) != 1) {
					console.log('error vertical');
				err_message();
				setTimeout(function () {$(obj).css({'width': size * 50 + 'px', 'height': '50px'});}, 300);
				$(obj).data('stay', 'horizontal');
				$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
				add_classer();
				return -1;
			}

			$('.wrap').find('[data-nbr="'+old_nbr+'"]').removeClass('no').addClass('yes');
			add_classer();	   		
	   }

	})


	/*Ships player_turn.php*/
	if ($('body').hasClass('player_turn')) {		
		add_classer();

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
						// Нужно Вернуть сюда количество кораблей, если 0 то нужно сделать ко. игры
						console.log('res: '+data);

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
												'<h2 data-heading="Successful">Successful</h2><h2 data-heading="Strike!!!">Strike!!!</h2>'+
											'</div>'+
										'</div>';
							$('.base-tmp').append(str);
							$('.ac-status').fadeOut(2000).remove();
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
								//window.location.href = '/enemy_turn.php';
							}, 1500);
							//console.log(myobj);
						}
					}
				});
			}
			$('.ac-wrapper').css('display','none');
			$('.ac-wrapper').find('.rem').remove();

		});	
	}






	/*Ships enemy_turn*/
		if ($('body').hasClass('enemy_turn')) {		
		$('.has_ship.yes').each(function() {
			var nbr = $(this).data('nbr');
			var stay = $(this).find('.dragg').data('stay');
			var size = $(this).find('.dragg').data('size');

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
		//
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

		//if (!sessionStorage.getItem("ship")) {}

		var myobj = $('body').find('[data-nbr="'+nbr+'"]');
		$.ajax({
			url:'playeract.php',
			data:{
				trg: nbr,
				act: 'enemy'
			},
			type:'POST',
			success:function(data) {
				// Нужно Вернуть сюда количество кораблей, если 0 то нужно сделать ко. игры
				console.log('res: '+data);
				if (data.localeCompare('miss')) {// later on hit))
					if (trg.west != 0 || trg.north != 0 || trg.east != 0 || trg.south != 0)
						trg.contact = 1;
					//if (trg.contact == 1) {
					// trg.nbr = trg.sec_nbr;
					// get_mas[trg.nbr - 1] == trg.nbr
					//}
					console.log('miss hehe');

					var trg = JSON.parse(sessionStorage.getItem("ship"));
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
										'<h2 data-heading="Successful">Successful</h2><h2 data-heading="Strike!!!">Strike!!!</h2>'+
									'</div>'+
								'</div>';
					$('.base-tmp').append(str);
					$('.ac-status').fadeOut(2000).remove();
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
						//window.location.href = '/enemy_turn.php';
					}, 1500);
					//console.log(myobj);
				}
			}
		});		
	}





	function add_coord() {
		var coord = '';
		$('.has_ship.yes').each(function() {
			//var pos_x = $(this).closest('ships-dock').data('pos_x');
			//var pos_y = $(this).closest('ships-dock').data('pos_y');
			var nbr = $(this).data('nbr');
			//var stay = $(this).find('.dragg').data('stay');
			//var size = $(this).find('.dragg').data('size');
			//console.log(pos_x);
			coord += nbr + ','; 
			console.log(nbr);
			// if (stay) {
			// 	if (stay.localeCompare('vertical') == 0) {
			// 		for (var i = size; i > 1; i--) {
			// 			var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size * 10))+'"]');
			// 			$(tmp).removeClass('no').addClass('yes');
			// 			//console.log(tmp[0]);
			// 		}
			// 	}
			// 	if (stay.localeCompare('horizontal') == 0) {
			// 		for (var i = size; i > 1; i--) {
			// 			var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size))+'"]');
			// 			$(tmp).removeClass('no').addClass('yes');
			// 			//console.log(tmp[0]);
			// 		}
			// 	}
			// }
		});
		return coord;
	}

	function add_type() {
		var types = '';

		$('.has_ship.yes').each(function() {
			var val = $(this).find('.dragg').data('type');
			if (val)
				types += val + ','; 
		});
		return types;
	}

	function add_stay() {
		var stays = '';

		$('.has_ship.yes').each(function() {
			var val = $(this).find('.dragg').data('stay');
			if (val)
				stays += val + ','; 
		});
		return stays;
	}

	/*Game actions index.php*/
	$('.next_action').on('click', function() {
		console.log("yep");
		if (!$('.next_action').hasClass('ok')) {
			$('.next_action').removeClass('ok');
			window.location.href = '/player_turn.php';
		}
	});

	$('.fleet').on('click', function() {
		console.log("fleet");
		if (!$('.fleet').hasClass('ok')) {
			$('.fleet').removeClass('ok');
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
				}
			});
			//window.location.href = '/player_turn.php';
		}
	});


})