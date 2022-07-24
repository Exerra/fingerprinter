export default function ( mimetypes: MimeTypeArray ): any[] {
	let temp = []
	for (let mimetype of mimetypes) {
		temp.push( {
			description: mimetype.description,
			type: mimetype.type,
			suffixes: mimetype.suffixes
		} )
	}

	return temp
}