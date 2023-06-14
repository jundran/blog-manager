import ErrorsBox from './errorsBox'
import useUser from './context'
import { useState } from 'react'

export default function UserLogin () {
	const [errors, setErrors] = useState([])
	const { setUserAndTokens } = useUser()

	function handleSubmit (e) {
		e.preventDefault()
		fetch(`${import.meta.env.VITE_API}/api/v1/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				email: e.target.email.value,
				password: e.target.password.value
			})
		}).then(res => res.json())
			.then(json => {
				if (json.message) setErrors([json.message])
				else setUserAndTokens(json)
			})
			.catch(err => console.error(err))
	}

	return (
		<div>
			<h2>Login</h2>
			{errors.length > 0 && <ErrorsBox errors={errors} />}

			<form onSubmit={handleSubmit}>
				<ul>
					<li className="columns">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" autoComplete='email' />
					</li>
					<li className="columns">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" autoComplete='current-password' />
					</li>
				</ul>
				<button>Log In</button>
			</form>
		</div>
	)
}
