import { createContext, useContext, useState, useEffect } from 'react'

const Context = createContext()

export function ContextProvider ({ children }) {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) return

		fetch(`${import.meta.env.VITE_API}/api/v1/user`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Accept': 'application/json'
			}
		}).then(res => res.json())
			.then(json => {if (json.user) setUser(json.user)})
			.catch(err => console.error(err))
	}, [])

	function setUserAndSave (user) {
		setUser(user)
		// Allow for automatic login
		if (user) localStorage.setItem('token', user.token)
		else localStorage.removeItem('token')
	}

	return (
		<Context.Provider value={{
			user,
			setUser: newUser => setUserAndSave(newUser)
		}}>
			{children}
		</Context.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useUser () {
	return useContext(Context)
}
