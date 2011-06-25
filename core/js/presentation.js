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
			var slides = $(".slyde").addClass('slydes-future-slide'), 
				controlToSelector = {
					nextSlide: ".slydes-next-slide",
					prevSlide: ".slydes-previous-slide",
					start: 0,
					end: slides.length - 1
				}
			
			$('body:not(:has(#slydes-content))').append('<div id="slydes-content"></div>')
			slides.appendTo($('#slydes-content'))

			$('body:not(:has(#slydes-sidebar))').append('<div id="slydes-sidebar">sidebar</div>')
			$('#slydes-sidebar:not(:has(#slydes-preview))').append('<iframe id="slydes-preview">preview</iframe>')

			jQuery.extend(this, {	
				presenterMode: false, 
				
				content: $('#slydes-content'), 
				
				preview: $('#slydes-preview'),
				
				sidebar: $('#slydes-sidebar'),
				
				slides: slides.each(function(index, element) {
					$(element).data('slydes', new Slydes.Slide(index, element, Slydes.options.slide))
				}),
				
				transition: function(from, to) {
					from.exitFocus
					to.slydes('.').transition(from)
				},
				
				slide: function(arg, sync) {
					var current = this.current
					
					if (!sync) this.sendSync({slide: arg})
					if (arg == Slydes.control.nextStep || arg == Slydes.control.prevStep) {
						var step = current.slydes('.').step(arg)
						if (step.length) {
							return step
						}
						arg = arg == Slydes.control.nextStep ? Slydes.control.nextSlide : Slydes.control.prevSlide
					}

					var	selector = controlToSelector[arg],
						other = typeof selector === "number" ? $(slides[selector]) : slides.filter(selector)

					if (other.length > 0) {
						this.transition(current, other)
						this.setCurrent(other)
						if (this.presenterMode) {
							if (arg == Slydes.control.nextSlide && other.slydes('.').index < slides.length - 1) {
								this.previewSlydes.presentation.slide(arg)
							}
							if (arg == Slydes.control.prevSlide && other.slydes('.').index > 0) {
								this.previewSlydes.presentation.slide(arg)
							}
						}
					}
					
					return other
				},
				
				setCurrent: function(slide) {
					if (this.current) {
						this.current.removeClass("slydes-current-slide")
						var index = this.current.slydes('.').index
						$(slides[index-1]).removeClass("slydes-previous-slide")
						$(slides[index+1]).removeClass("slydes-next-slide")
						
						// iterate from index to slideIndex (both forward and backward) and change the classes in between
						var slideIndex = slide.slydes('.').index,
							sign = slideIndex > index ? 1 : -1,
							oldcls = sign == 1 ? 'slydes-future-slide' : 'slydes-past-slide',
							newcls = sign == 1 ? 'slydes-past-slide' : 'slydes-future-slide',
							span = (slideIndex - index) * sign
								
						for(var i = 0, j = 0; i < span; i++, j = i * sign) {
							$(slides[j + index]).removeClass(oldcls).addClass(newcls)
						}
					}
					
					this.current = slide
					this.current.addClass("slydes-current-slide")
					this.current.removeClass("slydes-past-slide")
					this.current.removeClass("slydes-future-slide")
					var index = this.current.slydes('.').index
					$(slides[index-1]).addClass("slydes-previous-slide")
					$(slides[index+1]).addClass("slydes-next-slide")
				},
				
				togglePresenterMode: function() {
					this.presenterMode = !this.presenterMode
					this.sidebar.toggleClass('slydes-sidebar-show')
					this.content.toggleClass('slydes-sidebar-show')
					this.preview.attr('src', this.presenterMode ? window.location.href : null)
					if (this.presenterMode) {
						var that = this
						this.preview.bind('load', function(){
							that.previewSlydes = that.preview[0].contentWindow.Slydes
							that.previewSlydes.controlled(true) // we don't want the preview to get all events, just the ones that we want
	
							that.previewSlydes.ready(function(presentation){
								presentation.slide("nextSlide")
							})
						})
					}
				},
				
				synced: function(synced) {
					if (Slydes.worker.port) {
						if (synced) {
							Slydes.worker.port.start()
						} else {
							Slydes.worker.port.close()
						}
					}
				},
				
				handleSync: function(data) {
					if (data.slide) {
						this.slide(data.slide, true)
					}
				},
				
				sendSync: function(data) {
					Slydes.worker.port.postMessage(data)
				}
				
				

			}, options)

			Slydes.worker.create(function(event){Slydes.presentation.handleSync(event.data)})
			
			this.synced(true)
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