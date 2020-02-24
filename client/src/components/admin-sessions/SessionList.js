import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import Dialog from '../dialog/Dialog'
import { connect } from 'react-redux'
import { removeSessionPackage } from '../../actions'

const PackageItem = ({ sesh: { startDate, _id, status }, history, match, removeSessionPackage }) => {

    const [showDialog, setShowDialog] = useState(false)


    const toggleDialog = (e) => {
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo, id) => {
        if (yesOrNo === 'yes') {
            removeSessionPackage(_id);
        }

        setShowDialog(!showDialog)
    }

    return (
        <div className="packages bg-light">
            <div className="package-info">
                <h2>{status} </h2>
                <h2><Moment format='DD/MM/YYYY'>{startDate}</Moment></h2>
            </div>
            <div className="package-actions">
                <div>
                    <button onClick={() => { toggleDialog() }} className="btn btn-primary">Remove Session</button>
                </div>
            </div>
            {showDialog ?
                <Dialog title={'Remove Session'} callback={onDialogClick} id={_id}>
                    Please confirm you would like to remove this session from the package
                </Dialog> : null
            }
        </div>
    )
}

// PackageItem.propTypes = {
//     user: PropTypes.object.isRequired
// }

// export default PackageItem

export default connect(null, { removeSessionPackage })(withRouter(PackageItem))
