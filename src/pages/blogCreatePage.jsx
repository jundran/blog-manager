import useUser from '../components/context'
import Header from '../components/header'
import BlogCreate from '../components/blogCreate'
import NotSignedIn from '../components/notSignedIn'

export default function BlogCreatePage () {
	const { user } = useUser()

	return (
		<>
			<Header />
			<main>
				{user ? <BlogCreate /> : <NotSignedIn />}
			</main>
		</>
	)
}
