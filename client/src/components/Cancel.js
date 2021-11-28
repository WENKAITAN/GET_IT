import React from 'react';

const Cancel= () => {
    return(
        <div style={{textAlign: 'center'}}>
            <h1>Your order has been canceled </h1>
            <p>
            We appreciate your business!
            Please try it again!
            <a href="mailto:orders@example.com">orders@example.com</a>.
            </p>
        </div>
    )
}

export default Cancel;