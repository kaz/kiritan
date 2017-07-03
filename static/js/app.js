fetch("/data.json")
.then(resp => resp.ok ? resp.json() : {})
.then(data => {
	data = Object.keys(data).sort().reverse().map(k => {
		data[k].key = k;
		return data[k];
	});

	const latest = data[0] || {type: "im6167817", data: null}
	window[latest.type](latest.data);
	document.querySelectorAll(`input[name='type_select']`).forEach(e => {
		e.checked = e.value === latest.type;
		e.onchange = _ => window[e.value]();
	});

	let html = "";
	data.forEach(e => {
		html += `
			<a
				href="javascript:"
				class="${e.type}"
				style="background-image: url(/static/cache/${e.key}/canvas.png)"
				onclick='window.${e.type}(${JSON.stringify(e.data)})'
			></a>
		`;
	});
	document.querySelector("#history").innerHTML = html;
});
