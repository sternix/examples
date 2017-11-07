document.addEventListener("DOMContentLoaded",function() {
	let timer = null;

	function connect() {
		let source = new EventSource("http://localhost:8080/");
		source.addEventListener("error", onError);
		source.addEventListener("message", onMessage);
	}
	
	function onMessage(event) {
		document.getElementById("sse").innerHTML = event.data;
	}

	function onError(event) {
		switch ( event.target.readyState ) {
			case EventSource.OPEN:
				if (timer != null) {
					clearTimeout(timer);
				}
				break;
			case EventSource.CLOSED:
				event.target.close();
				timer = setTimeout(connect,3000);
				break;
		}
	}

	connect();
});



