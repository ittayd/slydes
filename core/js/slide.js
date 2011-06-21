/**
 * Model class representing a slide
 */
(function($){
	Slydes.Slide = function(index, element, options) {
		element = $(element)
		jQuery.extend(this, {
			element: element,
			
			index: index,
			
			name: element.children("h1").length ? element.children("h1").text() : index.toString(),
					
			steps: element.find(".slydes-step").addClass('slydes-future-step').each(function(index, element){
				$(element).data('slydes', new Slydes.Step(index, element)).addClass("slydes-future-step")
			}),
			
			nextStep: 0
		}, options)
		
	};
	
	Slydes.Slide.prototype = {
		step: function(arg) {
			
			if (arg == Slydes.control.nextStep) {
				if (this.nextStep == this.steps.length) {
					return $()
				}
				return $(this.steps[this.nextStep++]).removeClass('slydes-future-step').addClass('slydes-past-step')
			}
			
			if (arg == Slydes.control.prevStep) {
				if (this.nextStep == 0) {
					return $()
				}
				return $(this.steps[--this.nextStep]).removeClass('slydes-past-step').addClass('slydes-future-step')
			}
		}, 
		
		toString: function() {
			return "#" + this.index + (this.name != this.index ? "(" + this.name + ") " : " ") + this.element 
		}
	}
	

})(jQuery)
