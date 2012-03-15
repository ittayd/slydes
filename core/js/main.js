/**
 * Main starting point
 */
require.config({
  paths: {
    'lib': '../../lib',
    'plugins': '../../plugins',

    'underscore': '../../lib/underscore/1.3.1-amdjs/underscore', // AMD support
    'css': '../../lib/curl/0.6.2/plugin/css',
  }
})

require([
    'app'
], function(app) {
    app.initialize()
})

/*
(function($){
	Slydes.setup = function() {
		Slydes.import('globals', 'utils', 'options', function() {
			Slydes.loadCss(Slydes.base + 'css/reset.css')
			Slydes.loadCss(Slydes.base + "css/main.css")
			Slydes.Plugins = {}
			var plugins = Slydes.options.plugins 
			if (plugins === undefined) {
				plugins = ["core-theme", "prettify"] 
			}
			
			for (var i = 0; i < plugins.length; i++) {
				if (Slydes.options[plugins[i]] === 'off') {
					plugins.splice(i, 1)
					i--
				}
			}

			if (plugins != "skip") {
				function loadPlugin(plugin) {
					Slydes.loadScript(Slydes.base + "../plugins/" + plugin + "/main.js")
				}

				console.log("plugins: " + plugins)
				if (typeof plugins === 'string') {
					loadPlugin(plugins)
				} else {
					jQuery.each(plugins, function(i, plugin){
						loadPlugin(plugin)
					})
				}
			}
		})
		Slydes.import('presentation', 'slide', 'worker', 'step', 'control', function() {})
	}
})(jQuery)
*/
