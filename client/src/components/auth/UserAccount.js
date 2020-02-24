import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const UserAccount = () => {

    return (
        <Fragment>
            <h1 className="large text-primary">
                User Account
           </h1>
            <div className="dash-buttons">
                <Link to="/user-account-password" className="btn btn-light"><i className="fas fa-user-edit text-primary"></i> Change Password</Link>
            </div>
        </Fragment>
    )
}

export default connect(null, {})(withRouter(UserAccount)) 
