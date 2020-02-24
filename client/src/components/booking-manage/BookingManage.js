import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bookingManageUpdate, getUpAndCommingBooking, setAlert, removeBooking } from '../../actions'
import moment from 'moment'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import Spinner from '../layout/Spinner'
import Dialog from '../dialog/Dialog'


const BookingManage = ({ bookingManage: { upAndCommingBookings, bookingSelectedValue, loading },
    getUpAndCommingBooking, bookingManageUpdate, setAlert, removeBooking }) => {

    const [bookingId, setBookingId] = useState('')

    let calendarRef = React.useRef()

    let startDate = moment().format('YYYY-MM-DD');
    let time = moment().format('HH:MM:SS');
    let firstDay = new Date().getDay();
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {

        getUpAndCommingBooking(bookingSelectedValue, { startDate });
        return (() => {
            getUpAndCommingBooking(bookingSelectedValue, { startDate });
        })

    }, [getUpAndCommingBooking, loading, bookingSelectedValue])

    let toggleDialog = (e) => {
        let now = moment(new Date());
        let start = moment(e.event.start);
        let duration = moment.duration(start.diff(now));
        let hours = duration.hours();
        let days = duration.days();
        let errorArray = [];
        if (days === 0) {

            if (hours <= 6) {
                let hrStr = ''
                if (hours < 0) {
                    hrStr = 'session complete'
                } else {
                    hrStr = hours;
                }
                errorArray.push(`Can not cancel ${hrStr}. Please allow for 6 or more hours before the session`)

            } else {
                setBookingId(e.event.id)
                setShowDialog(!showDialog)

            }
        } else {
            setBookingId(e.event.id)
            setShowDialog(!showDialog)

        }
        errorArray.forEach((error) => {
            setAlert(error, 'danger')
        })

    }

    const onDialogClick = (yesOrNo) => {

        if (yesOrNo === 'yes') {
            removeBooking(bookingId);
        }

        setShowDialog(!showDialog)
    }

    // const [firstDay, setFirstDate] = useState(new Date().getDay());

    let onChange = (e) => {
        bookingManageUpdate({ prop: e.target.name, value: e.target.value })
    }

    // const removeBooking = (bookingId) => {
    //     const { bookings } = formData
    //     let newBookings = bookings.filter((booking) => {
    //         return booking.id !== bookingId
    //     });

    //     setFormData({ ...formData, bookings: newBookings })

    //     //Applys when adding an event - clicking
    //     let calendarApi = calendarRef.current.getApi()
    //     let event = calendarApi.getEventById(bookingId);
    //     event.remove();
    // }

    const formateBookingEvents = (bookingEvents) => {

        //check if its confirmed or not
        let newBookingEvents = [...bookingEvents];
        bookingEvents.forEach((bookingEvent, index) => {
            newBookingEvents[index] = {
                ...newBookingEvents[index],
                title: bookingEvent.confirmation ? 'Session Confirmed' : 'Session TBC',
                start: bookingEvent.startDate,
                id: bookingEvent._id,
                backgroundColor: bookingEvent.confirmation ? 'red' : 'orange',
                borderColor: bookingEvent.confirmation ? 'red' : 'orange',
                // editable: bookingEvent.confirmation ? false : true
            }
        });

        return newBookingEvents
    }

    let choices = [
        { text: "ALL", defaultChecked: true, value: 'all' },
        { text: "BOOKING - CONFIRMED", value: 'true' },
        { text: "BOOKING - TO BE CONFIRMED", value: 'false' }
    ]

    return (
        <Fragment>

            {loading ? <Spinner /> :
                (<>
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <small className="form-text">Please select an option</small>
                            {choices.map((choice, index) => (
                                <label key={index}>
                                    <input type="radio"
                                        name="bookingSelectedValue"
                                        value={choice.value}
                                        key={index}
                                        checked={bookingSelectedValue === choice.value}
                                        onChange={(e) => onChange(e)} />
                                    <> {choice.text} <br /></>
                                </label>
                            ))}
                        </div>
                    </form>
                    {/* <div style={{ position: 'absolute', left: '0px', right: '0px' }}> */}
                    <div>
                        <FullCalendar
                            ref={calendarRef}
                            events={formateBookingEvents(upAndCommingBookings)}
                            header={{
                                left: 'next today',
                                center: 'title',
                                // right: 'timeGridDay,listWeek'
                                right: 'timeGridWeek,timeGridDay,listWeek'

                            }}
                            firstDay={firstDay}
                            defaultView="listWeek"
                            minTime={'05:00:00'}
                            maxTime={'23:00:00'}
                            scrollTime={time}
                            nowIndicator={true}
                            slotDuration='00:15'
                            allDaySlot={false}
                            eventClick={(e) => {
                                toggleDialog(e)
                            }}
                            eventColor='blue'
                            weekends={true}
                            // selectOverlap={false}
                            eventOverlap={false}
                            overlap={false}
                            contentHeight={400}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]} />
                    </div>
                </>)

            }
            {showDialog ?
                <Dialog title={'Remove booking session'} callback={onDialogClick}>
                    Are you sure you would like to remove this booking?
                     </Dialog> : null
            }

        </Fragment >
    )
}

BookingManage.propTypes = {
    getUpAndCommingBooking: PropTypes.func.isRequired,
    bookingManageUpdate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        bookingManage: state.bookingManage
    }
}

export default connect(mapStateToProps, { getUpAndCommingBooking, bookingManageUpdate, removeBooking, setAlert })(withRouter(BookingManage))
