(function($){
	var prettify_base = Slydes.base + "../plugins/prettify/lib/"
	Slydes.loadScript(prettify_base + "prettify.js", function(){prettyPrint();})
	Slydes.loadCss(prettify_base + "prettify.css")
	Slydes.prettify = function() {
		$.each(arguments, function(index, arg){
			Slydes.loadScript(prettify_base + "lang-" + arg + ".js")
		})
	}
	Slydes.prettify.apply(undefined, Slydes.options.prettify.asArray())
})(jQuery)