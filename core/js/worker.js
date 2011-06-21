/**
 * The worker acts as a hub. It accepts messages from one page and distributes it to the rest. 
 * 
 * It also accumulates them so they can be replayed. E.g., by a new client that wants to get up to speed with the rest
 */
(function($) {
	window.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
	window.URL = window.URL || window.webkitURL

	Slydes.Worker = jQuery.extend({}, {
		create: function() {
			/**
			 * This function acts as a container of code for the worker and is not meant to be called directly
			 */
			function __worker__() {
				var connections = [],
				    events = []
			
				self.onconnect = function(event){
			
					var port = event.ports[0];
					connections.push(port);
			
					port.onmessage = function(event){
						var msg = jQuery.extend(event.data, {timestamp: new Date()})
			
						if (msg.events) {
							port.postMessage({events: events})
						}
			
						else {
							events.push(msg)
							for (var i = 0; i < connections.length; i++) {
								if (connections[i] != port) {
									connections[i].postMessage(msg)
								}
							}
						}
					}
				}
			
			} 

			if (typeof SharedWorker != 'function' ) {
				Slydes.notice('This browser does not support synchronization of presentation windows')
				return
			}
			console.log("loading worker")
			var mainString = __worker__.toString()
			var bodyString     = mainString.substring( mainString.indexOf("{")+1, mainString.lastIndexOf("}") )
			var bb = new BlobBuilder()
			bb.append(bodyString)
			
			var url = window.URL.createObjectURL(bb.getBlob())
			
			try {
				$.extend(this, new SharedWorker(url, 'slydes'))
			} catch(e){
				var msg = 'Failed to create Web Worker - multi window presentations and presenter view disabled'
				console.log(msg);
				console.log(e);
			}
		}
		
		
	})
	
	$('document').ready(function(){Slydes.Worker.create()})
})(jQuery)	

