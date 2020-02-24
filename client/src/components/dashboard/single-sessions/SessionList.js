import React from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
// import Dialog from '../../dialog/Dialog'
import { connect } from 'react-redux'
import { removeSingleSession } from '../../../actions'

const SessionList = ({ sesh: { startDate, _id, status }, history, match, removeSingleSession }) => {

    // const [showDialog, setShowDialog] = useState(false)


    // const toggleDialog = (e) => {
    //     setShowDialog(!showDialog)
    // }

    // const onDialogClick = (yesOrNo, id) => {
    //     if (yesOrNo === 'yes') {

    //     }

    //     setShowDialog(!showDialog)
    // }

    return (
        <div className="packages bg-light">
            <div className="package-info">
                <h2><Moment format='MMMM Do YYYY, h:mm a'>{startDate}</Moment></h2>
                <h2>{status} </h2>
            </div>
            {/* <div className="package-actions">
                <div>
                    <button onClick={() => { toggleDialog() }} className="btn btn-primary">Dispute Session</button>
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

export default connect(null, { removeSingleSession })(withRouter(SessionList))
