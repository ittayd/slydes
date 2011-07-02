/**
 * Main entry point
 */
var SLYDES_JS = SLYDES_JS || 'slydes.js'

var Slydes = {
	readyCallbacks: [],
	ready: function(callback) {
		this.readyCallbacks.push(callback)
	},
	loadScript: function(url, success) {
	 	var script     = document.createElement('script')
		script.src = url
		script.type = "text/javascript"

		// Attach handlers for all browsers
		if (typeof success == 'function') {
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
					success()
		
					script.onload = script.onreadystatechange = null
					// head.removeChild(script)
				}
			}
		}

		var addScript = function() {document.body.appendChild(script);}
		
		if (document.body == null) {
			document.addEventListener('DOMContentLoaded', addScript, false)
		} else {
			addScript()
		}

	}

};


(function(){
	function Slydes_setup() {
		var $ = jQuery
		$.noConflict()
		
		$.extend(Slydes, {
			import: function() {
				var count = arguments.length - 1
				var success = arguments[count]
				var join = function() {
					count--
					if (count == 0) success()
				}
				for (var i = 0; i < arguments.length - 1; i ++ ) {
					this.loadScript(this.base + "js/" + arguments[i] + ".js", join)
				}
			}
		})
		Slydes.import('main', function() {
			Slydes.setup()
		})
		
		
	}

	var scripts = document.getElementsByTagName('script'),
		slydes = undefined
	
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
	
	Slydes.script = slydes
	Slydes.base = slydes.src.replace(new RegExp('\/[^/]+\/' + SLYDES_JS + '.*$'), '/')

	 // Only do anything if jQuery isn't defined
	if (typeof jQuery == 'undefined') {
	    if (typeof $ == 'function') {
			thisPageUsingOtherJSLibrary = true
		}
	
	    var JQUERY_URL = JQUERY_URL || (Slydes.base + '../lib/jquery/jquery.js')
	    Slydes.loadScript(JQUERY_URL, function() {
			if (typeof jQuery=='undefined') {
				alert("Failed to load jquery from " + JQUERY_URL)
			} else {
				Slydes_setup()
			}
	
		})
	
	} else { // jQuery was already loaded
		Slydes_setup()
	}
})()


 
 