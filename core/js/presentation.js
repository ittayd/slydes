/**
 * A model class representing the presentation 
 */
(function($) {
	var defer = $.Deferred()
	function scale(elem, ratio) {
		var dimension = Slydes.ratio_43($('body').width(), $('body').height()),
			fit = Slydes.ratio_43($('body').width() * ratio, $('body').height()),
			scale = fit.width / dimension.width
		
		elem.width(dimension.width)
		elem.height(dimension.height)
	
		elem.css({'-webkit-transform': 'scale(' + scale + ')',
					  '-webkit-transform-origin': 'left top'})
					  
	    return scale // yuck. needed to fix chrome bug when scaling iframes
	}

	Slydes.presentation = {
		ready: function(callback) {
			defer.promise().done(callback)
		},
		
		create: function(options) {
			var slides = $(".slyde").addClass('slydes-future'),
				presentation = this
			
			$('body:not(:has(#slydes-content))').append('<div id="slydes-content"></div>')
			slides.appendTo($('#slydes-content'))

			$('body:not(:has(#slydes-sidebar))').append('<div id="slydes-sidebar"></div>')
			

			jQuery.extend(this, {	
				extendedMode: false, 
				
				content: $('#slydes-content'), 
				
				sidebar: $('#slydes-sidebar'),
				
				slides: slides.each(function(index, element) {
					$(element).data('slydes', new Slydes.Slide(index, $(element), presentation, Slydes.options.slide))
				}),
				
				currentStep: slides.first().addClass('slydes-current'),
				
				transition: function(from, to) {
					from.exitFocus
					to.slydes().transition(from)
				},

				slide: function(arg,dryrun) {
					var current = this.current(),
						other

					if (typeof arg === 'number') {
						other = this.slides.eq(arg)
					} else switch (arg) {
					    case Slydes.control.nextSlide:
					    	other = this.slides.eq(current.slydes().index + 1)
					    	break
					    case Slydes.control.previousSlide:
					    	var newIndex = current.slydes().index - 1
					    	if (newIndex < 0) {
					    		return $()
					    	}
					    	other = this.slides.eq(newIndex)
					    	break
						case Slydes.control.start: 
							other = this.slides.first()
							break;
						case Slydes.control.end: 
							other = this.slides.last()
							break;
						default:    
							other = current.slydes().step(arg, dryrun)
					}

					if (dryrun === undefined || !dryrun) {
						this.current(other)
					}

					return other
				},
				
				current: function(other) {
					if (other === undefined) {
						return this.currentStep
					}
					
					if (other.length == 0) {
						return
					}

					var current = this.currentStep
					this.currentStep = other
					
					
					current.removeClass('slydes-current')
					current.slydes().step(Slydes.control.previous).removeClass('slydes-previous')
					current.slydes().step(Slydes.control.next).removeClass('slydes-next')
					
					var iter = current,
						forward = true 
					
					if (other.hasClass('slydes-past')) { // moved back
						// going backward
						forward = false
					}
					
					while (!iter.equals(other)) {
						iter.removeClass(forward ? 'slydes-future' : 'slydes-past')
						iter.addClass(forward ? 'slydes-past' : 'slydes-future')
						iter = iter.slydes().step(forward ? Slydes.control.next : Slydes.control.previous)
					}
					
					other.addClass('slydes-current')
					this.slides.removeClass('slydes-current-slide')
					if (other.slydes().constructor == Slydes.Slide) {
						other.addClass('slydes-current-slide')
					} else {
						other.slydes().slide.element.addClass('slydes-current-slide')
					}
					other.slydes().step(Slydes.control.previous, true).addClass('slydes-previous')
					other.slydes().step(Slydes.control.next, true).addClass('slydes-next')
					other.removeClass('slydes-past slydes-future slydes-previous slydes-next') // slydes-previous/slydes-next will happen if 'other' is the first/last step of the presentation

					current.trigger('past')
					other.trigger('current')

					this.syncCurrent(other)
				},
				
				before: function(slide) {
					if (slide.slydes().index == 0) {
						return slide
					} 
					return this.slides.eq(slide.slydes().index - 1)
				},
				
				after: function(slide) {
					if (slide.slydes().index == this.slides.length - 1) {
						return slide
					}
					return this.slides.eq(slide.slydes().index + 1)
				},
				
				toggleExtendedMode: function() {
					this.extendedMode = !this.extendedMode
					this.sidebar.toggleClass('slydes-sidebar-show')
					this.content.toggleClass('slydes-sidebar-show')
					if (this.preview) {
						
						this.preview.attr('src', this.extendedMode ? window.location.href : null)
						scale(this.content, this.extendedMode ? 0.65 : 1, 1)
//						if (this.extendedMode) {
//							
//							var that = this
//							this.preview.bind('load', function(){
//								that.previewSlydes = that.preview[0].contentWindow.Slydes
//		
//								that.previewSlydes.ready(function(presentation){
//									// if i do the next step immediately, then the css animation confuses chrome
//									that.sidebar.bind('webkitTransitionEnd', // opera - oTranstionEnd, firefox - transitioned
//											function(event) {
//												presentation.slide("nextStep")
//											}
//									)
//								})
//							})
//						}
					}
				},
				
				synced: function(synced) {
					if (Slydes.worker) {
						if (synced) {
							Slydes.worker.port.start()
							Slydes.worker.port.postMessage({events:true})
						} else {
							Slydes.worker.port.close() // doesn't seem to work
							Slydes.worker.port.removeEventListener('message', this.__workerListener, false)
						}
					}
				},
				
				handleSync: function(data) {
					if (data.current) {
						this.current($(data.current.selector))
					} else if (data.events) {
						this.handleSync(data.events[data.events.length - 1])
					} else {				
						console.error("unknown event: " + data)
					}
				},
				
				sendSync: function(data) {
					if (Slydes.worker) Slydes.worker.port.postMessage(data)
				},
				
				syncCurrent: function(current) {
					this.sendSync({
						current: {
							type: current.slydes().constructor.name,
							selector: current.selector
						}
					})

				},
				
				__workerListener: function(event){
					Slydes.presentation.handleSync(event.data)
				}
				
				

			}, options)

			Slydes.worker.create(this.__workerListener)
			if (Slydes.worker) {
				$('#slydes-sidebar:not(:has(#slydes-preview))').append('<iframe id="slydes-preview">preview</iframe>')
				this.preview =  $('#slydes-preview')
				var scalex = scale(this.preview, 0.35) // the width ratio in the CSS
				// fix wierd bug in chrome (12). it scales correctly, but clips the content in the amount of scale.
				// so need to make the iframe larger so the clipping is done on an empty space
				// need to put in div to be able to draw borders correctly
				var div = $('<div id="slydes-preview-wrapper"></div>')
				$('#slydes-sidebar').append(div)
				this.preview.appendTo(div)
				div.height(this.preview.height() * scalex)
				div.css({overflow: 'hidden'})
				this.preview.height(this.preview.height() / scalex)

			}
			this.current(this.slides.first())
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