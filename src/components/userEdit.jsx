import { useState } from 'react'
import useUser from './context'
import UserDelete from './deleteWithConfirmation'
import ErrorsBox from './errorsBox'

export default function UserEdit ({ close }) {
	const [errors, setErrors] = useState([])
	const { user, setUser } = useUser()

	function handleSubmit (e) {
		e.preventDefault()

		fetch(`${import.meta.env.VITE_API}/api/v1/user`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${user.token}`,
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
				else if (json.user) {
					setUser(json.user)
					if (close) close()
				}
				else console.error('No errors or user returned')
			})
			.catch(err => console.error(err))
	}

	function handleDelete () {
		fetch(`${import.meta.env.VITE_API}/api/v1/user/`, {
			method: 'DELETE',
			headers: { 'Authorization': `Bearer ${user.token}` }
		}).then(res => {
			if (res.status === 204) setUser(null)
			else console.error('Failed to delete user account')
		}).catch(err => console.error(err))
	}

	const ph = 'Leave blank to keep existing password'
	return (
		<div>
			<h2>Edit Profile</h2>
			{errors.length > 0 && <ErrorsBox errors={errors} />}

			<form onSubmit={handleSubmit}>
				<ul>
					<li className="columns">
						<label htmlFor="firstname">Firstname</label>
						<input name="firstname" defaultValue={user?.firstname} />
					</li>
					<li className="columns">
						<label htmlFor="surname">Surname</label>
						<input name="surname" defaultValue={user?.surname} />
					</li>
					<li className="columns">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" defaultValue={user?.email} />
					</li>
					<li className="columns">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" placeholder={ph }/>
					</li>
					<li className="columns">
						<label htmlFor="passwordConfirm">Password Confirm</label>
						<input type="password" name="passwordConfirm" placeholder={ph} />
					</li>
				</ul>
				<button>Save</button>
				<button className="button-link" onClick={close}>Cancel</button>
			</form>

			<UserDelete
				onDeleteConfirm={handleDelete}
				buttonText='Delete Account'
				message='Delete your account and all your blogs'
			/>
		</div>
	)
}
