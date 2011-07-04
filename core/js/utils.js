/**
 * Misc. utilities. Some of these are required before loading the jquery support
 */
Slydes = jQuery.extend(Slydes, {
	parseQuery: function(first, second) {
		var query = typeof first === 'string' ? first : window.location.search, 
			options = (typeof first === 'object' && typeof second === 'undefined') ? first : second, 
			options = jQuery.extend({convert: function(v){return v;}}, options), 
			params = {}
			
		jQuery.each(query.match(/^\??(.*)$/)[1].split('&'), function(i, pair){
			var keyval = pair.split('=')
			keyval[0] = unescape(keyval[0])
			keyval[1] = jQuery.map(unescape(keyval[1]).replace(/\+/g, ' ').split(','), options.convert)
			if (params[keyval[0]] === undefined) {
				params[keyval[0]] = keyval[1].length == 1 ? keyval[1][0] : keyval[1]
			} else {
				params[keyval[0]] = (Array.isArray(params[keyval[0]]) ? params[keyval[0]] : [params[keyval[0]]]).concat(keyval[1])
			}
		})
		return params;
	},
	
	/** 
	 * Accoring to: http://yearofmoo.com/2011/03/cross-browser-stylesheet-preloading/
	 */
	loadCss: function(url, options, onload) {
		var onload = typeof options == 'function' ? options : onload,
			options = typeof options == 'function' ? {} : (options || {}),
			options = jQuery.extend({idprefix: 'css-load-track-id', delay: 10, limit: 200}, options),
			id = options.idprefix + (new Date().getTime()),
			link = jQuery('<link/>').attr({
					rel: 'stylesheet',
					type: 'text/css',
					href: url,
					id: id})
					
		options.head = options.head || true
		options.before = options.before || Slydes.script
		Slydes.addResource(link.get(0), options)
					
		/*if (this.isEventSupported(link, 'load')) {
			link.onload = success
		} else {*/
			if (typeof onload == 'function') {
				var counter = 0,
					checker = function() {
						var stylesheets = document.styleSheets
						try {
							for(var i = 0, len = stylesheets.length; i < len; i++) {
							    var file = stylesheets[i],
							    	owner = file.ownerNode ? file.ownerNode : file.owningElement;
							    
							    if(owner && owner.id == id) {
									sheets[j].cssRules;
									onload()
									return
							    }
							}
						} catch (e) {}
				    
						if(counter++ > options.limit) {
				          alert("failed to load css from " + url)
				          return
				        }
				        
				        setTimeout(checker, options.delay)
				        return
				    }
				checker()
			}
		/*}*/
	},
	
	notice: function(msg) {
		jQuery.gritter.add({title: 'Notice', text: msg})
	},
	
	/**
	 * from: http://blog.strictly-software.com/2009/11/testing-for-browser-event-support.html
	 * 
	 * doesn't work in some cases (e.g, returns true for 'load' events on <link> elements in FF4)
	 */
	isEventSupported: (function(){
		var win = this
		var cache = {}
		
		return function(tag, event) {
			var tagName = (typeof tag == 'object' ? (typeof tag.get  == 'function' ? tag.get(0).tagName : tag.tagName) : tagName)
				key = (tagName + "." + event).toLowerCase()
			if(cache[key])return cache[key]   
			var el = (tagName == 'window' ? win : document.createElement(tagName)),   
			    onevent = 'on' + event.toLowerCase(),     
			  	supported = (onevent in el);   
		  	if (!supported && el.setAttribute) {
		  		el.setAttribute(onevent, 'return;')
		  		supported = typeof el[onevent] == 'function'
		  	}
		  	// the above tests should work in majority of cases but this test checks the EVENT object
			if(!supported && win.Event && typeof(win.Event) == "object"){   
				supported = (event.toUpperCase() in win.Event)
			}
			el = null
			cache[key] = supported  
			return supported
		 
		} 
	})(),
	
	ratio_43: function(width, height) {
		var unit = Math.min(width / 4, height/ 3)
		return {
			width: Math.floor(unit * 4),
			height: Math.floor(unit * 3)
		}
	}
	
	
	
})

jQuery.fn.slydes = function() {
	return this.data('slydes')
}


jQuery.fn.equals = function(other) {
	return this.length === other.length && this.length === this.filter(other).length
//	return this.selector == other.selector // selector not always set
}

Slydes.loadScript(Slydes.base + '../lib/jquery-gritter/js/jquery.gritter.js')
Slydes.loadCss(Slydes.base + '../lib/jquery-gritter/css/jquery.gritter.css')
