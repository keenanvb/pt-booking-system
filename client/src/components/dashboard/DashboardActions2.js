import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions2 = () => {
    return (
        <div className="dash-buttons">
            <Link to="/packages" className="btn btn-light"><i className="fas fa-archive text-primary"></i>  View packages</Link>
            <Link to="/single-sessions" className="btn btn-light"><i className="fas fa-file text-primary"></i> View single sessions</Link>

        </div>
    )
}

export default DashboardActions2
