import { useState } from 'react'
import styled from 'styled-components'

export default function DeleteWithConfirmation ({ onDeleteConfirm, buttonText, message }) {
	const [isActive, setIsActive] = useState(false)

	function handleClick () {
		if (isActive) onDeleteConfirm()
		else setIsActive(true)
	}

	function handleCancel () {
		setIsActive(false)
	}

	return (
		<Container>
			<button onClick={handleClick}>{isActive ? `Confirm ${buttonText}` : buttonText}</button>
			{isActive && <button className='button-link' onClick={handleCancel}>Cancel</button>}
			{isActive && message && <Message>{message}</Message> }
		</Container>
	)
}

const Container = styled.div`
	margin-top: 20px;
`

const Message = styled.p`
	margin: 4px 0;
	font-size: .85rem;
	color: #f00;
`
