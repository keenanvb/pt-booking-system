import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPackagesByUserId } from '../../actions'
import PackagesList from './PackagesList'

const Packages = ({ adminPT: { packages, loading }, getPackagesByUserId, match }) => {

    useEffect(() => {
        getPackagesByUserId(match.params.id)
    }, [getPackagesByUserId, match.params.id])

    return (
        <Fragment>
            {!packages || loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Client packages</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Track and Manage client attendence</i>
                    </p>
                    {packages.length > 0 ? (
                        packages.map((packageItem) => {
                            return (
                                <PackagesList key={packageItem._id} ptPackage={packageItem} />
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
    getPackagesByUserId: PropTypes.func.isRequired,
    packages: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        adminPT: state.adminPT
    }
}

export default connect(mapStateToProps, { getPackagesByUserId })(Packages);
