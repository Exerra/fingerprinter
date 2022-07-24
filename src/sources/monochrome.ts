const maxValueToCheck = 100

export default function (): number {
	if (!matchMedia( '(min-monochrome: 0)' ).matches) {
		return 0
	}

	for (let i = 0; i <= maxValueToCheck; i++) {
		if (matchMedia( `(max-monochrome: ${i})` ).matches) {
			return i
		}
	}

	throw new Error( 'Too high value' )
}