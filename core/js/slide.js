/**
 * Model class representing a slide
 */

/*
(function($){
	Slydes.Slide = function Slide(index, element, presentation, options) {
		var slide = this,
			stepsReg = {}
		
		jQuery.extend(this, {
			element: element,
			
			index: index,
			
			presentation: presentation,
			
			name: element.children("h1").length ? element.children("h1").text() : index.toString(),
					
			steps: element.find(".slydes-step").addClass('slydes-future').each(function(index, element){
				element = $(element)
				var stepId = element.attr('step-id'),
					step
				if (stepId) {
					var prev = stepsReg[stepId]
					if (prev) {
						prev.element = prev.element.add(element)
						step = prev
						
					} else {
						step = new Slydes.Step(index, element, slide)
						stepsReg[stepId] = step
					}
				} else {
					step = new Slydes.Step(index, element, slide)
				}	
					
				element.data('slydes', step)
			})
			
		}, options)
		
	};
	
	Slydes.Slide.prototype = {
		step: function(arg) {
			switch (arg) {
				case Slydes.control.next: 
					if (this.steps.length == 0) {
						return this.presentation.after(this.element)
					}
					
					return this.steps.first()
				case Slydes.control.previous: 
					var prevSlide = this.presentation.before(this.element)
					if (prevSlide.slydes().steps.length == 0) {
						return prevSlide
					}
					return prevSlide.slydes().steps.last()
			}
		}, 
		
		after: function(step) {
			if (step.slydes().index == this.steps.length - 1) {
				var candidate = this.presentation.after(this.element)
				if (candidate.slydes() == this) {
					return step
				}
				return candidate
			}
			return this.steps.eq(step.slydes().index + 1)
		},
		
		before: function(step) {
			if (step.slydes().index == 0) {
				return this.element
			}
			return this.steps.eq(step.slydes().index - 1)
		},
		
		toString: function() {
			return "#" + this.index + (this.name != this.index ? "(" + this.name + ") " : " ") + this.element 
		}
	}
	
	Slydes.Slide.prototype.constructor = Slydes.Slide
	

})(jQuery)
*/