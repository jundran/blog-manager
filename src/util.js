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


export function setLocalStorageItem (name, value) {
	try {
		localStorage.setItem(name, value)
	} catch (error) {
		console.log('Local storage is disabled. Enable local storage to stay logged in.')
	}
}

export function getLocalStorageItem (name) {
	try {
		return localStorage.getItem(name)
	} catch (error) {
		console.log('Local storage is disabled. Enable local storage to stay logged in.')
	}
}

export function deleteLocalStorageItem (name) {
	try {
		localStorage.removeItem(name)
	} catch (error) {
		console.log('Local storage is disabled. Enable local storage to stay logged in.')
	}
}
