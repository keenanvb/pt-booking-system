import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { updatePassword } from '../../actions'
import PropTypes from 'prop-types'
import { strengthIndicator, strengthColour } from '../layout/passwordStrengthIndicator'

const UserAccountPassword = ({ updatePassword }) => {

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const [isPasswordShown, setPassword] = useState(false)

    const togglePasswordVisiblity = () => {
        setPassword(!isPasswordShown);
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        updatePassword({ currentPassword, newPassword });
    }



    const { currentPassword, newPassword } = formData

    const strength = strengthIndicator(newPassword);
    const colour = strengthColour(strength)


    return (
        < Fragment >
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <small className="form-text">Current Password</small>
                    <div className="email">
                        <input
                            placeholder="password"
                            type={isPasswordShown ? 'text' : 'password'}
                            name="currentPassword"
                            noValidate
                            value={currentPassword}
                            onChange={onChange}
                        />
                        <i
                            className={`password-icon ${isPasswordShown ? 'fas fa-eye' : 'fa fa-eye-slash'}`}
                            onClick={() => { togglePasswordVisiblity() }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <small className="form-text">New Password</small>
                    <div className="password">
                        <input
                            placeholder="password"
                            type={isPasswordShown ? 'text' : 'password'}
                            name="newPassword"
                            noValidate
                            value={newPassword}
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
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/user-account">Go Back</Link>
            </form>
        </Fragment >
    )
}

UserAccountPassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated
    }
}

export default connect(mapStateToProps, { updatePassword })(UserAccountPassword)
