import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import useUser from '../components/context'
import Header from '../components/header'
import UserProfile from '../components/userProfile'
import UserCreate from '../components/userCreate'
import UserEdit from '../components/userEdit'
import UserLogin from '../components/userLogin'
import UserLogout from '../components/userLogout'

export default function HomePage () {
	const { state } = useLocation()
	const { user } = useUser()
	const [editProfile, setEditProfile] = useState(false)
	const [form, setForm] = useState(state?.signup ? 'signup' : 'login')

	return (
		<div className='HomePage'>
			<Header />
			<main>
				<h1>Blog Manager</h1>
				{user && !editProfile &&
					<>
						<Welcome>Welcome back {user.fullname}</Welcome>
						<UserProfile user={user}/>
						<button onClick={() => setEditProfile(true)}>Edit profile</button>
						<UserLogout />
					</>
				}
				{user && editProfile &&
					<UserEdit close={() => setEditProfile(false)} />
				}
				{!user && form === 'login' &&
					<>
						<UserLogin />
						<button className='button-link mt20' onClick={() => setForm('signup')}>
							Create a new account instead
						</button>
					</>
				}
				{!user && form === 'signup' &&
					<>
						<UserCreate />
						<button className='button-link mt20' onClick={() => setForm('login')}>
							Login with an existing account
						</button>
					</>
				}
			</main>
		</div>
	)
}

const Welcome = styled.p`
		font-size: 1.4rem;
		color: navy;
`
