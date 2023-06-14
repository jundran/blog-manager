import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getLocalStorageItem, setLocalStorageItem, deleteLocalStorageItem } from '../util'

const Context = createContext()

export function ContextProvider ({ children }) {
	const [user, setUser] = useState(null)
	// Using state for tokens so app works even if local storage is disabled
	// but user will have to log in again if they reload
	const [accessToken, setAccessToken] = useState(null)
	const [refreshToken, setRefreshToken] = useState(null)

	const getNewAccessToken = useCallback(refreshToken => {
		return new Promise((resolve, reject) => {
			if (!refreshToken) reject('Refresh token is missing')

			fetch(`${import.meta.env.VITE_API}/api/v1/auth/token`, {
				headers: {
					'Authorization': `Bearer ${refreshToken}`,
					'Accept': 'application/json'
				}
			}).then(res => res.json())
				.then(json => {
					if (json.accessToken) {
						setAccessToken(json.accessToken)
						setLocalStorageItem('accessToken', json.accessToken)
						resolve(json.accessToken)
					}
					else {
						setUser(null)
						reject('Could not get new access token from server')
					}
				})
				.catch(err => console.error(err))
		})
	}, [])

	const fetchCatch = useCallback((err, callback) => {
		if (err.message === 'Expired token') {
			getNewAccessToken(refreshToken || getLocalStorageItem('refreshToken'))
				.then(newToken =>	callback(newToken))
				.catch(err => console.error(err))
		} else {
			console.error(err)
		}
	}, [getNewAccessToken, refreshToken])

	useEffect(() => {
		(async function getUser (newToken) {
			const accessToken = getLocalStorageItem('accessToken')
			const refreshToken = getLocalStorageItem('refreshToken')
			if (!accessToken || !refreshToken) return
			setAccessToken(accessToken)
			setRefreshToken(refreshToken)
			fetch(`${import.meta.env.VITE_API}/api/v1/user`, {
				headers: {
					'Authorization': `Bearer ${newToken || accessToken}`,
					'Accept': 'application/json'
				}
			}).then(res => res.json())
				.then(json => {
					if (json.originalError === 'jwt expired') throw Error('Expired token')
					else setUser(json.user)
				})
				.catch(err => fetchCatch(err, newToken =>	getUser(newToken)))
		})()
	}, [fetchCatch])

	function setUserAndTokens (json) {
		setUser(json ? json.user : null)
		setAccessToken(json ? json.accessToken : null)
		setRefreshToken(json ? json.refreshToken : null)

		if (json) {
			setLocalStorageItem('accessToken', json.accessToken)
			setLocalStorageItem('refreshToken', json.refreshToken)
		} else {
			deleteLocalStorageItem('accessToken')
			deleteLocalStorageItem('refreshToken')
		}
	}

	return (
		<Context.Provider value={{
			user,
			setUser,
			accessToken,
			setUserAndTokens,
			fetchCatch
		}}>
			{children}
		</Context.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useUser () {
	return useContext(Context)
}
