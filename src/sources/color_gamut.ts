export type ColorGamut = 'srgb' | 'p3' | 'rec2020' | 'none'

export default function (): ColorGamut {
	for (const gamut of [ 'rec2020', 'p3', 'srgb' ] as const) {
		if (matchMedia( `(color-gamut: ${gamut})` ).matches) {
			return gamut
		}
	}

	return "none"
}