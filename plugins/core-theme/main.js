Slydes.loadCss(Slydes.base + "../plugins/core-theme/main.css")

jQuery('document').ready(function($){
	$('body:not(:has(#slydes-frame))').append('<div id="slydes-frame"></div>')
	$('#slydes-frame:not(:has(#slydes-strip))').append('<div id="slydes-strip"></div>')
	
	
	var frame = $('#slydes-frame'),
		strip = $('#slydes-strip') 
	
	
	if (!frame.hasClass('slydes-preset')) {
		var frameHeight = $('body').height(),
			frameWidth = frameHeight * 4 / 3
		frame.height(frameHeight)
		frame.width(frameWidth)
		Slydes.ready(function(presentation){
			presentation.slides.width(frameWidth)
			presentation.slides.appendTo(strip)
		})
	}
	
})