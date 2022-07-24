export default function (plugins: PluginArray): any[] {
	let temp = []

	Object.entries(plugins).forEach(([key, entry]) => {
		temp.push(entry.name)
	})

	return temp
}