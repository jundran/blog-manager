import useUser from './context'

export default function UserLogout () {
	const { setUser } = useUser()

	function handleSubmit (e) {
		e.preventDefault()
		setUser(null)
	}

	return (
		<button onClick={handleSubmit} >Logout</button>
	)
}
