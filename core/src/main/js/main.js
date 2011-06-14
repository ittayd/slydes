/**
 * Main starting point
 */
jQuery.extend(Slydes, {
	setup: function($) {
		this.import('globals', 'utils', 'options', 'presentation', 'slyde', 'worker', function() {
			alert('success')
		})
	}
})