/**
 * A model class representing the presentation 
 */
define(function(require) {
    var $ = require('jquery'),
        Tree = require('Tree'),
        Path = require('Path')

    $.extend(Slydes.presentation, {
        initialize: function initialize() {
            var tree = new Tree(document)
                
            $(Slydes.presentation).trigger('tree', tree); 
            
            var path = new Path(tree);
                        
            $(Slydes.presentation).trigger('path', path); 
            
            delete(Slydes.presentation.initialize);
            
            $.extend(Slydes.presentation, {
                tree: tree,
                
                path: path,
            })  
            
            $(Slydes.presentation).trigger('ready', Slydes.presentation)
            
        }
    })

  return Slydes.presentation
})

// http://jsfiddle.net/KJP4y/

/*
(function($) {
	var defer = $.Deferred()
	function scale(elem, ratio) {
		var w = $(window).width(),
			h = $(window).height(),
			dimension = Slydes.ratio_43(w, h),
			fit = Slydes.ratio_43(w * (ratio === undefined ? 1 : ratio), h),
			scale = fit.width / dimension.width

		elem.width(dimension.width)
		elem.height(dimension.height)

		if (ratio === undefined || ratio == 1) {
			elem.css({'-webkit-transform': ''})
		} else {
			elem.css({'-webkit-transform': 'scale(' +  scale + ')',
						  '-webkit-transform-origin': 'left top'})
		}
		console.log(elem[0].tagName + ": " + scale)
	}

	Slydes.presentation = {
		ready: function(callback) {
			defer.promise().done(callback)
		},
		
		create: function(options) {
			var slides = $(".slyde").addClass('slydes-future'),
				presentation = this,
				header = $('<script type="text/x-jquery-tmpl"></script>').append($('.slydes-header')),
				footer = $('<script type="text/x-jquery-tmpl"></script>').append($('.slydes-footer'))
				
			$('body:not(:has(#slydes-content))').append('<div id="slydes-content"></div>')
			slides.appendTo($('#slydes-content'))

			$('body:not(:has(#slydes-sidebar))').append('<div id="slydes-sidebar"></div>')
			$('#slydes-sidebar:not(:has(#slydes-notes))').append('<div id="slydes-notes"></div>')
			
			slides.each(function(index, element) {
				element = $(element)
				var data = {
					index: index,
					total: slides.length,
					element: element
				} 
				element.prepend(header.tmpl(data))
				element.append(footer.tmpl(data))
			})


			jQuery.extend(this, {	
				options: options, 
				
				extendedMode: false, 
				
				content: $('#slydes-content'), 
				
				sidebar: $('#slydes-sidebar'),
				
				slides: slides.each(function(index, element) {
					$(element).data('slydes', new Slydes.Slide(index, $(element), presentation, Slydes.options.slide))
				}),
				
				currentStep: slides.first().addClass('slydes-current'),
				
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
					this.getSlide(other).addClass('slydes-current-slide')
					other.slydes().step(Slydes.control.previous, true).addClass('slydes-previous')
					other.slydes().step(Slydes.control.next, true).addClass('slydes-next')
					other.removeClass('slydes-past slydes-future slydes-previous slydes-next') // slydes-previous/slydes-next will happen if 'other' is the first/last step of the presentation

					if (this.extendedMode) {
						this.showNotes(this.getSlide(other))
					}
					
					function trigger(target, type, other) {
						var e = jQuery.Event(type)
						e.stopPropagation() // otherwise, a slide will also catch events of a step...
						target.trigger(e, other)
					}
					trigger(current, forward ? 'past' : 'future', other)
					trigger(other, 'current', current)
					var encoded = this.encodeStep(other)
					location.hash = encoded.slide + (encoded.step === undefined ? "" :  "." + encoded.step)
					if (!this.options.preview) {
						this.syncCurrent(other)
					}
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
						var previewUrl = location.href.substring(0, location.href.length - location.hash.length) + (location.search.length == 0 ? "?" : "&") + "preview=true" + (location.hash ? location.hash : "")
						this.preview.attr('src', this.extendedMode ? previewUrl : null)
						this.resize()
					}
					if (this.extendedMode) {
						this.showNotes(this.getSlide())
					}
				},

				showNotes: function(element) {
					var notes = this.sidebar.children('#slydes-notes')
					notes.children().remove()
					notes.append(element.children('.slydes-notes').clone())
				},
				
				getSlide: function(element) {
					element = element || this.currentStep
					return element.slydes().constructor == Slydes.Slide ? element : element.slydes().slide.element
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
				
				decodeStep: function(slide, step) {
					var slide = this.slides.eq(parseInt(slide))
					return step === undefined ? slide : slide.slydes().steps.eq(parseInt(step))
				},
				
				encodeStep: function(step) {
					return {
						type: step.slydes().constructor.name,
						slide: step.slydes().slide ? step.slydes().slide.index : step.slydes().index,
						step: step.slydes().slide ? step.slydes().index : undefined
					}
				},
				
				handleSync: function(data) {
					if (data.current) {
						var step = this.decodeStep(data.current.slide, data.current.step)
							current = this.options.preview ? step.slydes().step(Slydes.control.next) : step
						this.current(current, false)
					} else if (data.events) {
						if (data.events.length > 0) {
							this.handleSync(data.events[data.events.length - 1])
						}
					} else {				
						console.error("unknown event: " + data)
					}
				},
				
				sendSync: function(data) {
					if (Slydes.worker) Slydes.worker.port.postMessage(data)
				},
				
				syncCurrent: function(current) {
					this.sendSync({current: this.encodeStep(current)})

				},
				
				__workerListener: function(event){
					Slydes.presentation.handleSync(event.data)
				},
				
				resize: function(){
					scale(presentation.content, presentation.extendedMode ? 0.65 : undefined)
					$('body').css('font-size', presentation.content.height() / 1000 + 'em')
				}

				
				

			}, options)

			Slydes.worker = Slydes.Worker.create(this.__workerListener)
			if (Slydes.worker) {
				$('#slydes-sidebar:not(:has(#slydes-preview))').prepend('<div><iframe id="slydes-preview">preview</iframe></div>')
				this.preview =  $('#slydes-preview')
				this.preview.parent().height($('#slydes-sidebar').height() / 2)
				scale(this.preview, 0.30)
				var m = $('body').width() * 0.05 / 2
				this.preview.css({'margin-left' : m})
				this.synced(true)
			}
			
			this.slides.appendTo(this.content)
			$(window).bind('resize', this.resize)
			this.resize()

			var idx = (location.hash.substring(1) || "0").split("."),
				step = this.decodeStep(idx[0], idx[1])

			this.current(this.slides.first()) // init classes before 'ready' event
			defer.resolve(this, $)

			this.current(step)
			
		}
	}
	$.each(Slydes.readyCallbacks, function(i, c) {
		Slydes.presentation.ready(c)
	})
	Slydes.ready = function(callback) {
		Slydes.presentation.ready(callback)
	}
	Slydes.loadScript(Slydes.base + "../lib/jquery-tmpl/jquery.tmpl.js")

	$('document').ready(function(){Slydes.presentation.create(Slydes.options)})

})(jQuery)
*/