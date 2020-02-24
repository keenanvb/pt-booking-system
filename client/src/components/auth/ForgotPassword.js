import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions'
import PropTypes from 'prop-types'

const ForgotPassword = ({ forgotPassword, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        formErrors: {
            email: ""
        }
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        const { formErrors } = formData
        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            default:
                break;
        }

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { email, formErrors } = formData

    const onSubmit = (e) => {
        e.preventDefault();
        forgotPassword({ email })
    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    return (
        < Fragment >
            <div className="login-wrapper">
                <div className="login-form-wrapper">
                    <h1 className="form-heading">Forgot Password</h1>
                    <form className="login-form" onSubmit={onSubmit} noValidate>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                value={email}
                                onChange={onChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="createAccount">
                            <button type="submit">Submit</button>
                            {/* <small>Already Have an Account?</small> */}
                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    )
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword)
