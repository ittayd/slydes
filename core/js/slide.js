/**
 * Model class representing a slide
 */
(function($){
	Slydes.Slide = function(index, element, options) {
		$(element).data("slydes.slide", this)
		jQuery.extend(this, {
			element: element,
			
			index: index,
			
			name: element.name ? element.name : index.toString(),
					
			nextSlide: function() {
				var length = Slydes.Presentation.slides.length
				for (var i = index + 1; i < length; i++) {
					var candidate = Slydes.Presentation.slides[i] 
					if (!candidate.hidden) {
						return candidate
					}
				}
			},

			next: function() {
				nextSlide()
			}, 
			
			transition: function(from) {
				alert('todo')
			},
			
			toString: function() {
				return "#" + this.index + (this.name != this.index ? "(" + this.name + ") " : " ") + this.element 
			}
		
			
		}, options)
	}
	
	$.fn.slydes = function(callback) {
		return this.each(function(){
           var element = $(this)
          
           // Return early if this element already has a plugin instance
           var slide = element.data('slydes.slide')
           if (slide === undefined) {
        	   alert(element + " is not recognized as a slide. Set 'slyde' in the class attribute")
        	   return
           }
           
           callback(slide)
		})
	}
})(jQuery)