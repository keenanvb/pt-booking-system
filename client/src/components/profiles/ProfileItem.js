import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import noImageAvail from '../../img/No-image-available.png'

const ProfileItem = ({ profile: { user: { _id, firstName, lastName }, avatar, status, company, location, skills } }) => {

    let imageSrc = avatar ? `uploads/${avatar}` : `${noImageAvail}`;

    return (
        <div className="profile bg-light">
            <img src={imageSrc} alt="" className="round-img img-size-medium"></img>
            <div>
                <h2>{firstName}</h2>
                <h2>{lastName}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
