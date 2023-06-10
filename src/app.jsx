import { HashRouter, Routes, Route } from 'react-router-dom'
import './styles/index.sass'
import { ContextProvider } from './components/context'
import HomePage from './pages/homePage'
import BlogsPage from './pages/blogsPage'
import BlogPage from './pages/blogPage'
import BlogCreatePage from './pages/blogCreatePage'

export default function App () {
	return (
		<ContextProvider>
			<HashRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/blog' element={<BlogsPage />} />
					<Route path='/blog/create' element={<BlogCreatePage />} />
					<Route path='/blog/:id' element={<BlogPage />} />
				</Routes>
			</HashRouter>
		</ContextProvider>
	)
}
