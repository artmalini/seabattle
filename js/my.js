$(document).ready(function () {
	$('.dragg').on("dragstart", function (event) {
		var dt = event.originalEvent.dataTransfer;
		dt.setData('Text', $(this).attr('id'));
		//console.log(dt);
	});
	$('.ships-dock').on("dragenter dragover drop", function (event) {
		event.preventDefault();
		if (event.type === 'drop') {
			var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
			 console.log(data);
			
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
						target: trg
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
				var mas = [];
				for (var i = 1; i < 101; i++) {
					mas.push(i);
				}
				sessionStorage.setItem("cells", mas)
			}
		}
		//localStorage.removeItem("cells");
		//
		//var get_mas = sessionStorage.getItem("cells")
		// var num = Math.floor(Math.random() * get_mas.length);
		// var roll = get_mas.splice(num, 1);
		// var nbr = roll[0];
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