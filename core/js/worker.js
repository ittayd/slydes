(function($) {
	Slydes.worker = jQuery.extend({}, {
		create: function(callback) {
			if (typeof SharedWorker != 'function' ) {
				Slydes.notice('This browser does not support synchronization of presentation windows')
				Slydes.worker = undefined
				return
			}
			console.log("loading worker")

			try {
				var worker = new SharedWorker(Slydes.base + "js/worker_impl.js", 'slydes')
				worker.port.addEventListener('error', function(event){
				    throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
				}, false);
				worker.port.addEventListener('message', callback, false)
				worker.port.start()
				Slydes.worker = worker
			} catch(e){
				var msg = 'Failed to create Web Worker - multi window presentations and presenter view disabled'
				console.log(msg);
				console.log(e);
			}

		}
	})

})(jQuery)	

