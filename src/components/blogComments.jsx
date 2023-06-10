import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { formatDate } from '../util'
import { TEXT_MEDIUM } from '../styles/constants'
import DeleteWithConfirm from './deleteWithConfirmation'
import useUser from './context'

export default function Comments ({ blog }) {
	const [comments, setComments] = useState(blog.comments)

	// Rerender comments without deleted one
	function handleDelete (id) {
		setComments(comments.filter(comment => comment._id !== id))
	}

	return (
		<>
			<hr />
			{comments.map((c, index) =>
				<Fragment key={c._id}>
					<Comment data={c} blogId={blog._id} deleteComment={() => handleDelete(c._id)} />
					{index < comments.length - 1 && <hr />}
				</Fragment>
			)}
		</>
	)
}

function Comment ({ data, blogId, deleteComment }) {
	const { user } = useUser()

	function handleDeleteComment () {
		fetch(`${import.meta.env.VITE_API}/api/v1/blog/${blogId}/comment/${data._id}`, {
			method: 'DELETE',
			headers: { 'Authorization': `Bearer ${user.token}` }
		}).then(res => {
			if (res.status === 204) deleteComment()
			else console.error('Unable to delete blog.')
		}).catch(err => console.error(err))
	}

	return (
		<div>
			<CommentText>{data.text}</CommentText>
			<CommentAuthor>
				Posted by <span>{data.name}</span> on {formatDate(data.createdAt)}
			</CommentAuthor>
			<DeleteWithConfirm
				onDeleteConfirm={handleDeleteComment}
				buttonText='Delete Comment'
				message='Delete comment left by reader'
			/>
		</div>
	)
}

const CommentText = styled.p`
	margin: 8px 0;
	font-size: .95rem;
	color: ${TEXT_MEDIUM};
`

const CommentAuthor = styled.p`
	margin: 8px 0;
	font-size: .75rem;
	span { font-weight: 600; }
`
