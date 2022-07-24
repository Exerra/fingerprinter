export default function (): boolean {
	if (doesMatch( 'active' )) {
		return true
	}

	if (doesMatch( 'none' )) {
		return false
	}

	return false
}

const doesMatch = ( value: string ) => {
	return matchMedia( `(forced-colors: ${value})` ).matches
}