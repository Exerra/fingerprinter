export default function () {
	let gl = document.createElement( "canvas" ).getContext( "webgl" )

	let debugInfo = gl.getExtension( "WEBGL_debug_renderer_info" )
	let vendor = gl.getParameter( debugInfo.UNMASKED_VENDOR_WEBGL )
	let renderer = gl.getParameter( debugInfo.UNMASKED_RENDERER_WEBGL )

	return {
		vendor,
		renderer
	}
}