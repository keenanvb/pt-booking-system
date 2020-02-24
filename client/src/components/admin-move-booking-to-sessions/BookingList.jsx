import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import moment from 'moment'
import Dialog from '../dialog/Dialog'
import { connect } from 'react-redux'


const BookingList = ({ booking: { startDate, _id, status, type, users }, _index, changeStatus }) => {

    // const [showDialog, setShowDialog] = useState(false)

    // const toggleDialog = (e) => {
    //     setShowDialog(!showDialog)
    // }

    // const onDialogClick = (yesOrNo, id) => {
    //     if (yesOrNo === 'yes') {
    //         removeSingleSession(_id);
    //     }

    //     setShowDialog(!showDialog)
    // }

    // package: "5e36d164c42bfb841ac4f4d2"
    // _id: "5e1e1d131648194530431332"

    return (
        <div className="packages bg-light">
            <div className="package-info">
                <h2><Moment format='MMM Do YYYY, h:mm a'>{startDate}</Moment></h2>
                <h2>type {type} </h2>
                <div>
                    {users.length > 0 ?
                        <>
                            {users.map(({ name }) => {
                                return (
                                    <div>{name}</div>
                                )
                            })}
                        </>
                        : null}
                </div>
            </div>
            <div className="booking-status">
                <form className="form" onSubmit={(e) => console.log(e)}>

                    <div className="form-group">
                        <small className="form-text">Status</small>
                        <select name="status" required value={status} onChange={(e) => { changeStatus(_index, e.target.value) }}>
                            <option value="">* ----</option>
                            <option value="complete">complete</option>
                            <option value="cancellation">cancellation</option>
                        </select>
                    </div>
                </form>
            </div>
            {/* <div className="package-actions">
                <div>
                    <button onClick={() => { toggleDialog() }} className="btn btn-primary">Remove Session</button>
                </div>
            </div>
            {showDialog ?
                <Dialog title={'Remove Session'} callback={onDialogClick} id={_id}>
                    Please confirm you would like to remove this session
                </Dialog> : null
            } */}
        </div>
    )
}

// SessionList.propTypes = {
//     user: PropTypes.object.isRequired
// }

export default connect(null, {})(withRouter(BookingList))
