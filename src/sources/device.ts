import getTouchscreen from "../utils/getTouchscreen";

export default function () {
	return {
		touchscreen: getTouchscreen(),
		cpu: {
			// @ts-ignore
			name: window.navigator.oscpu || "",
			cores: window.navigator.hardwareConcurrency || 0
		},
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
		// @ts-ignore
		memory: window.navigator.deviceMemory || 0,
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