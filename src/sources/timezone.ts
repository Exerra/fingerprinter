export default function (): number {
	return (new Date().getTimezoneOffset() / 60) * (-1)
}