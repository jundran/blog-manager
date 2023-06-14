import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header'
import Blog from '../components/blog'
import BlogEdit from '../components/blogEdit'
import useUser from '../components/context'
import NotSignedIn from '../components/notSignedIn'
import NotFound from '../components/notFound'

export default function BlogPage () {
	const [editmode, setEditMode] = useState(false)
	const [blog, setBlog] = useState(null)
	const { id } = useParams()
	const { user, accessToken, fetchCatch } = useUser()

	useEffect(() => {
		(function getBlog (newToken) {
			if (!user) return
			fetch(`${import.meta.env.VITE_API}/api/v1/blog/${id}`, {
				headers: {
					'Authorization': `Bearer ${newToken || accessToken}`,
					'Accept': 'application/json'
				}
			}).then(res => res.json())
				.then(json => {
					if (json.originalError === 'jwt expired') throw Error('Expired token')
					else setBlog(json.document)
				})
				.catch(err => fetchCatch(err, newToken =>	getBlog(newToken)))
		})()
	}, [id, user, accessToken, fetchCatch])

	function handleClose (updatedBlog) {
		setBlog(updatedBlog)
		setEditMode(false)
	}

	if (blog === undefined) return <NotFound />

	return (
		<>
			<Header />
			<main>
				{user ?
					<>
						{!blog ? <h1>Loading</h1>
							:
							<>
								{editmode ?
									<BlogEdit	blog={blog} close={handleClose} /> :
									<Blog blog={blog} edit={() => setEditMode(true)} />
								}
							</>
						}
					</>
					: <NotSignedIn />
				}
			</main>
		</>
	)
}
