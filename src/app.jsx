import { HashRouter, Routes, Route } from 'react-router-dom'
import './styles/index.sass'
import { ContextProvider } from './components/context'
import HomePage from './pages/homePage'
import BlogsPage from './pages/blogsPage'
import BlogPage from './pages/blogPage'
import BlogCreatePage from './pages/blogCreatePage'
import NotFound from './components/notFound'

export default function App () {
	return (
		<ContextProvider>
			<HashRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/blog' element={<BlogsPage />} />
					<Route path='/blog/create' element={<BlogCreatePage />} />
					<Route path='/blog/:id' element={<BlogPage />} />
					<Route path='*' element={<NotFound message='404' />} />
				</Routes>
			</HashRouter>
		</ContextProvider>
	)
}
