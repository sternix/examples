document.addEventListener("DOMContentLoaded",function() {

	let btnSet = document.getElementById("btnSet");
	btnSet.addEventListener("click" , function(event) {
		event.preventDefault();
		event.stopPropagation();
		let key = document.getElementById("key").value;
		let value =  document.getElementById("value").value;
		sessionStorage.setItem(key,value);
		refreshTable();
	});

	function refreshTable() {
		let tbl = document.getElementById("tblItems");

		while (tbl.childElementCount > 1) { // keep header
			tbl.removeChild(tbl.lastChild);
		}

		for (let i = 0; i < sessionStorage.length; i++) {
			let key = sessionStorage.key(i);
			let value = sessionStorage.getItem(key);
			let tr = document.createElement("tr");
			let tdKey = document.createElement("td");
			let txtKey = document.createTextNode(key);
			let tdValue = document.createElement("td");
			let txtValue = document.createTextNode(value);

			tdKey.appendChild(txtKey);
			tdValue.appendChild(txtValue);
			tr.appendChild(tdKey);
			tr.appendChild(tdValue);
			tbl.appendChild(tr);
		}
	}
});
