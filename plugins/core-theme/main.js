Slydes.loadCss(Slydes.base + "../plugins/core-theme/main.css")

jQuery('document').ready(function($){
	$('body:not(:has(#slydes-frame))').append('<div id="slydes-frame"></div>')
	$('#slydes-frame:not(:has(#slydes-strip))').append('<div id="slydes-strip"></div>')
	
	
	var frame = $('#slydes-frame'),
		strip = $('#slydes-strip'),
		header = $('.slydes-header').detach(),
		footer = $('.slydes-footer').detach()
	
	function resize() {
		var dimension = Slydes.ratio_43($('#slydes-content').width(),$('#slydes-content').height())
		
		frame.height(dimension.height)
		frame.width(dimension.width)
	
		Slydes.presentation.slides.width(dimension.width)
		
		Slydes.Slide.prototype.transition = function(from) {
			strip.css('left', -(this.index) * dimension.width)
		}
	}

	if (!frame.hasClass('slydes-preset')) {
		Slydes.ready(function(presentation){
			presentation.slides.map(function(index, element) {
				var wrapper = jQuery('<div class="slydes-wrapper"></div>')
				wrapper.append(header.clone())
				wrapper.append($(element))
				wrapper.append(footer.clone())
				return wrapper[0]
			}).appendTo(strip)
			
			frame.appendTo(presentation.content)
//			frame.append(header)
//			frame.append(footer)
			strip.width(100 * presentation.slides.length + '%')
			
//			presentation.slides.find('>:first-child').before(header.clone())
//			presentation.slides.append(footer.clone())

			resize()
			$(window).bind('resize', resize)
		})
	}
	
})