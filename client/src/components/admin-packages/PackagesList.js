import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import moment from 'moment'
import { connect } from 'react-redux'
import { removePackage } from '../../actions'
import Dialog from '../dialog/Dialog'

const PackageItem = ({ ptPackage: { _id, status, sessions, createAt, startDate, endDate, type, sesh }, ptPackage, removePackage }) => {

    const [showDialog, setShowDialog] = useState(false)

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo, id) => {
        if (yesOrNo === 'yes') {
            removePackage(id);
        }

        setShowDialog(!showDialog)
    }

    let boarderColour = (sesh) => {
        let sessionLength = sesh.length
        let colour = 'package-green';
        switch (sessionLength) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                colour = 'package-green'
                break;
            case 7:
            case 8:
                colour = 'package-orange'
                break;
            case 9:
            case 10:
                colour = 'package-red'
                break;
            default:
            // code block
        }
        return colour;
    }

    let packageColour = boarderColour(sesh)


    const dayDifference = moment(new Date()).diff(new Date(startDate), 'days', true).toFixed(2);
    // const monthDifference = moment(new Date()).diff(new Date(startDate), 'months', true);

    return (
        <div className={`packages bg-light ${packageColour}`}>
            {/* <img src={avatar} alt="" className="round-img"></img> */}
            <div className="package-info">
                <h2>{status}</h2>
                <h2>{type}</h2>
                <h2>Sessions:{sesh.length}</h2>
                <h2>Started: <Moment format="DD/MM/YYYY">{startDate}</Moment></h2>
                {endDate ?
                    <h2>complete: <Moment format="DD/MM/YYYY">{endDate}</Moment></h2> : null
                }
                <h2>Duration: Days:{dayDifference} </h2>
            </div>
            <div className="package-actions">
                <div >
                    <Link to={`/admin-package-sessions/${_id}`} className="btn btn-primary">View sessions</Link>
                </div>
                <div>
                    <Link to={{
                        pathname: `/admin-edit-package/${_id}`, state: {
                            ptPackage: ptPackage
                        }
                    }} className="btn btn-primary">Edit Package</Link>
                    <button className="btn btn-primary" onClick={(e) => { toggleDialog(e) }}>Delete Package</button>
                </div>
            </div>
            {showDialog ?
                <Dialog title={'Delete Package'} callback={onDialogClick} id={_id}>
                    Please confirm you would like to DELETE this package
                </Dialog> : null
            }
        </div>
    )
}

PackageItem.propTypes = {
    // package: PropTypes.object.isRequired
}

export default connect(null, { removePackage })(withRouter(PackageItem))
