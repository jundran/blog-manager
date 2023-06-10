import { LoremIpsum } from 'lorem-ipsum'

export const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 10,
		min: 6
	},
	wordsPerSentence: {
		max: 16,
		min: 9
	}
})

export function formatDate (date) {
	const options = { month: 'long', day: 'numeric', year: 'numeric' }
	return new Date(date).toLocaleDateString(undefined, options)
}
