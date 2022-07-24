import getTouchscreen from "../utils/getTouchscreen";

export default function () {
	let w = window
	let nav = w.navigator
	return {
		touchscreen: getTouchscreen(),
		cpu: {
			// @ts-ignore
			name: nav.oscpu || "",
			cores: nav.hardwareConcurrency || 0
		},
		sizes: {
			usable: {
				height: w.outerHeight,
				width: w.outerWidth,
			},
			screen: {
				height: screen.height,
				width: screen.width
			}
		},
		// @ts-ignore
		memory: nav.deviceMemory || 0,
		color: {
			depth: screen.colorDepth,
			contrast: "",
			gamut: "",
			forcedColors: false,
			hdr: false,
			monochromeDepth: 0
		},
	}
}