import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSingleSessionByUserId } from '../../actions'

import Spinner from '../layout/Spinner'
import SessionList from './SessionList'


const PackageItem = ({ adminPT: { sessionSingle, loading }, getSingleSessionByUserId, match }) => {

    useEffect(() => {
        getSingleSessionByUserId(match.params.id)
    }, [getSingleSessionByUserId, match.params.id])

    return (
        <Fragment>
            {!sessionSingle || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Client Sessions</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Track and Manage client attendence</i>
                    </p>
                    <div>
                        <Link to={`/admin-add-single-session/${match.params.id}`} className="btn btn-primary">Add Session</Link>
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

PackageItem.propTypes = {
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        adminPT: state.adminPT
    }
}

export default connect(mapStateToProps, { getSingleSessionByUserId })(PackageItem)