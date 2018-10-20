
$(document).ready(function () {
jQuery.fn.root = function() {
    // Root is always document so we have to 
    // go back to one before the last:
    var root = this;
    while(root.prevObject.prevObject) {
        root = root.prevObject;
    }
    return root;
};
	var stay, size, nbr, fit = null;
	$('.dragg').on("dragstart", function (event) {
		var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).attr('id'));
		stay = $(this).data('stay');
		size = $(this).data('size');
		//nbr = $(this).closest('td').data('nbr');
		//console.log(stay);
	});
	$('.ships-dock').on("dragenter dragover drop", function (event) {
		event.preventDefault();
		if (event.type === 'drop') {
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
			 	console.log('pos_y: '+pos_x);

			 if (stay.localeCompare('vertical') == 0) {
			 	if ($(fit).hasClass('no') == 1) {
			 		if (nbr > 10)
			 			var calc_n = $('.wrap').find('[data-nbr="'+(nbr - 10)+'"]');
			 		if ((nbr % 10) != 0)
			 			var calc_e = $('.wrap').find('[data-nbr="'+(nbr + 1)+'"]');
			 		if (nbr > 1 && pos_x > 1)
			 			var calc_w = $('.wrap').find('[data-nbr="'+(nbr - 1)+'"]');
			 		if ((nbr + (10 * (size - 1))) < 100) {
			 			nbr = (nbr + (10 * size)) > 99 ? -1 : nbr;
			 			console.log(nbr);
			 			if (nbr > 0)
			 				var calc_s = $('.wrap').find('[data-nbr="'+nbr+'"]');
			 		}
			 		console.log(calc_n);
			 		console.log(calc_e);
			 		console.log(calc_w);
			 		console.log(calc_s);
			 	}
			 }
			
		   var de = $('#' + data).detach();
		   // if (event.originalEvent.target.tagName === "DIV") {
			//    de.insertBefore($(event.originalEvent.target));
			//}
			//else {
				de.appendTo($(this));
		   // }
		};
	});


	/*Ships player_turn.php*/
	if ($('body').hasClass('player_turn')) {		
		$('.has_ship.yes').each(function() {
			var nbr = $(this).data('nbr');
			var stay = $(this).find('.dragg').data('stay');
			var size = $(this).find('.dragg').data('size');

			if (stay.localeCompare('vertical') == 0) {
				for (var i = size; i > 1; i--) {
					var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size * 10))+'"]');
					$(tmp).removeClass('no').addClass('yes');
					//console.log(tmp);
				}
			}
			if (stay.localeCompare('horizontal') == 0) {
				for (var i = size; i > 1; i--) {
					var tmp = $('.wrap').find('[data-nbr="'+(nbr + (--size))+'"]');
					$(tmp).removeClass('no').addClass('yes');
					//console.log(tmp);
				}
			}
			//console.log(stay);
			//console.log(this);
			//console.log($(this).data('nbr'));
		});

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








	/*Game actions index.php*/
	$('.next_action').on('click', function() {
		console.log("yep");
		if (!$('.next_action').hasClass('ok')) {
			$('.next_action').removeClass('ok');
			window.location.href = '/player_turn.php';
		}
	});


})