define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        ignoredAttrs = ['src', 'type'],
        slydes = slydes || {}

    var attrs = {}
    _.each(Slydes.script.attributes, function(attr) {
        if(!_.contains(ignoredAttrs, attr.name)) {
            attrs[attr.name] = attr.value;
        }
    });
    return $.extend({// defaults
        plugins: ["core-theme", "prettify"],
        stepSelectors: [".slyde", ".slydes-step"]
    }, slydes, attrs)
})
// jQuery.extend(Slydes, {
//	options: (function() {
		
//		var query = Slydes.script.src.replace(/^[^\?]+\??/,'')

//		return jQuery.extend({}, Slydes.parseQuery(), Slydes.parseQuery(query))
//	})()
//})

	
//Array.from = function (val) {
//	return (val === undefined ? [] : (Array.isArray(val) ? val : [val]))
//}
