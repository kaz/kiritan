window.im6167817 = state => {
	const Images = {
		"マーク": [
			"花",
			"ため息",
			"ばってん",
			"おこ",
			"ひらめいた",
			"ﾋﾞｸｯ",
			"焦り",
			"！",
			"おっ",
			"汗",
			"もやもや",
			"ぼのぼの汗",
			"ぷんすこ",
			"？反転",
			"？",
			"ハート",
			"キラーン",
			"落ち込み"
		],
		"アクセサリ": [
			"鼻血",
			"赤白リボン",
			"手持ち包丁血",
			"手持ち包丁",
			"タブレット",
			"吐息",
			"ずんだ",
			"味噌",
			"眼鏡",
			"血",
			"ぼさぼさ",
			"おひげ",
			"汗",
			"目閉じ用涙",
			"涙",
			"垂れ包丁",
			"包丁",
			"獣耳"
		],
		"きりたんぽ": [
			"きりたんぽかしこま腕用",
			"きりたんぽノーマル",
			"なし"
		],
		"眉": [
			"悲し",
			"困り",
			"怒り",
			"普通"
		],
		"目": [
			"つぶら",
			"ニカッ",
			"キラーン",
			"○涙",
			"○",
			"猫太",
			"猫",
			"赤",
			"アヘ",
			"怒り",
			"ジト2",
			"ジト",
			"嘲笑上",
			"嘲笑",
			"驚き",
			"点上",
			"点向こう",
			"点",
			"変態だー！",
			"ぐるぐる",
			"上",
			"向こう",
			"--",
			"＞＜",
			"ウインク",
			"妖艶",
			"星",
			"ハート",
			"レイプ目",
			"うるうる",
			"白目",
			"閉じ笑み",
			"閉じ",
			"半目",
			"ちょっと閉じ",
			"普通"
		],
		"口": [
			"変態だー",
			"よだれ2",
			"よだれ",
			"アヘ2",
			"アヘ1",
			"笛",
			"ぷくー",
			"ニタァ",
			"ぺろ",
			"リス開き",
			"リス閉じ",
			"いぎぎ",
			"がまん",
			"む",
			"ふぁあああ",
			"驚き",
			"△",
			"栗",
			"がびーん",
			"ひきつり",
			"笑い",
			"えー開き",
			"えーアニメ2",
			"えーアニメ1",
			"むむむ・えー閉じ",
			"わ",
			"わアニメ2",
			"わアニメ1",
			"わ閉じ",
			"開き",
			"アニメ2",
			"アニメ1",
			"閉じ"
		],
		"腕": [
			"かしこま/水着用",
			"かしこま/パジャマ用",
			"かしこま/通常服用",
			"普通/水着用",
			"普通/パジャマ用",
			"普通/通常服用"
		],
		"顔効果": [
			"青ざめ",
			"茹で",
			"頬染め",
			"なし"
		],
		"本体": [
			"水着",
			"パジャマ",
			"服破れ",
			"服"
		]
	};
	const AllowMultiple = [
		"アクセサリ",
		"マーク"
	];

	state = state || [
		"本体/服",
		"顔効果/なし",
		"腕/普通/通常服用",
		"口/閉じ",
		"目/普通",
		"眉/普通",
		"きりたんぽ/きりたんぽノーマル",
		"アクセサリ/包丁"
	];

	let html = "";
	Object.keys(Images).reverse().forEach(key => {
		html += `<h2>${key}</h2>`;
		Images[key].reverse().forEach(img => {
			const type = AllowMultiple.some(k => k == key) ? "checkbox" : "radio";
			html += `
				<label>
					<input class="img_select" type="${type}" name="${key}" value="${key}/${img}">
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
		document.querySelector("#kiritan").innerHTML = state.map(e => `<img src="/static/im6167817/${e}.png">`).join("");
	};

	document.querySelectorAll(".img_select").forEach(e => {
		e.onchange = change;
	});
	document.querySelector("form").onsubmit = e => {
		e.currentTarget.style.visibility = "hidden";
		document.querySelector("#type").value = "im6167817";
		document.querySelector("#data").value = JSON.stringify(state);
	};

	const {style} = document.querySelector("#kiritan");
	style.right = "-100px";
	style.bottom = "-50px";

	renewState();
	render();
};
