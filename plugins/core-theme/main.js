Slydes.loadCss(Slydes.base + "../plugins/core-theme/main.css")

jQuery('document').ready(function($){
	$('body:not(:has(#slydes-frame))').append('<div id="slydes-frame"></div>')
	$('#slydes-frame:not(:has(#slydes-strip))').append('<div id="slydes-strip"></div>')
	
	
	var frame = $('#slydes-frame'),
		strip = $('#slydes-strip'),
		header = $('.slydes-header').detach(),
		footer = $('.slydes-footer').detach()
	
	
	if (!frame.hasClass('slydes-preset')) {
		var frameHeight = Math.floor($('body').height()),
			frameWidth = Math.floor(frameHeight * 4 / 3)
			
		frame.height(frameHeight)
		frame.width(frameWidth)
		
		Slydes.ready(function(presentation){
			presentation.slides.width(frameWidth)
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
			Slydes.Slide.prototype.transition = function(from) {
				strip.css('left', -(this.index) * frameWidth)
			}
			
			presentation.slides.find('>:first-child').before(header.clone())
			presentation.slides.append(footer.clone())
		})
	}
	
})