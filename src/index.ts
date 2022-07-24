import getBrowserInfo from "./sources/browser";
import getTimezoneInfo from "./sources/timezone";
import canvas from "./sources/canvas";
import { encode } from "./utils/hash";
import getDeviceInfo from "./sources/device";
import fonts from "./sources/fonts";

const asyncFunc = async () => {
	let browser = await getBrowserInfo()
	let timezone = getTimezoneInfo()
	let device = getDeviceInfo()

	browser.canvas = canvas()

	let final = {
		browser,
		device,
		timezone,
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
	document.getElementById("json").innerText = JSON.stringify(final, undefined, 4)
}

asyncFunc()