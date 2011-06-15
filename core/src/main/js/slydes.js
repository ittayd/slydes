/**
 * Main entry point
 */

var JQUERY_URL = JQUERY_URL || 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.js'

var Slydes = Slydes || {}
var SLYDES_JS = SLYDES_JS || 'slydes.js'

Slydes.getScript = function(url, success) {
	var script     = document.createElement('script')
	script.src = url
	script.type = "text/javascript"

	var head = document.getElementsByTagName('head')[0],
	done = false

	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true

			// callback function provided as param
			if (typeof success == 'function') {
				success()
			}

			script.onload = script.onreadystatechange = null
			head.removeChild(script)
		}
	}

	head.appendChild(script)

}

 // Only do anything if jQuery isn't defined
if (typeof jQuery == 'undefined') {
    if (typeof $ == 'function') {
		thisPageUsingOtherJSLibrary = true
	}


	Slydes.getScript(JQUERY_URL, function() {
		if (typeof jQuery=='undefined') {
			alert("Failed to load jquery from " + JQUERY_URL)
		} else {
			Slydes_setup()
		}

	})

} else { // jQuery was already loaded
	Slydes_setup()
}


function Slydes_setup() {
	var $ = jQuery
	$.noConflict()
	var script = (function() {
		var scripts = document.getElementsByTagName('script')
		
		var slydes
		
		for (var i = 0; i < scripts.length; i++) {
			if (scripts[i].src.indexOf(SLYDES_JS) != -1) {
				slydes = scripts[i]
			}
		}
		if (!slydes) {
			var msg = "Could not find the slydes script tag. If you're using a name different than " + SLYDES_JS + " then set a var named SLYDES_JS with it"
			alert(msg)
			throw new Error(msg)
		}
		
		return slydes
	})()
	
	$.extend(Slydes, {
		script: script,
		base: script.src.replace(new RegExp('\/[^/]+\/' + SLYDES_JS + '.*$'), '/'),
		import: function() {
			var count = arguments.length - 1
			var success = arguments[count]
			var join = function() {
				count--
				if (count == 0) success()
			}
			for (var i = 0; i < arguments.length - 1; i ++ ) {
				this.getScript(this.base + "js/" + arguments[i] + ".js", join)
			}
		}
	})
	Slydes.import('main', function() {
		Slydes.setup($)
	})
	
	
}



 
 