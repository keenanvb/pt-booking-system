import React, { Fragment, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAdminBookingCalendarEvents, updateAdminBooking, removeAdminBooking, setAlert } from '../../actions'
import moment from 'moment'
import uuid from 'uuid'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import Spinner from '../layout/Spinner'
import Dialog from '../dialog/Dialog'

const CalendarManageBooking = ({ adminBookingManage: { bookingEvents, loading },
    getAdminBookingCalendarEvents, updateAdminBooking, removeAdminBooking,
    history, setAlert }) => {

    let calendarRef = useRef()

    const [formData, setFormData] = useState({
        bookings: [],
        adminBookings: [],
        selectedId: '',
        name: '',
        actionType: '',
        change: '',
        revert: '',
        bookingLimit: ''
    });


    const [showDialog, setShowDialog] = useState(false)
    const [checked, setChecked] = useState(false)

    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(7, 'd').format('YYYY-MM-DD');
    let dateObj = {
        startDate,
        endDate
    }

    useEffect(() => {
        getAdminBookingCalendarEvents(dateObj)
        setFormData({
            bookings: loading || !bookingEvents ? [] : formateBookingEvents(bookingEvents),
            adminBookings: [],
            bookingLimit: 4
        })

        return (() => {
            getAdminBookingCalendarEvents(dateObj)
        })

    }, [getAdminBookingCalendarEvents, loading])

    const [firstDay, setFirstDate] = useState(new Date().getDay());

    const checkBookingExists = (bookingId, bookings) => {
        const arrayOfObject = [...bookings];
        const checkId = obj => obj.id === bookingId;
        return arrayOfObject.some(checkId)
    }

    const toggleDialog = (type, e) => {
        let id = e.event.id;
        let name = e.event.extendedProps.user.name

        let checkAdminBookings = checkBookingExists(id, adminBookings);
        let checkBookings = checkBookingExists(id, bookings);

        if (checkBookings && adminBookings.length === 0 && !checked) {
            if (type === 'confirm') {
                let confirmation = e.event.extendedProps.confirmation
                let confirmationChange = (confirmation === true ? false : true)
                setFormData({
                    ...formData,
                    selectedId: id,
                    name: name,
                    actionType: 'confirm',
                    change: confirmationChange
                })

            } else if (type === 'delete') {
                setFormData({
                    ...formData,
                    selectedId: id,
                    name: name,
                    actionType: 'delete'
                })
            } else if (type === 'update') {
                setFormData({
                    ...formData,
                    selectedId: id,
                    name: name,
                    actionType: 'update',
                    change: e.event.start,
                    revert: e
                })
            }
            setShowDialog(!showDialog)
        } else if (checkAdminBookings && checked) {
            if (type === 'update') {
                updateBooking(e)
            }
        } else {
            let errorArray = [];
            //manage calendar view
            if (checkBookings && checked && type === 'confirm') {
                errorArray.push('Confirm - Please select manage calendar')
                if (adminBookings.length > 0) {
                    errorArray.push('Please remove booking you have made for clients')
                }
            }

            if (checkBookings && !checked && type === 'confirm') {
                if (adminBookings.length > 0) {
                    errorArray.push('Please remove booking you have made for clients')
                }
            }


            if (checkBookings && checked && type === 'update') {
                errorArray.push('Update - Please select manage calendar')
                if (adminBookings.length > 0) {
                    errorArray.push('Please remove booking you have made for clients')
                }
                e.revert()
            }

            if (checkBookings && !checked && type === 'update') {
                if (adminBookings.length > 0) {
                    errorArray.push('Please remove booking you have made for clients')
                }
                e.revert()
            }

            if (checkBookings && checked && type === 'delete') {
                errorArray.push('Delete - Please select manage calendar')
                if (adminBookings.length > 0) {
                    errorArray.push('Please remove booking you have made for clients')
                }
            }

            if (checkBookings && !checked && type === 'delete') {
                if (adminBookings.length > 0) {
                    errorArray.push('Please remove booking you have made for clients')
                }
            }


            //booking client calendar view
            if (checkAdminBookings && !checked && type === 'update' && adminBookings.length > 0) {
                errorArray.push('Update - Please select client booking')
                e.revert()
            }

            errorArray.forEach((error) => {
                setAlert(error, 'danger')
            })
        }
    }

    const onDialogClick = (yesOrNo) => {
        const { actionType, selectedId, change, revert } = formData
        if (yesOrNo === 'yes') {
            if (actionType === 'confirm') {
                updateAdminBooking(selectedId, { confirmation: change });
            } else if (actionType === 'update') {
                updateAdminBooking(selectedId, { startDate: change });
            } else if (actionType === 'delete') {
                removeAdminBooking(selectedId);
            }
        } else if (yesOrNo === 'no' && actionType === 'update') {
            revert.revert();
            setFormData({
                ...formData,
                selectedId: '',
                name: '',
                actionType: '',
                change: ''
            })

        } else {

        }
        setFormData({
            ...formData,
            selectedId: '',
            name: '',
            actionType: '',
            change: ''
        })

        setShowDialog(!showDialog)
    }


    const formateBookingEvents = (bookingEvents) => {
        let newBookingEvents = [...bookingEvents];

        bookingEvents.forEach((bookingEvent, index) => {
            let hasPackage = bookingEvent.hasOwnProperty('package')
            let diplayHasPackage = '';
            hasPackage ? diplayHasPackage = 'Package Session' : diplayHasPackage = 'Single Session'
            let displayCompleted = bookingEvent.completed ? 'completed' : 'not complete'
            let name = `${bookingEvent.user.firstName} ${bookingEvent.user.lastName}`
            newBookingEvents[index] = {
                ...newBookingEvents[index],
                title:
                    bookingEvent.confirmation ?
                        `CONF ${(name).toUpperCase()}; ${diplayHasPackage};${displayCompleted}`
                        :
                        `TBC ${(name).toUpperCase()}; ${diplayHasPackage}; ${displayCompleted}`,
                start: bookingEvent.startDate,
                id: bookingEvent._id,
                textColor: 'black',
                backgroundColor: bookingEvent.confirmation ? 'light blue' : 'red',
                borderColor: bookingEvent.confirmation ? 'light blue' : 'red',
                editable: true,
            }

        });

        return newBookingEvents
    }

    const handleDateClick = (e) => {
        const { adminBookings, bookingLimit } = formData

        if (checked) {
            let id = uuid.v4();
            let user = { name: 'Lauren PT Booking Session' }
            let obj = {
                title: 'Lauren PT Booking Session',
                id: id,
                start: e.dateStr,
                // end:
                editable: true,
                backgroundColor: 'grey',
                borderColor: 'grey',
                user
            }

            if (adminBookings.length < bookingLimit) {
                let calendarApi = calendarRef.current.getApi()
                calendarApi.addEvent(obj)
                adminBookings.push(obj);
                setFormData({ ...formData, bookings });
            }
        } else {
            setAlert('Please ensure Create Booking is active', 'danger')
        }

    }

    const removeBooking = (bookingId) => {
        const { adminBookings } = formData
        let newBookings = adminBookings.filter((booking) => {
            return booking.id !== bookingId
        });

        setFormData({ ...formData, adminBookings: newBookings })

        //Applys when adding an event - clicking
        let calendarApi = calendarRef.current.getApi()
        let event = calendarApi.getEventById(bookingId);
        event.remove();
    }

    const updateBooking = (eventDropInfo) => {
        let newBookingState = [...adminBookings];

        adminBookings.forEach((booking, index) => {
            if (booking.id === eventDropInfo.event.id) {
                newBookingState[index] = {
                    ...newBookingState[index],
                    start: eventDropInfo.event.start,
                }
            } else {
                newBookingState[index] = {
                    ...newBookingState[index],
                }
            }
        })
        setFormData({ ...formData, adminBookings: newBookingState })

    }



    let { bookings, name, actionType, change, adminBookings } = formData

    return (
        <Fragment>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <input style={{ marginRight: '6px' }} type="checkbox" name="check" checked={checked} onChange={() => { setChecked(!checked) }} />
                {!checked ? 'Manage Caldendar' : 'Create Booking for client'}
                {!checked ? null :
                    <div>
                        {adminBookings && adminBookings.length > 0 ?
                            <div className='list-horizontal'>
                                {adminBookings.map((booking, index) => {
                                    return (
                                        <div className='list-item' key={index}>
                                            <h1 className='list-item-heading'>{moment(booking.start).format('MMM Do YYYY, h:mm a')}</h1>
                                            <button className='btn' onClick={() => { removeBooking(booking.id) }}>x </button>
                                        </div>
                                    )
                                })}</div>
                            :
                            null
                        }
                    </div>
                }
                {loading ? <Spinner /> :
                    <div>
                        {/* <div style={{ position: 'absolute', left: '20px', right: '20px' }}> */}
                        <FullCalendar
                            ref={calendarRef}
                            events={bookings}
                            header={{
                                left: 'prev,next today',
                                // left: 'today',
                                center: 'title',
                                right: 'timeGridWeek,timeGridDay,listWeek'
                                // right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            firstDay={firstDay}
                            // defaultView="dayGridMonth"
                            defaultView="timeGridWeek"
                            minTime={'05:00:00'}
                            maxTime={'23:00:00'}
                            // scrollTime={'12:00:00'} //get the time now 
                            nowIndicator={true}
                            slotDuration='00:15'
                            // addEvent={(e) => {
                            //     console.log('event', e)
                            // }}
                            eventDrop={(e) => {
                                toggleDialog('update', e)
                                // updateBooking(e);
                            }}
                            eventClick={(e) => {
                                toggleDialog('confirm', e)
                                // confirmBooking(e);
                            }}
                            // businessHours={{
                            //     // days of week. an array of zero-based day of week integers (0=Sunday)
                            //     daysOfWeek: [1, 2, 3, 4], // Monday - Thursday

                            //     startTime: '10:00', // a start time (10am in this example)
                            //     endTime: '18:00', // an end time (6pm in this example)
                            // }}
                            allDaySlot={false}
                            eventResize={(e) => {

                                let start = moment(e.event.start);
                                let end = moment(e.event.end);
                                var duration = moment.duration(end.diff(start));
                                let hours = duration.asHours();
                                if (hours < 1) {
                                    toggleDialog('delete', e)
                                    // removeBooking(e);
                                    e.revert();
                                } else if (hours !== 1) {
                                    toggleDialog('completed', e)
                                    e.revert();
                                }
                            }}
                            eventColor='blue'
                            weekends={true}
                            dateClick={(e) => { handleDateClick(e) }}
                            // selectOverlap={false}
                            // dateClick={(e) => {
                            // console.log('e', e)
                            // handleDateClick(e)
                            // }}
                            eventOverlap={true}
                            // overlap={false}
                            contentHeight={400}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]} />
                    </div>
                }

                {showDialog && actionType === 'confirm' ?
                    <Dialog title={`Booking Session CONFIRMATION`} callback={onDialogClick}>
                        Would you like to {change === true ? ' confirm ' : 'unconfirm '} this session  with {name}
                    </Dialog> : null
                }
                {showDialog && actionType === 'delete' ?
                    <Dialog title={'Booking Session REMOVE'} callback={onDialogClick}>
                        Are you sure you would like to delete this booking session?
                    </Dialog> : null
                }
                {showDialog && actionType === 'update' ?
                    <Dialog title={'Booking Session UPDATE'} callback={onDialogClick}>
                        Are you sure you would like to update this booking?
                    </Dialog> : null
                }
                {adminBookings.length > 0 ?
                    <div style={{ position: 'relative' }}>
                        <Link to={{
                            pathname: `/manage-booking-client/`, state: {
                                adminBookings: adminBookings
                            }
                        }} className="btn btn-primary">Next</Link>
                    </div> : null
                }

            </form>
        </Fragment >
    )
}

CalendarManageBooking.propTypes = {
    getAdminBookingCalendarEvents: PropTypes.func.isRequired,
    updateAdminBooking: PropTypes.func.isRequired,
    removeAdminBooking: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        adminBookingManage: state.adminBookingManage
    }
}

export default connect(mapStateToProps, { getAdminBookingCalendarEvents, updateAdminBooking, removeAdminBooking, setAlert })(withRouter(CalendarManageBooking))
