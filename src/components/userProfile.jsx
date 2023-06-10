import { formatDate } from '../util'

export default function UserProfile ({ user }) {
	return (
		<div>
			<ul className='simple-list'>
				<li className='columns mb8'>
					<span>Firstname: </span>
					<span>{user.firstname}</span>
				</li>
				<li className='columns mb8'>
					<span>Surname: </span>
					<span>{user.surname}</span>
				</li>
				<li className='columns mb8'>
					<span>Email: </span>
					<span>{user.email}</span>
				</li>
				<li className='columns mb8'>
					<span>Account created: </span>
					<span>{formatDate(user.createdAt)}</span>
				</li>
			</ul>
		</div>
	)
}
