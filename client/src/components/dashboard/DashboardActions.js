import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-edit text-primary"></i> Edit Profile</Link>
            <Link to="/manage-booking" className="btn btn-light"><i className="fas fa-tasks text-primary"></i> Manage Bookings</Link>
            {/* <Link to="/add-goal" className="btn btn-light"><i className="fab fa-black-tie text-primary"></i> Add Goal</Link>
            <Link to="/add-stats" className="btn btn-light"><i className="fas fa-graduation-cap text-primary"></i> Add stats</Link>
            <Link to="/add-training-time" className="btn btn-light"><i className="text-primary"></i> Training times</Link> */}
            {/* <Link to="/packages" className="btn btn-light"><i className="fas fa-archive text-primary"></i>  View packages</Link>
            <Link to="/single-sessions" className="btn btn-light"><i className="fas fa-file text-primary"></i> View single sessions</Link> */}

        </div>
    )
}

export default DashboardActions
