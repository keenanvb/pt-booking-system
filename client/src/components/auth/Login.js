import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../actions'
import PropTypes from 'prop-types'

const Login = ({ login, isAuthenticated }) => {
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

    const { email, password, formErrors } = formData

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ email, password })
    }

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    return (
        // < Fragment >
        //     <div className="login-wrapper">
        //         <div className="login-form-wrapper">
        //             <h1 className="form-heading">Login</h1>
        //             <form className="login-form" onSubmit={onSubmit} noValidate>
        //                 <div className="email">
        //                     <label htmlFor="email">Email</label>
        //                     <input
        //                         className={formErrors.email.length > 0 ? "error" : null}
        //                         placeholder="Email"
        //                         type="email"
        //                         name="email"
        //                         noValidate
        //                         value={email}
        //                         onChange={onChange}
        //                     />
        //                     {formErrors.email.length > 0 && (
        //                         <span className="errorMessage">{formErrors.email}</span>
        //                     )}
        //                 </div>
        //                 <div className="password">
        //                     <label htmlFor="password">Password</label>
        //                     <input
        //                         placeholder="password"
        //                         type="password"
        //                         name="password"
        //                         noValidate
        //                         value={password}
        //                         onChange={onChange}
        //                     />
        //                 </div>
        //                 <div className="createAccount">
        //                     <button type="submit">Login</button>
        //                 </div>
        //                 <div>
        //                     <small> <Link to='/forgot-password'>Forgot password?</Link></small>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </Fragment >
        < Fragment >
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Login into your account</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
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
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        noValidate
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </Fragment >
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { login })(Login)
