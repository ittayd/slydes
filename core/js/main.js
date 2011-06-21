/**
 * Main starting point
 */
(function($){
	$.fn.slydes = function() {
		var cmd = arguments[0],
			args = Array.prototype.slice.call(arguments, 1)
		
		if (cmd == ".") {
			return this.data('slydes')
		}
		
		if (typeof cmd === "number") {
			return $(this[cmd]).data('slydes')
		}
		
		return this.map(function(){
	      return $(this).data('slydes')
		});
	}

	Slydes.setup = function() {
		Slydes.import('globals', 'utils', 'options', function() {
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

