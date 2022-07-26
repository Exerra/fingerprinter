export default async function () {
	let plugins: string[] = []
	let nav = window.navigator

	Object.entries(nav.plugins).forEach(([key, entry]) => {
		plugins.push(entry.name)
	})

	let mimetypes = []

	for (let mimetype of nav.mimeTypes) {
		mimetypes.push( {
			description: mimetype.description,
			type: mimetype.type,
			suffixes: mimetype.suffixes
		})
	}

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
		plugins,
		capabilities: {
			contacts: 'contacts' in navigator && 'ContactsManager' in window,
			pdfViewer: nav.pdfViewerEnabled || false,
			cookies: nav.cookieEnabled || false
		},
		mimeTypes: mimetypes || [],
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