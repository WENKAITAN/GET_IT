import React, { useEffect } from 'react';

const Success = () => {
    useEffect(() => {
        if(window.location.href.includes('success')) { localStorage.removeItem('cart') }
    })
    return(
        <div style={{textAlign: 'center'}}>
            <h1>Thanks for your order!</h1>
            <p>
            We appreciate your business!
            If you have any questions, please email
            <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
        </div>
    )
}

export default Success;