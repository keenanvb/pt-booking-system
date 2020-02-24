import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../../layout/Spinner'
import { getUserPackages } from '../../../actions'
import PackagesList from './PackagesList'
import { Link } from 'react-router-dom'

const Packages = ({ adminClient: { packages, loading }, getUserPackages }) => {

    useEffect(() => {
        getUserPackages()
    }, [getUserPackages])


    return (
        <Fragment>
            {!packages || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">My Packages</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Packages</i>
                    </p>
                    <div className="dash-buttons">
                        <Link to="/dashboard" className="btn btn-light"><i className="text-primary"></i> Dashboard</Link>
                    </div>
                    {/* <div>
                        <Link to={'/dashboard'} className="btn btn-primary">dashboard</Link>
                    </div> */}
                    {packages.length > 0 ? (
                        packages.map((packageItem) => {
                            return (
                                < PackagesList key={packageItem._id} ptPackage={packageItem} />
                            )
                        })
                    ) : <div><h4>No Packages found...</h4>

                        </div>}
                </Fragment>
            }
        </Fragment>
    )
}

Packages.propTypes = {
    getUserPackages: PropTypes.func.isRequired,
    adminClient: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        adminClient: state.adminClient
    }
}

export default connect(mapStateToProps, { getUserPackages })(Packages);
