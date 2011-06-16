/**
 * Main starting point
 */
jQuery.extend(Slydes, {
	setup: function($) {
		Slydes.import('globals', 'utils', 'options', 'presentation', 'slide', 'worker', 'step', function() {
			Slydes.loadCss(this.base + "css/slydes.css", function(){})
		})
	}
})

