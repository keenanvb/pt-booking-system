import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteStats } from '../../actions'

const Stats = ({ stats, deleteStats, nextStep, prevStep }) => {

    const statsList = stats.map((stat) => {
        return (
            <tr key={stat._id}>
                <td>
                    <Moment format='DD/MM/YYYY'>{stat.date}</Moment>-
                </td>
                <td>{stat.weight}</td>
                <td>{stat.fatPercentage}</td>
                <td>{stat.totalbodywater}</td>
                <td>{stat.muscle}</td>
                <td>{stat.boneDensity}</td>
                <td>{stat.rightArm}</td>
                <td>{stat.leftArm}</td>
                <td>{stat.leftLeg}</td>
                <td>{stat.rightLeg}</td>
                <td>{stat.hip}</td>
                <td>{stat.bully}</td>
                <td>{stat.butt}</td>
                {/* <td>
                    <button onClick={() => {
                        onDelete(stat._id);
                    }} className='btn btn-danger'>Delete</button>
                </td> */}
            </tr>
        )
    })

    // const onDelete = (id) => {
    //     deleteStats(id)
    // }

    return (
        <Fragment>
            <div style={{ display: 'flex', margin: '40px 0px' }}>
                <button onClick={() => {
                    prevStep()
                }} className='btn btn-light'>
                    <i className='fas fa-arrow-left'></i> Prev
            </button>
                <h2 className="my-2">Statistics </h2>
                <button onClick={() => {
                    nextStep()
                }} className='btn btn-light'>
                    <i className='fas fa-arrow-right'></i> Next
            </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>weight</th>
                        <th>fat %</th>
                        <th>body water</th>
                        <th>muscle</th>
                        <th>bone Density</th>
                        <th>R Arm</th>
                        <th>L Arm</th>
                        <th>R Leg</th>
                        <th>L Leg</th>
                        <th>Hip</th>
                        <th>Belly</th>
                        <th>Butt</th>
                    </tr>
                </thead>
                <tbody>
                    {statsList}
                </tbody>
            </table>
        </Fragment>
    )
}

Stats.propTypes = {
    statsList: PropTypes.array.isRequired,
    deleteStats: PropTypes.func.isRequired,
}


export default connect(null, { deleteStats })(Stats)
