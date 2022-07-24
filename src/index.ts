import getBrowserInfo from "./sources/browser";
import getTimezoneInfo from "./sources/timezone";
import canvas from "./sources/canvas";
import { encode } from "./utils/hash";
import getDeviceInfo from "./sources/device";
import fonts from "./sources/fonts";
import audio from "./sources/audio";
import webgl from "./sources/webgl";
import contrast from "./sources/contrast";
import color_gamut from "./sources/color_gamut";
import forced_colors from "./sources/forced_colors";
import hdr from "./sources/hdr";
import monochrome from "./sources/monochrome";
import reducedMotion from "./sources/reducedMotion";
import math from "./sources/math";

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

const getRawFingerprint = async () => {
	let browser = await getBrowserInfo()
	let timezone = getTimezoneInfo()
	let device = getDeviceInfo()

	browser.canvas = canvas()

	// --- Colours ---
	device.color.contrast = contrast()
	device.color.gamut = color_gamut()
	device.color.forcedColors = forced_colors()
	device.color.hdr = hdr()
	device.color.monochromeDepth = monochrome()

	return {
		browser,
		device,
		timezone,
		audio: await audio(),
		webgl: webgl(),
		reducedMotion: reducedMotion(),
		math: math(),
		fonts: await fonts()
	}
}

const display = async () => {
	let final = await getRawFingerprint()

	let encoded = await encode(JSON.stringify(final))

	console.log(final)
	document.getElementById("encoded").innerText = encoded
	document.getElementById("json").innerHTML = syntaxHighlight(JSON.stringify(final, undefined, 4))
}

window["fingerprint"] = {
	getRaw: getRawFingerprint,
	get: async () => {
		console.log(getRawFingerprint())
		let final = await getRawFingerprint()
		return await encode( JSON.stringify(final) )
	}
}


display()