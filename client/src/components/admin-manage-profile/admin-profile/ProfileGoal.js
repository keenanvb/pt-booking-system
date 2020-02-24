import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteGoal } from '../../../actions'

const ProfileGoal = ({ goal: { _id, date, text, completed }, deleteGoal }) => {

    // const toggleDialog = (e) => {
    //     setShowDialog(!showDialog)
    // }

    // const onDialogClick = (yesOrNo, id) => {
    //     if (yesOrNo === 'yes') {

    //         removeSession(match.params.id, _id);
    //         // addSession(match.params.id, formData, history)
    //     }

    //     setShowDialog(!showDialog)
    // }

    // const onDelete = (id) => {
    //     deleteGoal(id)
    // }

    return (
        <div>
            <h3 className="text-dark">{text}</h3>
            <p>
                <Moment format="DD/MM/YYYY">{date}</Moment >
            </p>
            <p>
                <strong>completed</strong> {completed}
                <strong>_id</strong> {_id}
            </p>
            <p>
                <strong>text</strong> {text}
            </p>
            {/* <p>
                <button onClick={() => {
                    onDelete(_id)
                }} className='btn btn-danger'>Delete</button>
            </p> */}
        </div>

    )
}

ProfileGoal.propTypes = {
    goal: PropTypes.object.isRequired
}

// export default ProfileGoal

export default connect(null, { deleteGoal })(ProfileGoal)
