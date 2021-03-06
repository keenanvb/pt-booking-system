import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../../layout/Spinner'
import { getUserProfileBYId } from '../../../actions'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileGoal from './ProfileGoal'
import ProfileStats from './ProfileStats'

const Profile = ({ getUserProfileBYId, profileAdmin: { profile, loading }, auth, match }) => {
    useEffect(() => {
        getUserProfileBYId(match.params.id)
    }, [getUserProfileBYId, match.params.id])

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :
                <Fragment>
                    <Link className="btn btn-light" to="/admin">Back to clients</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id
                        && (<Link className="btn btn-light" to="/edit-profile">Edit Profile</Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-goal bg-white p-2">
                            <h2 className="text-primary">Goals</h2>
                            <div className="dash-buttons">
                                <Link to={`/admin-add-goal/${profile._id}`} className="btn btn-light"><i className="text-primary"></i> Add Goal</Link>
                                <Link to="/admin-edit-goals" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Edit Goals</Link>
                                <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Download xls</Link>
                            </div>
                            {profile.goals.length > 0 ? (<Fragment>
                                {profile.goals.map((goal, index) => {
                                    return (<ProfileGoal key={goal._id} goal={goal} />)
                                })}
                            </Fragment>) : <h4>No Goals set</h4>}
                        </div>
                        <div className="profile-stats bg-white p-2">
                            <h2 className="text-primary">Stats</h2>
                            <div className="dash-buttons">
                                <Link to={`/admin-add-stats/${profile._id}`} className="btn btn-light"><i className="text-primary"></i> Add Stats</Link>
                                <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Edit Stats</Link>
                                <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i> Download xls</Link>
                            </div>
                            {profile.stats.length > 0 ? (<Fragment>
                                {profile.stats.map((stats, index) => {
                                    return (<ProfileStats key={stats._id} stats={stats} />)
                                })}
                            </Fragment>) : <h4>No Stats</h4>}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getUserProfileBYId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profileAdmin: state.profileAdmin,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getUserProfileBYId })(Profile)
