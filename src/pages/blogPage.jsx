import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/header'
import Blog from '../components/blog'
import BlogEdit from '../components/blogEdit'
import useUser from '../components/context'
import NotSignedIn from '../components/notSignedIn'

export default function BlogPage () {
	const [editmode, setEditMode] = useState(false)
	const [blog, setBlog] = useState(null)
	const { id } = useParams()
	const { user } = useUser()

	useEffect(() => {
		if (!user) return
		fetch(`${import.meta.env.VITE_API}/api/v1/blog/${id}`, {
			headers: {
				'Authorization': `Bearer ${user.token}`,
				'Accept': 'application/json'
			}
		}).then(res => res.json())
			.then(json => setBlog(json.document))
			.catch(err => console.error(err))
	}, [id, user])

	function handleClose (updatedBlog) {
		setBlog(updatedBlog)
		setEditMode(false)
	}

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
