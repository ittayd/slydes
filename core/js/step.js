/**
 * A step is a transition in the presentation. Can be a slide or an effect within a slide (e.g., bullets showing on after the other)
 */
define(function(require) {
    var result = function Step(tree, path) {
        tree.elem.data('step', this)
        this.tree = tree
        this.path = path
        this.elem = tree.elem
        tree.elem.trigger('step', this)
    }
    
    return result;
})

/*
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
*/