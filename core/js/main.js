/**
 * Main starting point
 */
jQuery.extend(Slydes, {
	setup: function($) {
		Slydes.import('globals', 'utils', 'options', 'presentation', 'slide', 'worker', 'step', function() {
			Slydes.Plugins = {}
			var plugins = Slydes.options.plugins 
			if (plugins === undefined) {
				plugins = "core-theme"
			}

			if (plugins != "skip") {
				function loadTheme(theme) {
					Slydes.loadScript(Slydes.base + "../plugins/" + theme + "/main.js")
				}

				console.log("plugins: " + plugins)
				if (typeof plugins === 'string') {
					loadTheme(plugins)
				} else {
					jQuery.each(plugins, function(i, theme){
						loadTheme(theme)
					})
				}
			}
		})
	}
})

