export function titleWord(text) {
	return text
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
		.replace(/[-_]/g, ' ')
}