export default function ( userAgent: string ) {
	let regex: RegExp = /\((?<info>.*?)\)(\s|$)|(?<name>.*?)\/(?<version>.*?)(\s|$)/gm

	// @ts-ignore
	console.log( regex.exec( userAgent ) )
	console.log( userAgent )
	console.log( "sadsadas" )
}