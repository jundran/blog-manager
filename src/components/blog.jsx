import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useUser from './context'
import { formatDate } from '../util'
import { TEXT_MEDIUM, FONT_SMALL } from '../styles/constants'
import DeleteWithConfirm from './deleteWithConfirmation'
import Comments from './blogComments'


export default function Blog ({ blog, edit }) {
	const navigate = useNavigate()
	const { accessToken, fetchCatch } = useUser()

	function handleDelete (newToken) {
		fetch(`${import.meta.env.VITE_API}/api/v1/blog/${blog._id}`, {
			method: 'DELETE',
			headers: { 'Authorization': `Bearer ${newToken || accessToken}` }
		}).then(res => {
			const headers = res.headers.get('Content-Type') || ''
			if (res.status === 204) navigate('/blog')
			else if (headers.match(/application\/json/)) throw Error('Expired token')
			else console.error('Unable to delete blog.')
		}).catch(err => fetchCatch(err, newToken =>	handleDelete(newToken)))
	}

	return (
		<div>
			<BlogContainer>
				<h1>{blog.title}</h1>
				<DateString>{formatDate(blog.createdAt)}</DateString>
				<Text>{blog.text}</Text>
				<PublishedState $isPublished={blog.isPublished}>
					{blog.isPublished ? 'Published' : 'Saved Draft'}
				</PublishedState>
				<button onClick={edit}>Edit Blog</button>
				<DeleteWithConfirm
					onDeleteConfirm={handleDelete}
					buttonText='Delete Blog'
					message='Delete your blog and its comments'
				/>
			</BlogContainer>
			<Comments blog={blog} />
		</div>
	)
}

const BlogContainer = styled.div`
	line-height: 1.5;
`

const Text = styled.p`
	color: ${TEXT_MEDIUM};
`

export const DateString = styled.p`
	font-weight: 600;
	font-size: ${FONT_SMALL};
`

export const PublishedState = styled.p`
	font-size: ${FONT_SMALL};
	font-weight: 600;
	color: ${props => props.$isPublished ? 'green' : 'darkmagenta'};
`
