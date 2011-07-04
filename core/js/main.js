/**
 * Main starting point
 */
(function($){
	Slydes.setup = function() {
		Slydes.import('globals', 'utils', 'options', function() {
			Slydes.loadCss(Slydes.base + 'css/reset.css')
			Slydes.loadCss(Slydes.base + "css/main.css")
			Slydes.Plugins = {}
			var plugins = Slydes.options.plugins 
			if (plugins === undefined) {
				plugins = "core-theme"
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

