(function($){
	Slydes.control = {}
	
	$.each(["next", "previous", "nextSlide", "previousSlide", "start", "end"], function(index, key) {
		Slydes.control[key] = key
	})
	
	$(document).ready(function($){
		$(document).keydown(function(evt){
			switch (evt.which) {
				case 39: // right arrow
			    case 13: // Enter
			    case 32: // space
			    case 34: // PgDn
			      Slydes.presentation.slide(Slydes.control.next)
			      evt.preventDefault()
			      break;
		
			    case 37: // left arrow
			    case 8: // Backspace
			    case 33: // PgUp
				  Slydes.presentation.slide(Slydes.control.previous)
			      evt.preventDefault()
			      break
			    case 80: // 'p'
			      Slydes.presentation.toggleExtendedMode()
	
			}
		});
	})
})(jQuery)