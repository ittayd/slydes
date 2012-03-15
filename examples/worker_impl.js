/**
 * The worker acts as a hub. It accepts messages from one page and distributes it to the rest. 
 * 
 * It also accumulates them so they can be replayed. E.g., by a new client that wants to get up to speed with the rest
 */
var connections = [],
    events = []

self.addEventListener('connect', function (event) {

	var port = event.ports[0]
	connections.push(port)

    port.addEventListener('message', function (event) {
		event.data.timestamp = new Date()

		if (event.data.events) {
			port.postMessage({events: events})
		}

		else {
			events.push(event.data)
			for (var i = 0; i < connections.length; i++) {
				if (connections[i] != port) {
					connections[i].postMessage(event.data)
				}
			}
		}
	}, false)
	port.start()
}, false)
