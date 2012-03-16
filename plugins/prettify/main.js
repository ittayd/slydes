define(function(require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        utils = require('utils'),
        options = require('options')
        
    require("./lib/prettify");
    require("css!./lib/prettify.css");
    
    if (options.prettify) {
        var base = utils.parentDir(module.uri), 
            files = _.map(utils.array(options.prettify), function(lang) {return base + "lib/lang-" + lang + ".js"})
        
        require(files, function() {
            $(document).ready(prettyPrint);
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