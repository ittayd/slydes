define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        options = require('options')
        
    require("./lib/prettify");
    require("css!./lib/prettify.css");
    
    if (options.prettify) {
        var files = _.map(options.prettify, function(lang) {return "./lib/lang-" + lang + ".js"})
        require(files, function() {
            $(document).ready(prettyPring);
        })
    }
    
    return {}
    
});

/*
(function($){
	var prettify_base = Slydes.base + "../plugins/prettify/lib/"
	Slydes.loadScript(prettify_base + "prettify.js", function(){
		$(document).ready(prettyPrint)
	})
	Slydes.loadCss(prettify_base + "prettify.css")
	Slydes.prettify = function() {
		$.each(arguments, function(index, arg){
			Slydes.loadScript(prettify_base + "lang-" + arg + ".js")
		})
	}
	Slydes.prettify.apply(undefined, Array.from(Slydes.options.prettify))
})(jQuery)
*/