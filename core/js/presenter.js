define(function(require) {
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
            
            delete this.initialize
            
            
        }
    }  
})