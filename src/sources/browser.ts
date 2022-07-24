import parseMimetypes from "../utils/parseMimetypes";
import parsePlugins from "../utils/parsePlugins";

export default async function () {
	let nav = window.navigator

	return {
		vendor: nav.vendor || "",
		app: {
			codename: nav.appCodeName,
			name: nav.appName,
		},
		product: {
			name: nav.product,
			sub: nav.productSub
		},
		language: {
			current: nav.language,
			list: nav.languages
		},
		userAgent: nav.userAgent,
		plugins: parsePlugins(nav.plugins),
		capabilities: {
			contacts: 'contacts' in navigator && 'ContactsManager' in window,
			pdfViewer: nav.pdfViewerEnabled || false,
			cookies: nav.cookieEnabled || false
		},
		mimeTypes: parseMimetypes(nav.mimeTypes) || [],
		canvas: "",
		bars: {
			menubar: window.menubar.visible || "",
			personalbar: window.personalbar.visible || "",
			statusbar: window.statusbar.visible || "",
			toolbar: window.toolbar.visible || ""
		},
		doNotTrack: nav.doNotTrack || "NC"
	}
}