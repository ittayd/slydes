define(function(require) {
    var $ = require('jquery'),
        slydes = slydes || {}
    
    return $.extend({// defaults
        plugins: ["core-theme", "prettify"]
    }, slydes)
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
