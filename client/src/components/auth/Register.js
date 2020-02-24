import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setAlert, register } from '../../actions'
// import { Redirect } from 'react-router-dom'

const Register = ({ setAlert, register, isAuthenticated, history }) => {
    const [fromData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
    });

    const { firstName, lastName, email, password, password2 } = fromData

    const onFormDataChange = e => {
        setFormData({ ...fromData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('passwords do not match', 'danger');
        } else {
            register({ firstName, lastName, email, password }, history);
        }
    }

    //Redirect if logged in
    // if (isAuthenticated) {
    //     return <Redirect to='/dashboard' />
    // }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create User Account</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <small className="form-text">Please enter User's first name</small>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        //required 
                        value={firstName}
                        onChange={(e) => onFormDataChange(e)} />
                </div>
                <div className="form-group">
                    <small className="form-text">Please enter User's last name</small>
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        //required 
                        value={lastName}
                        onChange={(e) => onFormDataChange(e)} />
                </div>
                <div className="form-group">
                    <small className="form-text">Please enter User's email</small>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onFormDataChange(e)} />
                </div>
                <div className="form-group">
                    <small className="form-text">Password</small>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} onChange={(e) => onFormDataChange(e)}
                    />
                </div>
                <div className="form-group">
                    <small className="form-text">Confirm Password</small>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2} onChange={(e) => onFormDataChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            {/* <p className="my-1">
                Already have an account? <Link to="/login">Sign up</Link>
            </p> */}
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { setAlert, register })(Register)
