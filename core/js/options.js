jQuery.extend(Slydes, {
	options: (function() {
		
		var query = Slydes.script.src.replace(/^[^\?]+\??/,'')

		return jQuery.extend({}, Slydes.parseQuery(), Slydes.parseQuery(query))
	})()
})

	
String.prototype.asArray = function() {
	return [this]
}

Array.prototype.asArray = function() {
	return this
}
