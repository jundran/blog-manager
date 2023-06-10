import { useState } from 'react'
import useUser from './context'
import ErrorsBox from './errorsBox'

export default function UserCreate () {
	const [errors, setErrors] = useState([])
	const { setUser } = useUser()

	function handleSubmit (e) {
		e.preventDefault()

		fetch(`${import.meta.env.VITE_API}/api/v1/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				firstname: e.target.firstname.value,
				surname: e.target.surname.value,
				email: e.target.email.value,
				password: e.target.password.value,
				passwordConfirm: e.target.passwordConfirm.value
			})
		}).then(res => res.json())
			.then(json => {
				if (json.validationMessages) setErrors(json.validationMessages)
				else if (json.user) setUser(json.user)
				else console.error('No errors or user returned')
			})
			.catch(err => console.error(err))
	}

	return (
		<div>
			<h2>Create Account</h2>
			{errors.length > 0 && <ErrorsBox errors={errors} />}
			<form onSubmit={handleSubmit}>
				{/* Validation is only being one on server side for demonstration purposes */}
				<ul>
					<li className="columns">
						<label htmlFor="firstname">Firstname</label>
						<input name="firstname" />
					</li>
					<li className="columns">
						<label htmlFor="surname">Surname</label>
						<input name="surname" />
					</li>
					<li className="columns">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" />
					</li>
					<li className="columns">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" />
					</li>
					<li className="columns">
						<label htmlFor="passwordConfirm">Password Confirm</label>
						<input type="password" name="passwordConfirm" />
					</li>
				</ul>
				<button>Create User</button>
			</form>
		</div>
	)
}
