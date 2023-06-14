import Header from './header'

export default function NotFound ({ message }) {
	return (
		<>
			<Header />
			<main>
				<h1>{message ? `Not found - ${message}` : 'Not found'}</h1>
			</main>
		</>
	)
}
