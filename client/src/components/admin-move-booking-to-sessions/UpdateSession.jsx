import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { submitConfirmedBookings, getConfirmedBookings } from '../../actions'
import BookingList from './BookingList'
import Spinner from '../layout/Spinner'
import moment from 'moment'
import Dialog from '../dialog/Dialog'

const UpdateSession = ({ adminBookingManage: { confirmedBookings, loading }, getConfirmedBookings, submitConfirmedBookings }) => {


    const [formData, setFormData] = useState({
        bookings: '',
    });

    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(1, 'd').format('YYYY-MM-DD');
    let dateObj = {
        startDate,
        endDate
    }

    useEffect(() => {
        getConfirmedBookings(dateObj);
        setFormData({
            bookings: loading || !confirmedBookings ? '' : formateConfirmedStatus(confirmedBookings),
        });


    }, [getConfirmedBookings, loading])



    const formateConfirmedStatus = (confirmedBookings) => {
        let newConfirmedBookings = [...confirmedBookings];
        confirmedBookings.forEach((bookingEvent, index) => {
            newConfirmedBookings[index] = {
                ...newConfirmedBookings[index],
                status: 'complete',
            }
        });

        return newConfirmedBookings

    }


    const changeStatus = (_index, status) => {
        let newbookings = [...bookings];

        newbookings.forEach((booking, index) => {
            if (_index === index) {
                newbookings[index] = {
                    ...bookings[index],
                    status: status,
                }
            }
        });

        setFormData({
            bookings: newbookings
        })
    }


    const [showDialog, setShowDialog] = useState(false)

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }


    const onDialogClick = (yesOrNo) => {
        if (yesOrNo === 'yes') {

            submitConfirmedBookings(formData);
        }

        setShowDialog(!showDialog)
    }

    const { bookings } = formData
    console.log('bookings', bookings);

    return (
        <Fragment>
            <h1 className="large text-primary">
                Submit todays confirmed sessions
           </h1>
            <p className="lead">
                {/* <i className="fas fa-user"></i> - */}
            </p>
            {/* <small>Please tell us about yourself</small> */}
            <form className="form" onSubmit={(e) => toggleDialog(e)}>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="admin">Go Back</Link>
            </form>
            {loading && !confirmedBookings ? <Spinner /> :
                (<>
                    {bookings.length > 0 ? (
                        bookings.map((booking, index) => {
                            return (
                                <BookingList key={booking._id} booking={booking} _index={index} changeStatus={changeStatus} />
                            )
                        })
                    ) : <h4>There are no Booking events available for update</h4>}
                </>)
            }
            {showDialog ?
                <Dialog title={'Confirm'} callback={onDialogClick}>
                    Are you sure you would like to sumbit the booking events for today?
                </Dialog> : null
            }
        </Fragment>
    )
}

UpdateSession.propTypes = {
    // createProfile: PropTypes.func.isRequired,
    // getCurrentProfile: PropTypes.func.isRequired,
    // profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    console.log('state.adminBookingManage', state.adminBookingManage)
    return {
        adminBookingManage: state.adminBookingManage
    }
};


export default connect(mapStateToProps, { submitConfirmedBookings, getConfirmedBookings })(withRouter(UpdateSession)) // wrap withRouter to get access to history
