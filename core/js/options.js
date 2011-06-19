jQuery.extend(Slydes, {
	options: (function() {
		
		var query = Slydes.script.src.replace(/^[^\?]+\??/,'')

		if (!query) {
			return {} // return empty object
		}
		
		return Slydes.parseQuery(query)
	})()
})

