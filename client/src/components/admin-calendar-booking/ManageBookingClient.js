import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBookingCalendarPackageUsers, getAdminBookingCalendarEvents, getBookingCalendarLatestPackage, bookingCalendarUpdate, addAdminBookingCalendarEvents } from '../../actions'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Dialog from '../dialog/Dialog'

const ManageBookingClient = ({ adminBookingManage: { clients, loading, lastestPackage, selectedUserId },
    location: { state: { adminBookings } }, getBookingCalendarLatestPackage,
    getBookingCalendarPackageUsers, bookingCalendarUpdate, addAdminBookingCalendarEvents,
    getAdminBookingCalendarEvents,
    history }) => {

    const [formData, setFormData] = useState({
        type: '',
        packageId: ''
    });


    const [showDialog, setShowDialog] = useState(false)

    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(7, 'd').format('YYYY-MM-DD');
    let dateObj = {
        startDate,
        endDate
    }

    useEffect(() => {
        getBookingCalendarPackageUsers()
        getBookingCalendarLatestPackage(selectedUserId)

        return (() => {
            getAdminBookingCalendarEvents(dateObj)
        })

    }, [getBookingCalendarPackageUsers, getBookingCalendarLatestPackage, selectedUserId, loading])

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }



    const onChange = (e) => {
        if (e.target.name === 'selectedUserId') {
            let obj = JSON.parse(e.target.value);
            const { user } = obj;

            bookingCalendarUpdate({ prop: 'selectedUserId', value: user });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        // bookingCalendarUpdate({ prop: e.target.name, value: e.target.value })
        // bookingUpdate({ prop: e.target.name, value: e.target.value })
    }

    const onDialogClick = (yesOrNo) => {
        if (yesOrNo === 'yes') {
            const { type, packageId } = formData
            let bookings = {}
            if (type === 'once-off') {
                bookings = {
                    type,
                    bookings: adminBookings,
                    user: selectedUserId
                }
            } else {
                let formatedPackageId = JSON.parse(packageId)._id
                bookings = {
                    type,
                    packageId: formatedPackageId,
                    bookings: adminBookings,
                    user: selectedUserId
                }
            }
            addAdminBookingCalendarEvents(bookings)
        }
        setShowDialog(!showDialog)
    }



    const { type, packageId } = formData

    const rendeSelectPackageList = () => {
        if (lastestPackage && lastestPackage.length > 0) {
            return lastestPackage.map(({ _id, startDate, type }, index) => {
                let startDateFormate = moment(startDate).format('DD MM YYYY')
                return (
                    <option key={index} value={JSON.stringify({ _id })}>{`package available: ${startDateFormate} - ${type}`}</option>

                );
            });
        } else {
            return (
                <option value="" disabled >No package available</option>
            );
        }
    }


    const rendeSelectUserList = () => {
        if (clients.length > 0) {
            return clients.map(({ _id, firstName, lastName }, index) => {
                let name = `${firstName} ${lastName}`
                return (
                    <option key={index} value={JSON.stringify({ user: _id })}>{name}</option>
                );
            });
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Booking Client</h1>
            {/* <p className="lead">
                <i className="fas fa-user"></i></p> */}
            <form className="form" onSubmit={(e) => toggleDialog(e)}>
                <div>
                    {adminBookings && adminBookings.length > 0 ?
                        <div className='list-horizontal'>
                            {adminBookings.map((booking, index) => {
                                return (
                                    <div className='list-item' key={index}>
                                        <h1 className='list-item-heading'>{moment(booking.start).format('MMM Do YYYY, h:mm a')}</h1>
                                    </div>
                                )
                            })}</div>
                        :
                        <div>No Session selected</div>
                    }
                </div>
                {!loading ?
                    <div className="form-group">
                        <small className="form-text">Add clients</small>
                        <select name="selectedUserId" required onChange={(e) => {
                            onChange(e)
                        }}>
                            {/* <option value="" defaultValue disabled hidden>* ----</option> */}
                            <option value="" hidden>* ----</option>
                            {rendeSelectUserList()}
                        </select>
                    </div> : <Spinner />
                }
                <div className="form-group">
                    <small className="form-text">Type of Booking</small>
                    <select name="type" required value={type} onChange={(e) => {
                        onChange(e)
                    }}>
                        <option value="" defaultValue disabled hidden>* ----</option>
                        <option value="once-off" >Once off</option>
                        <option value="package">Package</option>
                    </select>
                </div>
                {type === 'package' && lastestPackage ?
                    <div className="form-group">
                        <small className="form-text">Package</small>
                        <select name="packageId" required value={packageId} onChange={(e) => { onChange(e) }}>
                            <option value="" disabled>* Please select a package</option>
                            {/* <option value="" defaultValue disabled hidden>* Please select a packag</option> */}
                            {rendeSelectPackageList()}
                        </select>
                    </div>
                    :
                    null
                }
                <input type="submit" className="btn btn-primary my-1" />
            </form>
            <div>
                <Link to={`/admin-manage-booking/`} className="btn btn-primary">Back</Link>
            </div>
            {showDialog ?
                <Dialog title={'Add Booking'} callback={onDialogClick}>
                    Please confirm booking
                </Dialog> : null
            }
        </Fragment>
    )
}




ManageBookingClient.propTypes = {
    getBookingCalendarLatestPackage: PropTypes.func.isRequired,
    getBookingCalendarPackageUsers: PropTypes.func.isRequired,
    bookingCalendarUpdate: PropTypes.func.isRequired,
    addAdminBookingCalendarEvents: PropTypes.func.isRequired,
    getAdminBookingCalendarEvents: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        adminBookingManage: state.adminBookingManage
    }
};

export default connect(mapStateToProps, {
    getBookingCalendarPackageUsers, getBookingCalendarLatestPackage,
    bookingCalendarUpdate, addAdminBookingCalendarEvents, getAdminBookingCalendarEvents
})(ManageBookingClient)
