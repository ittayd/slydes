/**
 * A step is a transition in the presentation. Can be a slide or an effect within a slide (e.g., bullets showing on after the other)
 */
(function($){
	Slydes.Step = function Step(index, element, slide, options) {
		$.extend(this, {
			index: index,
			element: element,
			slide: slide
		})
	}
	
	Slydes.Step.prototype = {
		step: function(arg) {
			switch (arg) {
				case Slydes.control.next: 
					return this.slide.after(this.element)
				case Slydes.control.previous:
					return this.slide.before(this.element)
			}
		}	
	}
	
	Slydes.Step.prototype.constructor = Slydes.Step
})(jQuery)