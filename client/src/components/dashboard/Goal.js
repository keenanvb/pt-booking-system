import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteGoal } from '../../actions'

const Goal = ({ deleteGoal, goals, nextStep, prevStep }) => {

    const goalList = goals.map((goal) => {
        return (
            <tr key={goal._id}>
                <td>{goal.text}</td>
                <td>
                    <Moment format='DD/MM/YYYY'>{goal.date}</Moment>
                </td>
                <td>
                    <Moment format='DD/MM/YYYY'>{goal.completed}</Moment>
                </td>
                {/* <td>
                    <button onClick={() => {
                        onDelete(goal._id)
                    }} className='btn btn-danger'>Delete</button>
                </td> */}
            </tr>
        )
    })

    // const onDelete = (id) => {
    //     deleteGoal(id)
    // }
    return (
        <Fragment>
            <div style={{ display: 'flex', margin: '40px 0px' }}>
                <button onClick={() => {
                    prevStep()
                }} className='btn btn-light'>
                    <i className='fas fa-arrow-left'></i> Prev
            </button>
                <h2 className="my-2">Goals </h2>
                <button onClick={() => {
                    nextStep()
                }} className='btn btn-light'>
                    <i className='fas fa-arrow-right'></i> Next
            </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Goal</th>
                        <th>Start date</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {goalList}
                </tbody>
            </table>
        </Fragment>
    )
}

Goal.propTypes = {
    goals: PropTypes.array.isRequired,
    deleteGoal: PropTypes.func.isRequired
}


export default connect(null, { deleteGoal })(Goal)
