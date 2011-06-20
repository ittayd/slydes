/**
 * A model class representing the presentation 
 */
(function($) {
	var defer = $.Deferred()
	Slydes.presentation = {
		ready: function(callback) {
			defer.promise().done(callback)
		},
		
		create: function(options) {
			var slides = $(".slyde")

			jQuery.extend(this, {		
				slides: slides,
				
				slideObjects: slides.map(function(index, element) {
					return new Slydes.Slide(index, element, options ? options.slide : undefined)
				}),
				
				transition: function(from, to) {
					from.exitFocus
					to.slyde().transition(from)
				},
				
				to: function(arg) {
					var other = typeof arg === "number" ? $(slides[arg]) : slides.filter(arg)
					if (other.length > 0) {
						this.transition(this.current, other)
						this.setCurrent(other)
					}
					return other
				},
				
				setCurrent: function(slide) {
					if (this.current) {
						this.current.removeClass("slydes-current-slide")
						var index = this.current.slyde().index
						$(slides[index-1]).removeClass("slydes-previous-slide")
						$(slides[index+1]).removeClass("slydes-next-slide")
					}
					this.current = slide
					this.current.addClass("slydes-current-slide")
					var index = this.current.slyde().index
					$(slides[index-1]).addClass("slydes-previous-slide")
					$(slides[index+1]).addClass("slydes-next-slide")
				}
				
				

			}, options)
			
			this.setCurrent(this.slides.first())
			defer.resolve(this)
		}
	}
	$.each(Slydes.readyCallbacks, function(i, c) {
		Slydes.presentation.ready(c)
	})
	Slydes.ready = function(callback) {
		Slydes.presentation.ready(callback)
	}
	$('document').ready(function(){Slydes.presentation.create()})

})(jQuery)