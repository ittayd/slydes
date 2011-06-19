/**
 * A model class representing the presentation 
 */
(function($) {
	var defer = $.Deferred()
	Slydes.Presentation = {
		ready: function(callback) {
			defer.promise().done(callback)
		},
		
		create: function(options) {
			var slides = $(".slyde")

			jQuery.extend(this, {
				current: slides[0],
			
				slides: slides,
				
				slideObjects: slides.map(function(index, element) {
					return new Slydes.Slide(index, element, options ? options.slide : undefined)
				}),
				
				transition: function(from, to) {
					from.exitFocus
					to.transition(from)
				},
				
				next: function() {
					var current = this.current
					var next = current.next()
					transition(current, next)
					current = next
					return current
				}
			
			}, options)
			
			defer.resolve(this)
		}
	}
	$.each(Slydes.readyCallbacks, function(i, c) {
		Slydes.Presentation.ready(c)
	})
	Slydes.ready = function(callback) {
		Slydes.Presentation.ready(callback)
	}
	$('document').ready(function(){Slydes.Presentation.create()})

})(jQuery)