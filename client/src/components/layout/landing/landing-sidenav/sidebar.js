import React, { useState } from "react"
import { Link } from 'react-router-dom'
import "./componentStyles.css"

const Sidebar = ({ sidebar, close }) => {

    const [sidebarClass, setSidebarClass] = useState(sidebar)

    let closeHandler = (e) => {
        e.preventDefault();
        setSidebarClass('sidebar close');
        setTimeout(() => {
            close();
        }, 1000)
    }

    return (
        <div className={sidebarClass}>
            <button className="close" style={{ color: 'red' }} onClick={closeHandler}>
                <i className="fa fa-times"></i>
            </button>
            <div className='account'>
                <ul onClick={closeHandler}>
                    <li>Under construction</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar