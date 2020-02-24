import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
// import { removePackage } from '../../actions'
import Dialog from '../../dialog/Dialog'

const PackageItem = ({ ptPackage: { _id, startDate, endDate, status, type, sesh } }) => {

    const [showDialog, setShowDialog] = useState(false)

    // const toggleDialog = (e) => {
    //     e.preventDefault();
    //     setShowDialog(!showDialog)
    // }

    const onDialogClick = (yesOrNo, id) => {
        if (yesOrNo === 'yes') {

            // removePackage(id);
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
    return (
        <div className={`packages bg-light ${packageColour}`}>
            {/* <img src={avatar} alt="" className="round-img"></img> */}
            <div className="package-info">
                <h2>Status:{status}</h2>
                <h2>Type:{type}</h2>
                <h2>Sessions:{sesh.length}</h2>
                <h2>Started: <Moment format="DD/MM/YYYY">{startDate}</Moment></h2>
                {endDate ?
                    <h2>complete: <Moment format="DD/MM/YYYY">{endDate}</Moment></h2> : null
                }
            </div>
            <div className="package-actions">
                <div>
                    <Link to={`/sessions/${_id}`} className="btn btn-primary">View sessions</Link>
                </div>
                {/* <div>
                    <Link to={{
                        pathname: `/sessions/${_id}`, state: {
                            sessions: sessions
                        }
                    }} className="btn btn-primary">Book session</Link>
                </div> */}
                {/* <div>
                    <Link to={{
                        pathname: `/edit-session/${_id}`, state: {
                            ptPackage: ptPackage
                        }
                    }} className="btn btn-primary">Edit Package</Link>
                    <button className="btn btn-primary" onClick={(e) => { toggleDialog(e) }}>Delete Package</button>
                </div> */}
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
    ptPackage: PropTypes.object.isRequired
}

export default connect(null, {})(withRouter(PackageItem))
