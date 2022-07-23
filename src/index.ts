import getBrowserInfo from "./sources/browser";
import getTimezoneInfo from "./sources/timezone";
import canvas from "./sources/canvas";
import { encode } from "./utils/hash";
import getDeviceInfo from "./sources/device";

const asyncFunc = async () => {
	let browser = await getBrowserInfo()
	let timezone = getTimezoneInfo()
	let device = getDeviceInfo()

	browser.canvas = canvas()

	let final = {
		browser,
		device,
		timezone,
	}

	let encoded = await encode(JSON.stringify(final))

	console.log(final)
	document.getElementById("encoded").innerText = encoded
}

asyncFunc()