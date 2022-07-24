export default function () {
	let hasTouchScreen: boolean = false
	let navigator = window.navigator

	if ("maxTouchPoints" in navigator) {
		hasTouchScreen = navigator.maxTouchPoints > 0
	} else if ("msMaxTouchPoints" in navigator) {
		// @ts-ignore
		hasTouchScreen = navigator?.msMaxTouchPoints > 0
	} else {
		let mQ = window.matchMedia && matchMedia( "(pointer:coarse)" )
		if (mQ && mQ.media === "(pointer:coarse)") {
			hasTouchScreen = !!mQ.matches
		} else if ("orientation" in window) {
			hasTouchScreen = true
		} else {
			let UA = window.navigator.userAgent
			hasTouchScreen = true
		}
	}
	return hasTouchScreen
}