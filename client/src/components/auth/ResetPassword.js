import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { resetPassword, setAlert } from '../../actions'
import PropTypes from 'prop-types'
import { strengthIndicator, strengthColour } from '../layout/passwordStrengthIndicator'

const ResetPassword = ({ resetPassword, isAuthenticated, match, setAlert }) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [isPasswordShown, setPassword] = useState(false)

    const togglePasswordVisiblity = () => {
        setPassword(!isPasswordShown);
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { password, confirmPassword } = formData

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {

            setAlert('passwords do not match', 'danger');
        } else {
            resetPassword(match.params.id, { password })
        }


    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    const strength = strengthIndicator(password);
    const colour = strengthColour(strength)

    const strength2 = strengthIndicator(confirmPassword);
    const colour2 = strengthColour(strength2)

    return (
        < Fragment >
            <div className="login-wrapper">
                <div className="login-form-wrapper">
                    <h1 className="form-heading">New Password</h1>
                    <form className="login-form" onSubmit={onSubmit} noValidate>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input
                                placeholder="password"
                                type={isPasswordShown ? 'text' : 'password'}
                                name="password"
                                noValidate
                                value={password}
                                onChange={onChange}
                                style={{
                                    border: `1px solid ${colour}`
                                }}
                            />
                            <i
                                className={`password-icon ${isPasswordShown ? 'fas fa-eye' : 'fa fa-eye-slash'}`}
                                onClick={() => { togglePasswordVisiblity() }}
                            />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Please confirm password</label>
                            <input
                                placeholder="password"
                                type={isPasswordShown ? 'text' : 'password'}
                                name="confirmPassword"
                                noValidate
                                value={confirmPassword}
                                onChange={onChange}
                                style={{
                                    border: `1px solid ${colour2}`
                                }}
                            />
                        </div>
                        <div className="createAccount">
                            <button type="submit">Submit</button>
                            {/* <small>Already Have an Account?</small> */}
                        </div>
                        {/* <div>
                            <small> <Link to='/forgotpassword'>Forgot password?</Link></small>
                        </div> */}
                    </form>
                </div>
            </div>
        </Fragment >
    )
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { resetPassword, setAlert })(ResetPassword)
