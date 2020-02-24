import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileStats = ({ stats: { date, _id } }) => {
    return (
        <div>
            <h3 className="text-dark">{date}</h3>
            <p>
                <Moment format="DD/MM/YYYY">{date}</Moment >
            </p>
            <p>
                <strong>date </strong> {_id}
            </p>
            <p>
                <strong>Description</strong> {_id}
            </p>
        </div>

    )
}

ProfileStats.propTypes = {
    stats: PropTypes.object.isRequired
}

export default ProfileStats
