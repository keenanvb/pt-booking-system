import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import Dialog from '../../dialog/Dialog'
import { connect } from 'react-redux'
import { } from '../../../actions'

const SessionItem = ({ sesh: { date, _id, status }, history, match }) => {

    const [showDialog, setShowDialog] = useState(false)


    const toggleDialog = (e) => {
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo, id) => {
        if (yesOrNo === 'yes') {

            // removeSession(match.params.id, _id);
            // addSession(match.params.id, formData, history)
        }

        setShowDialog(!showDialog)
    }

    return (
        <div className="packages bg-light">
            <div className="package-info">
                <h2><Moment format='DD/MM/YYYY'>{date}</Moment></h2>
                <h2>{status} </h2>
            </div>
            <div className="package-actions">
                <div>
                    <button onClick={() => { toggleDialog() }} className="btn btn-primary">Dispute Session</button>
                </div>
            </div>
            {showDialog ?
                <Dialog title={'Dispute Session'} callback={onDialogClick} id={_id}>
                    Please confirm you would like to Dispute this session
                </Dialog> : null
            }
        </div>
    )
}

SessionItem.propTypes = {
    sesh: PropTypes.object.isRequired
}



export default connect(null, {})(withRouter(SessionItem))
