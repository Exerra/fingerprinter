export default async function () {
	let plugins: string[] = []

	Object.entries(window.navigator.plugins).forEach(([key, entry]) => {
		plugins.push(entry.name)
	})

	let obj: any = {
		language: {
			current: window.navigator.language,
			list: window.navigator.languages
		},
		userAgent: window.navigator.userAgent,
		plugins
	}

	return obj
}