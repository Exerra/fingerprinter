import getBrowserInfo from "./sources/browser";
import getTimezoneInfo from "./sources/timezone";
import canvas from "./sources/canvas";
import { encode } from "./utils/hash";
import getDeviceInfo from "./sources/device";
import fonts from "./sources/fonts";
import audio from "./sources/audio";

function syntaxHighlight(json) { // I lifted off of stack overflow and I do not want to make this look good
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}

const asyncFunc = async () => {
	let browser = await getBrowserInfo()
	let timezone = getTimezoneInfo()
	let device = getDeviceInfo()

	browser.canvas = canvas()

	let final = {
		browser,
		device,
		timezone,
		audio: await audio(),
		fonts: await fonts()
	}

	let it = document.fonts.entries()
	let arr: any[] = []
	let done = false

	while (!done) {
		const font = it.next()
		if (!font.done) {
			arr.push(font.value[0])
		} else {
			done = font.done
		}
	}

	let encoded = await encode(JSON.stringify(final))

	console.log(final)
	document.getElementById("encoded").innerText = encoded
	document.getElementById("json").innerHTML = syntaxHighlight(JSON.stringify(final, undefined, 2))
}

asyncFunc()