import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getLatestPackage, bookingUpdate, getBookingCalendarEvents } from '../../actions'
import moment from 'moment'

const FormTypeDetails = ({ booking: { lastestPackage, type, userPackage }, handleStepperClick, getLatestPackage, getBookingCalendarEvents, bookingUpdate }) => {


    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(7, 'd').format('YYYY-MM-DD');
    useEffect(() => {
        getLatestPackage()
        //calling function fo the next step
        getBookingCalendarEvents({ startDate, endDate });
    }, [])


    const onChange = (e) => {
        if (e.target.name === 'userPackage') {
            // setFormData({ ...formData, [e.target.name]: e.target.value })
            bookingUpdate({ prop: e.target.name, value: e.target.value })
        } else {
            // setFormData({ ...formData, [e.target.name]: e.target.value })
            bookingUpdate({ prop: e.target.name, value: e.target.value })
            bookingUpdate({ prop: 'userPackage', value: '' })
        }
    }


    const rendeSelectList = () => {
        if (lastestPackage && lastestPackage.length > 0) {
            return lastestPackage.map(({ _id, type, startDate }, index) => {
                let startDateFormate = moment(startDate).format('DD MM YYYY')
                return (
                    <option key={index} value={JSON.stringify({ _id })}>{`Package Available: ${type} - ${startDateFormate}`}</option>
                );
            });
        } else {
            return (
                <option value="" disabled >No package available</option>
            );
        }
    }

    return (
        <Fragment>
            {/* <h1 className="large text-primary">
                Booking</h1> */}
            <p className="lead">
                <i className=""></i> Please select the type of booking </p>
            {/* <small>---</small> */}
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <small className="form-text">Type of Booking</small>
                    <select name="type" required value={type} onChange={(e) => { onChange(e) }}>
                        <option value="" defaultValue disabled hidden>* ----</option>
                        <option value="once-off" >Once-off</option>
                        <option value="package">Active Package</option>
                    </select>
                </div>

                {type === 'package' && lastestPackage ?
                    <div className="form-group">
                        <small className="form-text">Package</small>
                        <select name="userPackage" required onChange={(e) => { onChange(e) }}>
                            <option value="">* Please select a active package</option>
                            {rendeSelectList()}
                        </select>
                    </div>
                    :
                    null
                }
                {type === 'once-off' ?
                    <div className="form-group">
                        <small className="form-text">Please select type of session</small>
                        <select name="sessionType" required onChange={(e) => { onChange(e) }}>
                            <option value="" defaultValue disabled hidden>* ----</option>
                            <option value="individual" >Individual</option>
                            <option value="group">Group</option>
                        </select>
                    </div>
                    :
                    null
                }
                {/* {type === 'single' && sessionType=='group' ?
                    <div className="form-group">
                        <small className="form-text">Please select how many people will be join</small>
                        <select name="sessionType" required onChange={(e) => { onChange(e) }}>
                            <option value="" defaultValue disabled hidden>* ----</option>
                            <option value="2" >Individual</option>
                            <option value="3">Group</option>
                            <option value="4">Group</option>
                            <option value="5">Group</option>
                        </select>
                    </div>
                    :
                    null
                } */}
            </form>
            {type === 'once-off' ?
                <div>
                    {/* <button className='btn btn-primary my-1' onClick={() => { handleStepperClick() }}>Prev </button> */}
                    <button className='btn btn-primary my-1' onClick={() => { handleStepperClick('next') }}>Next </button>
                </div> : null
            }
            {type === 'package' && userPackage ?
                <div>
                    {/* <button className='btn btn-primary my-1' onClick={() => { handleStepperClick() }}>Prev </button> */}
                    <button className='btn btn-primary my-1' onClick={() => { handleStepperClick('next') }}>Next </button>
                </div> : null
            }

        </Fragment>
    )
}

FormTypeDetails.propTypes = {
    getLatestPackage: PropTypes.func.isRequired,
    getBookingCalendarEvents: PropTypes.func.isRequired,
    bookingUpdate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        booking: state.booking
    }
}

export default connect(mapStateToProps, { getLatestPackage, bookingUpdate, getBookingCalendarEvents })(withRouter(FormTypeDetails))
