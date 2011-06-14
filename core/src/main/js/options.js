jQuery.extend(Slydes, {
	options: (function() {
		
		var query = slydes.src.replace(/^[^\?]+\??/,'')

		var options = {}
		
		if (!query) {
			return options // return empty object
		}
		
		var pairs = query.split(/[;&]/)
		
		for ( var i = 0; i < pairs.length; i++ ) {
			var split = pairs[i].split('=')
			if (!split || split.length != 2 ) {
				console.log(pairs[i] + " doesn't look like a key=value pair");
				continue;
			}
		  
			var key = unescape(split[0])
			var val = unescape(split[1])
			val = val.replace(/\+/g, ' ')
			val = val.split(',')
			if(!options[key]) {
				options[key] = val
			} else {
				if (!Array.isArray(options[key])) {
					options[key] = [options[key]]
				}
				options[key] = options[key].concat(val)
			}
	   }
	   return options;
	})()
}
