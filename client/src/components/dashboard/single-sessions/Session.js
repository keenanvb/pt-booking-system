import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserSingleSession } from '../../../actions'

import Spinner from '../../layout/Spinner'
import SessionList from './SessionList'


const Session = ({ adminClient: { sessionSingle, loading }, getUserSingleSession, match }) => {

    useEffect(() => {
        getUserSingleSession()
    }, [getUserSingleSession])

    return (
        <Fragment>
            {!sessionSingle || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Client Sessions</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Track and Manage client attendence</i>
                    </p>
                    <div className="dash-buttons">
                        <Link to="/dashboard" className="btn btn-light"><i className="text-primary"></i> Dashboard</Link>
                    </div>
                    {sessionSingle.length > 0 ? (
                        sessionSingle.map((sesh) => {
                            return (
                                <SessionList key={sesh._id} sesh={sesh} />
                            )
                        })
                    ) : <h4>No Single Sessions found ...</h4>}
                </Fragment>
            }
        </Fragment>
    )
}

Session.propTypes = {
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        adminClient: state.adminClient
    }
}

export default connect(mapStateToProps, { getUserSingleSession })(Session)