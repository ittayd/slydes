jQuery(document).ready(function($){
	$(document).keydown(function(evt){
		switch (evt.which) {
			case 39: // right arrow
		    case 13: // Enter
		    case 32: // space
		    case 34: // PgDn
		      Slydes.presentation.to('.slydes-next-slide')
		      evt.preventDefault()
		      break;
	
		    case 37: // left arrow
		    case 8: // Backspace
		    case 33: // PgUp
			  Slydes.presentation.to('.slydes-previous-slide')
		      evt.preventDefault()
		      break

		}
	});
})
