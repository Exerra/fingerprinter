import getTouchscreen from "../utils/getTouchscreen";

export default function () {
	let obj = {
		vendor: window.navigator.vendor,
			touchscreen: getTouchscreen(),
			// @ts-ignore
			cpu: window.navigator.oscpu || "",
			sizes: {
			usable: {
				height: window.outerHeight,
					width: window.outerWidth,
			},
			screen: {
				height: screen.height,
					width: screen.width
			}
		},
		colorDepth: screen.colorDepth
	}

	return obj
}