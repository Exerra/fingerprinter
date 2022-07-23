export default async function () {
	let plugins: string[] = []
	let nav = window.navigator

	Object.entries(nav.plugins).forEach(([key, entry]) => {
		plugins.push(entry.name)
	})

	let obj: any = {
		language: {
			current: nav.language,
			list: nav.languages
		},
		userAgent: nav.userAgent,
		plugins,
		capabilities: {
			contacts: 'contacts' in navigator && 'ContactsManager' in window,
			pdfViewer: nav.pdfViewerEnabled || false
		},
		mimeTypes: nav.mimeTypes || {}
	}

	return obj
}