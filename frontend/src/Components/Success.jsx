import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {

    const navigate = useNavigate()
    useEffect(() => {
        // Set currentUser to true in localStorage after successful payment
        localStorage.setItem('currentUser', 'true');
        console.log('Payment successful, setting currentUser to true');
        alert('PAYMENT SUCCESSFULL!!')
        navigate('/store');

      }, []);
    return (
        null
    );
}

export default Success;
