import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSessionsByPackageId } from '../../actions'
import Spinner from '../layout/Spinner'
import SessionList from './SessionList'


const PackageItem = ({ adminPT: { sessionPackage, loading }, getSessionsByPackageId, match }) => {

    useEffect(() => {
        getSessionsByPackageId(match.params.id)
    }, [getSessionsByPackageId, match.params.id])

    return (
        <Fragment>
            {!sessionPackage || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Client Sessions</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Track and Manage client attendence</i>
                    </p>
                    <div>
                        <Link to={`/admin-package-add-session/${match.params.id}`} className="btn btn-primary">Add Session</Link>
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

PackageItem.propTypes = {
    location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        adminPT: state.adminPT
    }
}

export default connect(mapStateToProps, { getSessionsByPackageId })(PackageItem)