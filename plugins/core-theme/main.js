Slydes.loadCss(Slydes.base + "../plugins/core-theme/main.css")

jQuery('document').ready(function($){
	$('body:not(:has(#slydes-frame))').append('<div id="slydes-frame"></div>')
	$('#slydes-frame:not(:has(#slydes-strip))').append('<div id="slydes-strip"></div>')
	
	
	var frame = $('#slydes-frame'),
		strip = $('#slydes-strip') 
	
	
	if (!frame.hasClass('slydes-preset')) {
		var frameHeight = Math.floor($('body').height()),
			frameWidth = Math.floor(frameHeight * 4 / 3)
			
		frame.height(frameHeight)
		frame.width(frameWidth)
		
		Slydes.ready(function(presentation){
			presentation.slides.width(frameWidth)
			presentation.slides.appendTo(strip)
			frame.appendTo(presentation.content)
			strip.width(100 * presentation.slides.length + '%')
			Slydes.Slide.prototype.transition = function(from) {
				strip.css('left', -(this.index) * frameWidth)
			}
		})
	}
	
})