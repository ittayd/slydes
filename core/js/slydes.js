/**
 * Main entry point
 */
var SLYDES_JS = SLYDES_JS || "slydes";

(function() {
    var scripts = document.getElementsByTagName('script'),
        slydesjs = undefined
    
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(SLYDES_JS) != -1) {
            slydesjs = scripts[i]
        }
    }

    if (!slydesjs) {
        var msg = "Could not find the slydes script tag. If you're using a name different than " + SLYDES_JS + " then set the variable SLYDES_JS prior to loading"
        alert(msg)
        throw new Error(msg)
    }
    
    var path = slydesjs.src.split('?')[0],      // remove any ?query
        baseUrl = path.split('/').slice(0, -3).join('/') + '/',  // go up 2 levels
        requirejs = document.createElement('script');

//    requirejs.src = baseUrl + "lib/require/1.0.7/require-jquery.js"
//    requirejs.type = "text/javascript"
//    requirejs.setAttribute('data-main', baseUrl + 'core/js/main')
    
    document.write('<script src="' + baseUrl + 'lib/require/1.0.7/require-jquery.js" data-main="' + baseUrl + 'core/js/main" type="text/javascript"></script>')
    //slydesjs.parentNode.insertBefore(requirejs, slydesjs);
    
})()


/*
var Slydes = {
	readyCallbacks: [],
	ready: function(callback) {
		this.readyCallbacks.push(callback)
	},
	
	addResource: function(element, options) {
	 	var addChild = function(element, child) {
	 		if (options.before) {
	 			element.insertBefore(child, options.before)
	 		} else {
	 			element.appendChild(child)
	 		}
	 	}
	 	
	 	if (options.head) {
	 		addChild(document.head, element)
	 	} else {
		 	var addElement = function() {addChild(document.body, element);}
			
			if (document.body == null) {
				document.addEventListener('DOMContentLoaded', addElement, false)
			} else {
				addElement()
			}
	 	}
	
	},
	
	loadScript: function(url, options, onload) {
		var onload = typeof options == 'function'? options : onload,
			options = typeof options == 'function' ? {} : (options || {}),
			script = document.createElement('script')
		
		script.src = url
		script.type = "text/javascript"

		// Attach handlers for all browsers
		if (typeof onload == 'function') {
			script.onload = script.onreadystatechange = function() {
				if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
					onload()
		
					script.onload = script.onreadystatechange = null
					// head.removeChild(script)
				}
			}
		}

	 	Slydes.addResource(script, options)
	}

};


(function(){
	function Slydes_setup() {
		var $ = jQuery
		// $.noConflict()
		
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

})()
*/

 
 