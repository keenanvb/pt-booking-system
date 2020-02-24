import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Stepper = ({ stepsArray, direction, currentStepNumer }) => {

    const [steps, setStep] = useState(stepsArray);

    const updatestep = (stepNumber, stepsState) => {
        //Completed - checkmark
        //selected - fill with colour
        //highlighted - desc bold

        const newSteps = [...stepsState];
        let stepCounter = 0;
        //current step
        //pass steps
        //future step
        while (stepCounter < newSteps.length) {
            //Current step
            if (stepCounter === stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    completed: false,
                    highlighted: true,
                    selected: true,

                }
                stepCounter++;
                // Past step
            } else if (stepCounter < stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    completed: true,
                    highlighted: false,
                    selected: true,
                }
                stepCounter++;
                //future step    
            } else {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    completed: false,
                    highlighted: false,
                    selected: false,
                }
                stepCounter++;
            }
        }
        return newSteps
    }

    useEffect(() => {

        const stepsState = stepsArray.map((step, index) => {
            const stepObj = {}
            stepObj.description = step;
            stepObj.completed = false;
            stepObj.selected = index === 0 ? true : false
            stepObj.highlighted = index === 0 ? true : false
            return stepObj
        })
        const currentSteps = updatestep(currentStepNumer - 1, stepsState);
        setStep(currentSteps);

    }, [currentStepNumer, stepsArray])

    const displaySteps = steps.map((step, index) => {
        return (
            <div className={`step-wrapper-${direction}`} key={index}>
                <div className={`step-number-${direction} ${step.selected ? 'step-number-active' : 'step-number-disabled'}`}>{step.completed ? <span>&#10003;</span> : index + 1}</div>
                <div className={`step-description && ${step.highlighted && 'step-description-active'}`}>{step.description}</div>
                <div
                    className={index !== steps.length - 1 ? `step-divider-${direction} divider-${direction}-${steps.length}` : ''}>

                </div>
            </div >
        )
    })

    return (
        <Fragment>
            <div className={`step-container-${direction}`}>
                <div className={`step-${direction}`}>
                    {displaySteps}
                </div>
            </div>

        </Fragment>
    )



}

Stepper.propTypes = {
    stepsArray: PropTypes.array.isRequired,
}

export default connect(null, {})(Stepper)
