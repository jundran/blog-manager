import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { lorem } from '../util'
import ErrorsBox from './errorsBox'
import useUser from './context'

export default function BlogCreate () {
	const [errors, setErrors] = useState([])
	const navigate = useNavigate()
	const textarea = useRef()
	const { user } = useUser()

	function handleSubmit (e) {
		e.preventDefault()
		fetch(`${import.meta.env.VITE_API}/api/v1/blog`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${user.token}`,
				'Access-Control-Allow-Origin': origin,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: e.target.title.value,
				text: e.target.text.value,
				isPublished: e.target.publish.checked
			})
		}).then(res => res.json())
			.then(json => {
				if (json.validationMessages) setErrors(json.validationMessages)
				else if (json.document) navigate(`/blog/${json.document._id}`)
			})
			.catch(err => console.error(err))
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
						<input name="title"/>
					</li>
					<li className="columns">
						<label htmlFor="text">Blog Text</label>
						<textarea ref={textarea} name="text"></textarea>
					</li>
					<li className="simple-list mb20">
						<label htmlFor="publish">Publish</label>
						<input className='ml40' type='checkbox' name="publish" />
					</li>
				</ul>
				<button type='button' onClick={handleAutofill}>Autofill</button>
				<button>Save</button>
				<button className='button-link' type='button' onClick={() => navigate('/blog')}>
					Cancel
				</button>
			</form>
		</>
	)
}
