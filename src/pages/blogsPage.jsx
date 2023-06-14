import { useEffect, useState } from 'react'
import Header from '../components/header'
import useUser from '../components/context'
import BlogSummary from  '../components/blogSummary'
import NotSignedIn from '../components/notSignedIn'

export default function BlogsPage () {
	const [blogs, setBlogs] = useState([])
	const { user, accessToken, fetchCatch } = useUser()

	useEffect(() => {
		(function getBlogs (newToken) {
			if (!user) return
			fetch(`${import.meta.env.VITE_API}/api/v1/blog/current-user`, {
				headers: {
					'Authorization': `Bearer ${newToken || accessToken}`,
					'Accept': 'application/json'
				}
			}).then(res => res.json()
			).then(json => {
				if (json.originalError === 'jwt expired') throw Error('Expired token')
				else setBlogs(json.documents)
			}).catch(err => fetchCatch(err, newToken =>	getBlogs(newToken)))
		})()
	}, [user, accessToken, fetchCatch])

	return (
		<>
			<Header />
			<main>
				{user ?
					<>
						{blogs.length ?
							blogs.map((blog, index) =>
								<div key={blog._id}>
									<BlogSummary blog={blog} />
									{index < blogs.length - 1 && <hr />}
								</div>
							)
							:
							<p>You don&apos;t have any blogs</p>
						}
					</>
					: <NotSignedIn />
				}
			</main>
		</>
	)
}
