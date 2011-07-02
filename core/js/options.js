jQuery.extend(Slydes, {
	options: (function() {
		
		var query = Slydes.script.src.replace(/^[^\?]+\??/,'')

		return jQuery.extend({}, Slydes.parseQuery(), Slydes.parseQuery(query))
	})()
})

