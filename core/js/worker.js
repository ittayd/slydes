(function($) {
	Slydes.Worker = jQuery.extend({}, {
		create: function(callback) {
			if (typeof SharedWorker != 'function' ) {
				Slydes.notice('This browser does not support synchronization of presentation windows')
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
				return worker
			} catch(e){
				var msg = 'Failed to create Web Worker - multi window presentations and presenter view disabled.<p> If running Chrome with local copy of Slydes, run it with --allow-file-access-from-files'
				Slydes.notice(msg)
				console.log(msg)
				console.log(e)
			}

		}
	})

})(jQuery)	

