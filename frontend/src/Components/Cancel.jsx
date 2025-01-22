import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cancel() {
    const navigate = useNavigate()
    useEffect(() => {
        // Set currentUser to true in localStorage after successful payment
        localStorage.setItem('currentUser', 'true');
        alert('UH-OH PAYMENT FAILED!!')
        navigate('/store');
      }, []);
    return (
        null
    );
}

export default Cancel;
