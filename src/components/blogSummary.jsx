import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { formatDate } from '../util'
import { TEXT_LIGHT } from '../styles/constants'
import { PublishedState, DateString } from './blog' // styled components

export default function BlogSummary ({ blog }) {
	return (
		<div>
			<TitleLink to={`/blog/${blog._id}`} >{blog.title}</TitleLink>
			<Text className='mt8 mb8'>{blog.summary}</Text>
			<DateString className='mt8 mb8'>{formatDate(blog.createdAt)}</DateString>
			<PublishedState className='mt8 mb8' $isPublished={blog.isPublished}>
				{blog.isPublished ? 'Published' : 'Saved Draft'}
			</PublishedState>
		</div>
	)
}

const Text = styled.p`
	color: ${TEXT_LIGHT}
`

const TitleLink = styled(Link)`
	text-decoration: none;
	font-size: 1.2rem;
	color: #222;
	font-weight: 600;
	&:hover { text-decoration: underline; }
`
