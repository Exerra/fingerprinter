export const enum ContrastPreference {
	less = "less",
	none = "none",
	more = "more",
	forcedColors = "forcedColors"
}

export default function (): ContrastPreference {
	if (doesMatch( "no-preference" )) {
		return ContrastPreference.none
	}

	if (doesMatch( "high" ) || doesMatch( "more" )) {
		return ContrastPreference.more
	}

	if (doesMatch( "low" ) || doesMatch( "less" )) {
		return ContrastPreference.less
	}

	if (doesMatch( "forced" )) {
		return ContrastPreference.forcedColors
	}

	return undefined
}

const doesMatch = ( value: string ) => {
	return matchMedia( `(prefers-contrast: ${value})` ).matches
}