Slydes.loadCss(Slydes.base + "../plugins/core-theme/main.css")

Slydes.loadScript(Slydes.base + "../lib/jquery-tmpl/jquery.tmpl.js")

jQuery('document').ready(function($){
	$('body:not(:has(#slydes-frame))').append('<div id="slydes-frame"></div>')
	$('#slydes-frame:not(:has(#slydes-strip))').append('<div id="slydes-strip"></div>')
	
	
	var frame = $('#slydes-frame'),
		strip = $('#slydes-strip'),
		header = $('<script type="text/x-jquery-tmpl"></script>').append($('.slydes-header')),
		footer = $('<script type="text/x-jquery-tmpl"></script>').append($('.slydes-footer'))
	
	function resize() {
		var dimension = Slydes.ratio_43($('#slydes-content').width(),$('#slydes-content').height())
		
		frame.height(dimension.height)
		frame.width(dimension.width)
	
		Slydes.presentation.slides.width(dimension.width).bind('current', function(other){
			strip.css('left', -($(this).slydes().index) * dimension.width)
		})
	}

	if (!frame.hasClass('slydes-preset')) {
		Slydes.ready(function(presentation){
			presentation.slides.each(function(index, element) {
				// var wrapper = jQuery('<div class="slydes-wrapper"></div>')
				element = $(element)
				var data = {
					index: index,
					total: presentation.slides.length,
					element: element
				} 
				element.prepend(header.tmpl(data))
//				wrapper.append($(element))
				element.append(footer.tmpl(data))
				return element[0]
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