import { useState, useRef } from 'react'
import { lorem } from '../util'
import ErrorsBox from './errorsBox'
import useUser from './context'

export default function BlogEdit ({ blog, close }) {
	const [errors, setErrors] = useState([])
	const textarea = useRef()
	const { accessToken, fetchCatch } = useUser()

	function handleSubmit (e, newToken) {
		e.preventDefault()

		fetch(`${import.meta.env.VITE_API}/api/v1/blog/${blog._id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${newToken || accessToken}`,
				'Access-Control-Allow-Origin': origin,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				title: e.target.title.value,
				text: e.target.text.value,
				isPublished: e.target.publish.checked
			})
		}).then(res => res.json())
			.then(json => {
				if (json.validationMessages) setErrors(json.validationMessages)
				else if (json.document) close(json.document)
				else if (json.originalError === 'jwt expired') throw Error('Expired token')
			}).catch(err => fetchCatch(err, newToken =>	handleSubmit(e, newToken)))
	}

	function handleAutofill () {
		textarea.current.value = lorem.generateParagraphs(6)
	}

	return (
		// Validation is only being one on server side for demonstration purposes
		<>
			{errors.length > 0 && <ErrorsBox errors={errors} />}
			<form className='BlogCreate' onSubmit={handleSubmit}>
				<ul>
					<li className="columns">
						<label htmlFor="title">Title</label>
						<input name="title" defaultValue={blog?.title}/>
					</li>
					<li className="columns">
						<label htmlFor="text">Blog Text</label>
						<textarea ref={textarea} name="text" defaultValue={blog?.text}></textarea>
					</li>
					<li className="publish">
						<label htmlFor="publish">Publish</label>
						<input type='checkbox' name="publish" defaultChecked={blog?.isPublished} />
					</li>
				</ul>
				<button type='button' onClick={handleAutofill}>Autofill</button>
				<button>Save</button>
				<button className='button-link' type='button' onClick={() => close(blog)}>
					Cancel
				</button>
			</form>
		</>
	)
}
