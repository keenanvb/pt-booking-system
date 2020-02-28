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
            <div className="side-nav-footer-social">
                <a href='https://www.instagram.com/lauren.alyssa_pt' target='_blank' rel='noopener noreferrer'>
                    <i style={{ color: '#fb3958' }} className='fab fa-instagram fa-2x' />
                </a>
                <a href='https://www.linkedin.com/in/lauren-arries-228083122/' target='_blank' rel='noopener noreferrer'>
                    <i style={{ color: '#0e76a8' }} className='fab fa-linkedin fa-2x' />
                </a>

            </div>
        </div>
    )
}

export default Sidebar