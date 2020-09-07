import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCurrentProfile, loadUser } from '../../actions'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Stepper from './Stepper'

import FormTypeDetails from './FormTypeDetails'
import FormCalendarBookingDetails from './FormCalendarBookingDetails'
import Confirmation from './Confirmation'
import Success from './Success'

const BookingForm = ({ auth: { user }, profile: { profile, loading }, loadUser, getCurrentProfile }) => {


    useEffect(() => {
        loadUser();
        getCurrentProfile();
    }, [loadUser, getCurrentProfile]);

    const [currentStep, setCurrentStep] = useState(1);


    let handleStepperClick = (clickType) => {
        let newStep = currentStep;
        clickType === 'next' ? newStep++ : newStep--;
        if (newStep > 0 && newStep <= steps.length + 1) {
            setCurrentStep(newStep);
        }
    }

    let resetStep = () => {
        setCurrentStep(1);
    }

    let displayForm = () => {
        switch (currentStep) {
            case 1:
                return (
                    <FormTypeDetails handleStepperClick={handleStepperClick} />
                )
            case 2:
                return (
                    <FormCalendarBookingDetails handleStepperClick={handleStepperClick} />
                )
            case 3:
                return (
                    <Confirmation handleStepperClick={handleStepperClick} />
                )
            default:
                return (
                    <Success resetStep={resetStep} />
                )
        }

    }

    const steps = ['Select Type', 'Select Date', 'Confirm']



    return (loading && profile === null ?
        (
            <div>
                <Spinner />
            </div>
        )
        :
        (
            <Fragment>
                <h1 className="large text-primary">Booking</h1>
                {profile !== null ?
                    <Fragment>
                        <Stepper stepsArray={steps} direction='horizontal' currentStepNumer={currentStep} />
                        {displayForm()}
                    </Fragment> :
                    <Fragment>
                        <p>You have not set up a profile</p>
                        <Link to='/create-profile' className='btn btn-primary'>Create profile</Link>
                    </Fragment>
                }
            </Fragment >
        )
    )


}

BookingForm.propTypes = {
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

export default connect(mapStateToProps, { getCurrentProfile, loadUser })(BookingForm)
