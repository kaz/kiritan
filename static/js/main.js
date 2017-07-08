(_ => {

const genImageSet = (type, data) => data.map(e => `<img src="/static/${type}/${e}.png">`).join("");

window.initializer = (type, Images, AllowMultiple, defaultState, jobFn) => (state = defaultState) => {
	let html = "";
	Object.keys(Images).reverse().forEach(key => {
		html += `<h2>${key}</h2>`;
		[].concat(Images[key]).reverse().forEach(img => {
			const inputType = AllowMultiple.some(k => k == key) ? "checkbox" : "radio";
			html += `
				<label>
					<input class="img_select" type="${inputType}" name="${key}" value="${key}/${img}">
					${img}
				</label>
			`;
		});
	});
	document.querySelector("#selection").innerHTML = html;

	const renewState = _ => {
		document.querySelectorAll("#selection input").forEach(e => {
			e.checked = state.some(k => k == e.value);
		});
	};
	const change = _ => {
		state = Array.from(document.querySelectorAll("#selection input")).filter(e => e.checked).map(e => e.value);
		render();
	};
	const render = _ => {
		document.querySelector("#kiritan").innerHTML = genImageSet(type, state);
	};

	document.querySelectorAll(".img_select").forEach(e => {
		e.onchange = change;
	});
	document.querySelector("form").onsubmit = e => {
		e.currentTarget.style.visibility = "hidden";
		document.querySelector("#type").value = type;
		document.querySelector("#data").value = JSON.stringify(state);
	};

	if(jobFn){
		jobFn();
	}

	renewState();
	render();
};

window.onload = _ =>
fetch("/data.json")
.then(resp => resp.ok ? resp.json() : {})
.then(data => {
	data = Object.keys(data).sort().reverse().map(k => {
		data[k].key = k;
		return data[k];
	});

	const latest = data[0] || {type: "im6167817", data: undefined};
	window[latest.type](latest.data);
	document.querySelectorAll(`input[name='type_select']`).forEach(e => {
		e.checked = e.value === latest.type;
		e.onchange = _ => window[e.value]();
	});

	let html = "";
	data.forEach(e => {
		html += `
			<a href="javascript:" class="${e.type}" onclick='window.apply("${e.type}", ${JSON.stringify(e.data)})'>
				${genImageSet(e.type, e.data)}
			</a>
		`;
	});
	document.querySelector("#gallery").innerHTML = html;
});

window.apply = (type, data) => {
	const elm = document.documentElement;
	const sel = document.querySelector("#selection");
	const originalHeight = sel.clientHeight;

	window[type](data);

	elm.scrollTo(elm.scrollLeft, elm.scrollTop + sel.clientHeight - originalHeight);
};

})();
