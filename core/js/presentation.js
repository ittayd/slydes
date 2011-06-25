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

				__slide: function(arg, sync) {
					var current = this.current
					
					if (!this.slave && (sync === undefined || sync)) this.sendSync({slide: arg})
					if (this.presenterMode) this.previewSlydes.presentation.slide(arg)

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
					}
					
					return other
				},
				
				slide: function(arg, sync) {
					var current = this.current
					var other = this.__slide(arg, sync)
					if (other.length > 0) {
						current.trigger('past')
						other.trigger('focused')
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
	
							that.previewSlydes.ready(function(presentation){
								presentation.slave = true
								presentation.slide("nextStep")
							})
						})
					}
				},
				
				synced: function(synced) {
					if (Slydes.worker.port) {
						if (synced) {
							Slydes.worker.port.start()
							Slydes.worker.port.postMessage({events:true})
						} else {
							Slydes.worker.port.close() // doesn't seem to work
							Slydes.worker.port.onmessage = null
						}
					}
				},
				
				handleSync: function(data) {
					if (data.slide) {
						this.slide(data.slide, false)
					} else if (data.events) {
						for (var i = 0, len = data.events.length; i < len; i++) {
							if (data.events[i].slide) this.handleSync(data.events[i]) // go through the slide transitions (only)
						}
						if (this.slave) this.synced(false) // stop receiving events after initial sync
					} else {				
						console.error("unknown event: " + data)
					}
				},
				
				sendSync: function(data) {
					if (Slydes.worker.port) Slydes.worker.port.postMessage(data)
				}
				
				

			}, options)

			Slydes.worker.create(function(event){Slydes.presentation.handleSync(event.data)})
			this.setCurrent(this.slides.first())
			this.synced(true)

			defer.resolve(this, $)
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