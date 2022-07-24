export default function (): boolean {
	if (doesMatch( 'high' )) {
		return true
	}

	if (doesMatch( 'standard' )) {
		return false
	}

	return false
}

const doesMatch = ( value: string ) => {
	return matchMedia( `(dynamic-range: ${value})` ).matches
}