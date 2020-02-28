import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions'
import Sidenav from '../sidenav'
import LandingSidenav from '../layout/landing/landing-sidenav'


const Navbar = ({ auth: { loading, isAuthenticated, user }, logout }) => {


    const authLinks = (
        <ul>

            {user && user.role === 'admin' ?
                <>
                    <li><Link to="/admin"><i className="fas fa-users"></i>{' '}<span className="hide-sm">Client Management</span></Link></li>
                </>
                :
                <li><Link to="/booking"><i className="fas fa-calendar-check"></i>{' '}<span className="hide-sm">Booking</span></Link></li>
            }
            <li><Link to="/dashboard"><i className="fas fa-chart-bar"></i>{' '}<span className="hide-sm">Dashboard</span></Link></li>
            <li><Link to="/profiles"><i className="fas fa-user-friends"></i>{' '}<span className="hide-sm">Members</span></Link></li>
            <li><Link to="/posts"><i className="fas fa-comment"></i>{' '}<span className="hide-sm">Community Posts</span></Link></li>
            <li><Link onClick={logout} to="/"> <i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span></Link></li>
        </ul>
    );

    const guesLinks = (
        <ul>
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/about">About</Link></li> */}
            {/* <li><Link to="/contact">Contact</Link></li> */}

            {/* <li><Link to="/profiles">Profiles</Link></li> */}
            {/* <li><Link to="/register">Sign up</Link></li> */}
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            <h1>
                {!loading && (<Fragment>{isAuthenticated ?
                    <Sidenav /> : <LandingSidenav />
                }</Fragment>)}
                <Link to="/"> Lauren</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ?
                authLinks : guesLinks
            }</Fragment>)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Navbar)
