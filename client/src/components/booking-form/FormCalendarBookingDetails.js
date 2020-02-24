import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bookingUpdate, getBookingCalendarEvents, setAlert } from '../../actions'
import moment from 'moment'
import uuid from 'uuid'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import Spinner from '../layout/Spinner'


const FormCalendarBookingDetails = ({ booking: { lastestPackage, booking, bookingEvents, loading }, handleStepperClick,
    getBookingCalendarEvents, bookingUpdate, setAlert }) => {

    let calendarRef = React.useRef()

    const [formData, setFormData] = useState({
        bookings: [],
        bookingLimit: 4,
        caldendarEvents: []
    });

    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(7, 'd').format('YYYY-MM-DD');

    useEffect(() => {
        getBookingCalendarEvents({ startDate, endDate });
        setFormData({
            caldendarEvents: loading || !bookingEvents ? [] : formateBookingEvents(bookingEvents),
            bookings: [],
            bookingLimit: 4
        })

        return (() => {
            getBookingCalendarEvents({ startDate, endDate });
        })

    }, [getBookingCalendarEvents, loading])


    const [firstDay, setFirstDate] = useState(new Date().getDay());



    const removeBooking = (bookingId) => {
        const { bookings } = formData
        let newBookings = bookings.filter((booking) => {
            return booking.id !== bookingId
        });

        setFormData({ ...formData, bookings: newBookings })

        //Applys when adding an event - clicking
        let calendarApi = calendarRef.current.getApi()
        let event = calendarApi.getEventById(bookingId);
        event.remove();
    }

    const formateBookingEvents = (bookingEvents) => {

        let newBookingEvents = [...bookingEvents];
        bookingEvents.forEach((bookingEvent, index) => {
            newBookingEvents[index] = {
                ...newBookingEvents[index],
                title: ' Session Booked',
                start: bookingEvent.startDate,
                id: bookingEvent._id,
                backgroundColor: 'red',
                borderColor: 'red'
            }
        });

        return newBookingEvents
    }

    const handleDateClick = (e) => {

        let currentDateTime = moment().format();
        let calDateTime = moment(e.dateStr).format()
        let currentDateTimePlus4hrs = moment().add(4, 'h').format();
        let errorArray = [];
        if (calDateTime > currentDateTime) {
            if (calDateTime > currentDateTimePlus4hrs) {
                const { bookings, bookingLimit } = formData
                let id = uuid.v4();
                let obj = {
                    title: 'Session',
                    id: id,
                    start: e.dateStr,
                    // end:
                    editable: true,
                    backgroundColor: 'green',
                    borderColor: 'green'
                }

                if (bookings.length < bookingLimit) {
                    let calendarApi = calendarRef.current.getApi()
                    calendarApi.addEvent(obj)
                    bookings.push(obj);
                    setFormData({ ...formData, bookings });
                }
            } else {
                errorArray.push('Please Book 4 hours in advanced')
            }
        } else {
            errorArray.push('Oooops we cant go back in time please select a date 4 hours ahead of time')
        }

        errorArray.forEach((error) => {
            setAlert(error, 'danger')
        })

    }

    const updateBooking = (eventDropInfo) => {

        let currentDateTime = moment().format();
        let calDateTime = moment(eventDropInfo.event.start).format()
        let currentDateTimePlus4hrs = moment().add(4, 'h').format();
        let errorArray = [];

        if (calDateTime > currentDateTime) {
            if (calDateTime > currentDateTimePlus4hrs) {
                let newBookingState = [...bookings];
                bookings.forEach((booking, index) => {
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
                setFormData({ ...formData, bookings: newBookingState })
            } else {
                errorArray.push('Please Book 4 hours in advanced')
                eventDropInfo.revert()
            }
        } else {
            errorArray.push('Oooops we cant go back in time please select a date 4 hours ahead of time')
            eventDropInfo.revert()
        }

        errorArray.forEach((error) => {
            setAlert(error, 'danger')
        })
    }


    let { bookings, caldendarEvents } = formData

    return (
        <Fragment>
            {/* <h1 className="large text-primary">
                Booking</h1> */}
            <p className="lead">
                <i className=""></i> Please select the date/s for the training session </p>
            {/* <small>---</small> */}
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                {bookings && bookings.length > 0 ?
                    <div className='list-horizontal'>
                        {bookings.map((booking, index) => {
                            return (
                                <div className='list-item' key={index}>
                                    <h1 className='list-item-heading'>{moment(booking.start).format('MMMM Do YYYY, h:mm a')}</h1>
                                    <button className='btn btn-danger' onClick={() => { removeBooking(booking.id) }}>x </button>
                                </div>
                            )
                        })}</div>
                    :
                    <div>No Session selected</div>
                }
                {loading ? <Spinner /> :
                    <FullCalendar
                        ref={calendarRef}
                        events={caldendarEvents}
                        header={{
                            // left: 'prev,next today',
                            left: 'today',
                            center: 'title',
                            // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            right: 'timeGridWeek,timeGridDay'
                        }}
                        firstDay={firstDay}
                        // defaultView="dayGridMonth"
                        defaultView="timeGridWeek"
                        minTime={'05:00:00'}
                        maxTime={'23:00:00'}
                        // scrollTime={'12:00:00'} //get the time now 
                        nowIndicator={true}
                        slotDuration='00:15'
                        // dayRenderInfo={(e) => { console.log('e', e) }}
                        // addEvent={(e) => {
                        //     console.log('event', e)
                        // }}
                        // eventBackgroundColor={'red'}
                        // eventBorderColor={'red'}
                        eventDrop={(eventDropInfo) => {
                            updateBooking(eventDropInfo);

                        }}
                        // eventClick={(eventClickInfo) => {
                        //     console.log('eventClickInfo event', eventClickInfo.event);
                        // }}
                        allDaySlot={false}
                        eventResize={(info) => {
                            // alert(info.event.title + " end is now " + info.event.end);
                            let start = moment(info.event.start);
                            let end = moment(info.event.end);
                            var duration = moment.duration(end.diff(start));
                            let hours = duration.asHours();
                            if (hours !== 1) {
                                info.revert();
                            }
                        }}
                        eventColor='blue'
                        weekends={true}
                        // selectOverlap={false}
                        dateClick={(e) => { handleDateClick(e) }}
                        eventOverlap={false}
                        overlap={false}
                        contentHeight={400}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]} />
                }

            </form>

            <div>
                <button className='btn btn-primary my-1' onClick={() => { handleStepperClick() }}>Prev </button>
                {bookings && bookings.length > 0 ?
                    <button className='btn btn-primary my-1' onClick={() => {
                        bookingUpdate({ prop: 'bookings', value: bookings })
                        handleStepperClick('next')
                    }}>Next </button>

                    : null}
            </div>
        </Fragment >
    )
}

FormCalendarBookingDetails.propTypes = {
    getBookingCalendarEvents: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        booking: state.booking
    }
}

export default connect(mapStateToProps, { getBookingCalendarEvents, bookingUpdate, setAlert })(withRouter(FormCalendarBookingDetails))
