import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import noImageAvail from '../../img/No-image-available.png'

const ClientList = ({ client: { name, firstName, lastName, _id, prof } }) => {

    let imageSrc = prof ? `uploads/${prof.avatar}` : `${noImageAvail}`;

    return (
        <div className="packages bg-light">
            <img src={`${imageSrc}`} alt="" className="round-img img-size-small"></img>
            <div className="package-info">
                <h2>{name}</h2>
                <h2>{firstName}</h2>
                <h2>{lastName}</h2>
            </div>
            <div className="package-actions">
                <div>
                    <Link to={`/admin-packages/${_id}`} className="btn btn-primary">View Packages</Link>
                </div>
                <div>
                    <Link to={`/admin-single-sessions/${_id}`} className="btn btn-primary">View Sessions</Link>
                </div>
                <div>
                    <Link to={`/admin-user-profile/${_id}`} className="btn btn-primary">View Profile</Link>
                </div>
            </div>
        </div>
    )
}

ClientList.propTypes = {
    client: PropTypes.object.isRequired
}

export default ClientList
