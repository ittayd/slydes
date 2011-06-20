/**
 * Model class representing a slide
 */
(function($){
	Slydes.Slide = function(index, element, options) {
		element = $(element)
		element.data("slydes.slide", this)
		jQuery.extend(this, {
			element: element,
			
			index: index,
			
			name: element.children("h1").length ? element.children("h1").text() : index.toString()
		}, options)
		
	}
	
	Slydes.Slide.prototype = {
		transition: function(from) {
			alert('todo')
		},
		
		toString: function() {
			return "#" + this.index + (this.name != this.index ? "(" + this.name + ") " : " ") + this.element 
		}

	}
	
	$.fn.slydes = function() {
		return this.map(function(){
           return $(this).data('slydes.slide')
		})
	}
	
	$.fn.slyde = function(arg) {
		var index = arg || 0
		return $(this[index]).data('slydes.slide')
	}

})(jQuery)
