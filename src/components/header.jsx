import { Link } from 'react-router-dom'
export default function Header () {
	return (
		<header>
			<Link className='header-link' to='/'>Home</Link>
			<Link className='header-link' to='/blog'>My Blogs</Link>
			<Link className='header-link' to='/blog/create'>Create Blog</Link>
			<a className='header-link' target="_blank" href="https://jundran.github.io/blog-viewer" rel="noreferrer">
				Blog Viewer
			</a>
		</header>
	)
}
