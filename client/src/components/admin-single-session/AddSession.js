import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addSingleSession } from '../../actions'
import DatePicker from "react-datepicker";
import Dialog from '../dialog/Dialog'

const AddSession = ({ addSingleSession, history, match }) => {
    const [formData, setFormData] = useState({
        status: ''
    });

    const [showDialog, setShowDialog] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const { status } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     addSession(match.params.id,formData, history)
    // }

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo) => {
        if (yesOrNo === 'yes') {
            let sessionData = { status, startDate }
            addSingleSession(match.params.id, sessionData, history)
        }

        setShowDialog(!showDialog)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Session</h1>
            <p className="lead">
                <i className=""></i> Add Session to Individual sessions </p>
            <small>--</small>
            <form className="form" onSubmit={(e) => toggleDialog(e)}>
                <div className="form-group">
                    <small className="form-text">Package Start date</small>
                    <DatePicker
                        selected={startDate}
                        // value={completed}
                        name="startDate"
                        // onChange={(e) => { onChange(e) }}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        // timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMM d, yyyy h:mm aa"
                    />
                </div>
                <div className="form-group">
                    <small className="form-text">Status of session</small>
                    <select name="status" required value={status} onChange={(e) => { onChange(e) }}>
                        <option value="" defaultValue disabled hidden>* ----</option>
                        <option value="complete">complete</option>
                        <option value="cancellation">cancellation</option>
                    </select>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/admin">Go Back</Link>
            </form>
            {showDialog ?
                <Dialog title={'Session'} callback={onDialogClick}>
                    Please confirm you would like to add this Session
                </Dialog> : null
            }

        </Fragment>
    )
}

AddSession.propTypes = {
    addSession: PropTypes.func.isRequired,
}

export default connect(null, { addSingleSession })(withRouter(AddSession))
