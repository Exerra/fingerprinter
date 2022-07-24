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
		mimeTypes: mimetypes || []
	}

	return obj
}