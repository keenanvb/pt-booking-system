import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserSessionsByPackageId } from '../../../actions'

import Spinner from '../../layout/Spinner'
import SessionList from './SessionList'


const Session = ({ adminClient: { sessionPackage, loading }, getUserSessionsByPackageId, match }) => {

    useEffect(() => {
        getUserSessionsByPackageId(match.params.id)
    }, [getUserSessionsByPackageId, match.params.id])

    return (
        <Fragment>
            {!sessionPackage || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">My Sessions</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Attendence</i>
                    </p>
                    <div className="dash-buttons">
                        <Link to="/packages" className="btn btn-light"><i className="text-primary"></i> Packages</Link>
                    </div>
                    {sessionPackage.length > 0 ? (
                        sessionPackage.map((sesh) => {
                            return (
                                <SessionList key={sesh._id} sesh={sesh} />
                            )
                        })
                    ) : <h4>No Sessions found in Package...</h4>}
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

export default connect(mapStateToProps, { getUserSessionsByPackageId })(Session)