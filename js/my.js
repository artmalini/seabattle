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

	/*Ships*/
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
	}


	/*Game actions index.php*/
	$('.next_action').on('click', function() {
		console.log("yep");
		if (!$('.next_action').hasClass('ok')) {
			$('.next_action').removeClass('ok');
			window.location.href = '/player_turn.php';
		}
	});

	/*Player_turn.php*/
	$('.ships-dock').on('click', function() {
		$('#ac-wrapper').css('display','block');
	});
	$('.next_close').on('click', function() {
		$('#ac-wrapper').css('display','none');
	});
	$('.next_cancel').on('click', function() {
		$('#ac-wrapper').css('display','none');
	});
})