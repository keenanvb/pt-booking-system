import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllProfiles } from '../../actions'
import ProfileItem from './ProfileItem'

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {

    useEffect(() => {
        getAllProfiles()
    }, [getAllProfiles]);

    return (
        <Fragment>
            {loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Members</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop">----</i>
                    </p>
                    {profiles.length > 0 ? (
                        profiles.map((profile) => {
                            return (
                                <ProfileItem key={profile._id} profile={profile} />
                            )
                        })
                    ) : <h4>No profiles found...</h4>}
                </Fragment>
            }
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
