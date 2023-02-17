import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Button className='btn-secondary offset-8 px-4' onClick={() => navigate(-1)}>BACK</Button>
        </div>
    )
}

export default BackButton