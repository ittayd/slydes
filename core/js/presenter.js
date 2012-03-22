define(function(require) {
	var $ = require('jquery'),
        __ = require('css!../css/reset'),
        __ = require('css!../css/main')
    
    function scale($elem, ratio) {
        function ratio_43(width, height) {
            var unit = Math.min(width / 4, height/ 3)
            return {
                width: Math.floor(unit * 4),
                height: Math.floor(unit * 3)
            }
        };
		var w = $(window).width(),
			h = $(window).height(),
			dimension = ratio_43(w, h),
			fit = ratio_43(w * (ratio === undefined ? 1 : ratio), h),
			scale = fit.width / dimension.width

		$elem.width(dimension.width)
		$elem.height(dimension.height)

		if (ratio === undefined || ratio == 1) {
			$elem.css({'-webkit-transform': ''})
		} else {
			$elem.css({'-webkit-transform': 'scale(' +  scale + ')',
						  '-webkit-transform-origin': 'left top'})
		}

	};
    
    return {
        initialize: function initialize(presentation) {
            $(presentation).trigger('before-render', presentation)
            
            var $rootElements = presentation.path.$rootElements(),
                $header = $('<script type="text/x-jquery-tmpl"></script>').append($('.slydes-header')),
				$footer = $('<script type="text/x-jquery-tmpl"></script>').append($('.slydes-footer'))

            
            $('body:not(:has(#slydes-container))').append('<div id="slydes-container"></div>')
            $rootElements.appendTo($('#slydes-container'))
            
   			$('body:not(:has(#slydes-sidebar))').append('<div id="slydes-sidebar"></div>')
			$('#slydes-sidebar:not(:has(#slydes-notes))').append('<div id="slydes-notes"></div>')

            $rootElements.each(function(index){
                var $element = $(this);
                var data = {
					index: index,
					total: presentation.path.length(),
					element: $element,
                    presentation: presentation
				}; 
                $element.prepend($header.tmpl(data));
				$element.append($footer.tmpl(data));
                  
            })
            
            
            $.extend(this, {
                $container: $('#slydes-container'),
                
                $header: $header,
				
                $footer: $footer,

				resize: function resize(){
					scale(this.$container, presentation.extendedMode ? 0.65 : undefined)
					$('body').css('font-size', this.$container.height() / 1000 + 'em')
				}

            });
            
            this.resize();
            
            delete this.initialize
            
            
        }
    }  
})