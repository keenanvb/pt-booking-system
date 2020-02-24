import React from 'react'
import "./dialogStyle.css"

let Dialog = ({ children, callback, title, id }) => {
    return (
        <div className='dialog-container'>
            <button className='dialog-button-close' onClick={() => callback('close')}>x</button>
            <div className='dialog-section'>
                <h1>{title}</h1>
                <div>{children}</div>
                <div className='dialog-container-button'>
                    {id ? <button className='dialog-button yes' onClick={() => callback('yes', id)}>Yes</button> :
                        <button className='dialog-button yes' onClick={() => callback('yes')}>Yes</button>
                    }
                    <button className='dialog-button no' onClick={() => callback('no')}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;
