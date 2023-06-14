import useUser from './context'

export default function UserLogout () {
	const { accessToken, fetchCatch, setUserAndTokens } = useUser()

	function handleSubmit (e, newToken) {
		e.preventDefault()
		fetch(`${import.meta.env.VITE_API}/api/v1/auth/logout`, {
			method: 'POST',
			headers: { 'Authorization': `Bearer ${newToken || accessToken}` }
		}).then(res => {
			const headers = res.headers.get('Content-Type') || ''
			if (headers.match(/application\/json/)) throw Error('Expired token')
			else if (res.status === 204) setUserAndTokens(null)
			else console.error('Unable to logout user')
		}).catch(err => fetchCatch(err, newToken =>	handleSubmit(e, newToken)))
	}

	return (
		<button onClick={handleSubmit} >Logout</button>
	)
}
