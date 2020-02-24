import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions'
import "./componentStyles.css"

const Sidebar = ({ sidebar, close, logout }) => {

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
                    <li onClick={closeHandler}><Link to="/user-account"><i className="fas fa-user"></i>{' '}<span className="hide-sm">Account</span></Link></li>
                    <li><Link onClick={logout} to="/"> <i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></Link></li>
                </ul>
            </div>
        </div>
    )
}

// export default Sidebar

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Sidebar)