import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { adminAddGoal } from '../../../actions'

import Dialog from '../../dialog/Dialog'

const EditGoal = ({ adminAddGoal, history, match }) => {
    const [formData, setFormData] = useState({
        text: '',
    });

    const [showDialog, setShowDialog] = useState(false)


    const { text } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo) => {

        if (yesOrNo === 'yes') {
            adminAddGoal(match.params.id, formData, history)
        }
        setShowDialog(!showDialog)

    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add A Goal </h1>
            <p className="lead">
                <i className=""></i> Get ready to smash all your goals </p>
            <small>--</small>
            <form className="form" onSubmit={(e) => toggleDialog(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Add Goal" name="text" required value={text} onChange={(e) => { onChange(e) }} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to={`/admin-user-profile/${match.params.id}`}>Go Back</Link>
            </form>
            {showDialog ?
                <Dialog title={'Goal'} callback={onDialogClick}>
                    Please confirm you would like to add this Goal
                </Dialog> : null
            }

        </Fragment>
    )
}

EditGoal.propTypes = {
    adminAddGoal: PropTypes.func.isRequired,
}

export default connect(null, { adminAddGoal })(withRouter(EditGoal))
