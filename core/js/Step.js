/**
 * A step is a transition in the presentation. Can be a slide or an effect within a slide (e.g., bullets showing on after the other)
 */
define(function(require) {
    var $ = require('jquery')
    
    var result = function Step(tree, geneology) {
        tree.elem.data('step', this)
        this.tree = tree
        this.geneology = geneology
        this.elem = tree.elem
        tree.elem.trigger('step', this)
    }
    
    function setClass(cls) {
        this.elem.removeClass('current past future')
        this.geneology.removeClass('current-path past-path future-path')
        this.elem.addClass(cls);
        this.geneology.addClass(cls + '-path');
    }
    
    $.extend(result.prototype, {
        current: function current() {
            setClass.call(this, 'current');
        },
        pasg: function past() {
            setClass.call(this, 'past');
        },
        future: function future() {
            setClass.call(this, 'future');
        }
    })
    
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