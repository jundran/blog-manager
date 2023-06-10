import { Link } from 'react-router-dom'

export default function NotSignedIn () {
	return (
		<p>
			Please <Link to='/'>login </Link> or
			<Link to='/' state={{ signup: true }}> signup </Link>
			to be able to create or manage blogs.
		</p>
	)
}
