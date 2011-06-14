/**
 * Misc. utilities. Some of these are required before loading the jquery support
 */
Slydes = $.extend(Slydes, {
	parseQuery: function(first, second) {
		var query = typeof first === 'string' ? first : window.location.search, 
			options = (typeof first === 'object' && typeof second === 'undefined') ? first : second, 
			options = $.extend({convert: function(v){return v;}}, options), 
			params = {}
			
		$.each(query.match(/^\??(.*)$/)[1].split('&'), function(i, pair){
			var keyval = pair.split('=')
			keyval[0] = unescape(keyval[0])
			keyval[1] = $.map(unescape(keyval[1]).replace(/\+/g, ' ').split(','), options.convert)
			if (params[keyval[0]] === undefined) {
				params[keyval[0]] = keyval[1].length == 1 ? keyval[1][0] : keyval[1]
			} else {
				params[keyval[0]] = (Array.isArray(params[keyval[0]]) ? params[keyval[0]] : [params[keyval[0]]]).concat(keyval[1])
			}
		})
		return params;
	} 
})
