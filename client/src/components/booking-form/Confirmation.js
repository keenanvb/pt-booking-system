import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addBooking } from '../../actions'
import moment from 'moment'
import Dialog from '../dialog/Dialog'

const Confirmation = ({ booking: { type, userPackage, bookings }, addBooking, handleStepperClick }) => {

    const [showDialog, setShowDialog] = useState(false)

    const toggleDialog = () => {
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo) => {

        if (yesOrNo === 'yes') {
            let formData = {}
            if (type === 'once-off') {
                formData = {
                    type,
                    bookings
                }
            } else {
                let formatPackage = JSON.parse(userPackage);
                formData = {
                    type,
                    package: formatPackage._id,
                    bookings
                }
            }

            addBooking(formData);
            handleStepperClick('next')

        }
        setShowDialog(!showDialog)

    }

    return (
        <Fragment>
            {/* <h1 className="large text-primary">
                Booking Confirmation</h1>
            <p className="lead">
                <i ></i></p>
            <small>---</small> */}
            <div className='booking-confirmation-container'>
                <div>
                    <h1 className='lead'>Booking Type</h1>
                    <div>{type}</div>
                </div>
                <div>
                    <h1 className='lead'>Bookings</h1>
                    <div>{bookings.map((book) => {
                        return (
                            <div>{moment(book.start).format('MMMM Do YYYY, h:mm a')}</div>
                        )
                    })}</div>
                </div>
            </div>
            <div>
                <button className='btn btn-primary my-1' onClick={() => { handleStepperClick() }}>Prev </button>
                <button className='btn btn-primary my-1' onClick={() => { toggleDialog() }}>Next </button>
            </div>
            {showDialog ?
                <Dialog title={'Booking Confirmation'} callback={onDialogClick}>
                    Please confirm booking session/s
                </Dialog> : null
            }
        </Fragment>
    )
}



Confirmation.propTypes = {
    booking: PropTypes.object,
}

const mapStateToProps = (state) => {
    return {
        booking: state.booking
    }
}

export default connect(mapStateToProps, { addBooking })(withRouter(Confirmation))
