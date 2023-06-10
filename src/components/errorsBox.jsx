import styled from 'styled-components'

export default function ErrorsBox ({ errors }) {
	return (
		<Container>
			<p>Please correct the following errors:</p>
			<ul>
				{errors.map(error => <li key={error}>{error}</li>)}
			</ul>
		</Container>
	)
}

const Container = styled.div`
	padding: 16px;
	border: 1px solid red;
`
