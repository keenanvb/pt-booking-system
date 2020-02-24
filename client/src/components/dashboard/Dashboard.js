import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, loadUser } from '../../actions'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
// import Goal from './Goal'
// import Stats from './Stats'


const Dashboard = ({ auth: { user }, profile: { profile, loading }, getCurrentProfile, loadUser }) => {


    useEffect(() => {
        loadUser();
        getCurrentProfile();
    }, [getCurrentProfile, loadUser]);

    // const [step, setStep] = useState(1);

    // let nextStep = () => {
    //     setStep(2)
    // }

    // let prevStep = () => {
    //     setStep(1)
    // }

    // let displaySteps = () => {
    //     switch (step) {
    //         case 1:
    //             return (
    //                 <Goal goals={profile.goals} prevStep={prevStep} nextStep={nextStep} />
    //             )
    //         case 2:
    //             return (
    //                 <Stats stats={profile.stats} prevStep={prevStep} nextStep={nextStep} />
    //             )
    //         default:
    //             return (
    //                 <div></div>
    //             )
    //     }

    // }



    return (loading && profile === null ?
        (
            <div>
                <Spinner />
            </div>
        )
        :
        (
            <Fragment>

                <h1 className="large text-primary">Dashboard
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i>Welcome {user && user.name}</p>
                {profile !== null ?
                    <Fragment>
                        <DashboardActions />
                        {/* {displaySteps()} */}
                    </Fragment> :
                    <Fragment>
                        <p>You have not set up a profile</p>
                        <Link to='/create-profile' className='btn btn-primary'>Create profile</Link>
                    </Fragment>}
            </Fragment>
        )
    )


}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        profile: state.profile
    }
};

export default connect(mapStateToProps, { getCurrentProfile, loadUser })(Dashboard)
