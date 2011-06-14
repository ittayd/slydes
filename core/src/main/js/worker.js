/**
 * 
 */
function main() {
	foo
	bar
}

console.log("loading worker")
var mainString = main.toString()
var bodyString     = mainString.substring( mainString.indexOf("{")+1, mainString.lastIndexOf("}") )
window.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
window.URL = window.URL || window.webkitURL
var bb = new BlobBuilder()
bb.append(bodyString)

var url = window.URL.createObjectURL(bb.getBlob())

try {
	Slydes.worker = new SharedWorker(url, 'slydes')
} catch(e){
	var msg = 'Failed to create Web Worker - multi window presentations and presenter view disabled'
	console.log(msg);
	console.log(e);
}



