import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions';
import Sidenav from '../sidenav';
import LandingSidenav from '../layout/landing/landing-sidenav';

const Navbar = ({ auth: { loading, isAuthenticated, user }, logout }) => {
	const authLinks = (
		<ul>
			{user && user.role === 'admin' ? (
				<>
					<li>
						<NavLink activeClassName="is-active" exact to="/admin">
							<i className="fas fa-users"></i> <span className="hide-sm">Client Management</span>
						</NavLink>
					</li>
				</>
			) : null}

			<li>
				<NavLink activeClassName="is-active" exact to="/dashboard">
					<i className="fas fa-chart-bar"></i> <span className="hide-sm">Dashboard</span>
				</NavLink>
			</li>
			{user && user.role !== 'admin' ? (
				<>
					<li>
						<NavLink activeClassName="is-active" exact to="/booking">
							<i className="fas fa-calendar-check"></i> <span className="hide-sm">Booking</span>
						</NavLink>
					</li>
				</>
			) : null}

			{/* <li><NavLink to="/profiles"><i className="fas fa-user-friends"></i>{' '}<span className="hide-sm">Members</span></NavLink></li> */}
			{/* <li><NavLink to="/posts"><i className="fas fa-comment"></i>{' '}<span className="hide-sm">Community Posts</span></NavLink></li> */}
			<li>
				<NavLink onClick={logout} to="/">
					{' '}
					<i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
				</NavLink>
			</li>
		</ul>
	);

	const guesLinks = (
		<ul>
			<li>
				<NavLink activeClassName="is-active" exact to="/">
					Home
				</NavLink>
			</li>
			{/* <li><NavLink to="/about">About</NavLink></li> */}
			{/* <li><NavLink to="/contact">Contact</NavLink></li> */}

			{/* <li><NavLink to="/profiles">Profiles</NavLink></li> */}
			{/* <li><NavLink to="/register">Sign up</NavLink></li> */}
			<li>
				<NavLink activeClassName="is-active" exact to="/login">
					Login
				</NavLink>
			</li>
		</ul>
	);

	return (
		<nav className="navbar">
			<h1>
				{!loading && <Fragment>{isAuthenticated ? <Sidenav /> : <LandingSidenav />}</Fragment>}
				<NavLink to="/"> </NavLink>
			</h1>
			{!loading && <Fragment>{isAuthenticated ? authLinks : guesLinks}</Fragment>}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
