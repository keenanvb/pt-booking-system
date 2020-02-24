import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getSessionsByPackageId, updatePackage, clearCurrentPackage } from '../../actions'
import Spinner from '../layout/Spinner'
import Dialog from '../dialog/Dialog'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const EditPackage = ({ adminPT: { loading, clients }, updatePackage, history, match, location: { state: { ptPackage } } }) => {

    const [formData, setFormData] = useState({
        status: '',
        type: '',
        packageUsers: '',
        numberOfClients: '',
        endDate: '',
        startDate: ''
    });

    const [showDialog, setShowDialog] = useState(false)


    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo) => {
        if (yesOrNo === 'yes') {
            let packageData;
            if (status === 'active') {
                packageData = { status, type, users: packageUsers, startDate, endDate: null }
            } else {
                packageData = { status, type, users: packageUsers, startDate, endDate }
            }

            updatePackage(match.params.id, packageData, history)
        }
        setShowDialog(!showDialog)
    }

    useEffect(() => {

        setFormData({
            status: !ptPackage.status ? '' : ptPackage.status,
            type: !ptPackage.type ? '' : ptPackage.type,
            packageUsers: !ptPackage.users ? '' : ptPackage.users,
            endDate: !ptPackage.endDate ? new Date() : new Date(ptPackage.endDate),
            numberOfClients: !ptPackage.users ? '' : ptPackage.users.length,
            startDate: !ptPackage.startDate ? new Date() : new Date(ptPackage.startDate),
        });
    }, [ptPackage]);

    const onStartDateChange = (e) => {
        setFormData({
            ...formData,
            startDate: e
        })
    }

    const onEndDateChange = (e) => {
        setFormData({
            ...formData,
            endDate: e
        })
    }



    const onChange = (e) => {
        if (e.target.name === 'packageUsers') {
            const { packageUsers } = formData
            let user = JSON.parse(e.target.value)
            packageUsers.push(user);

            setFormData({ ...formData, packageUsers })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const removeClient = (userId) => {
        const { packageUsers } = formData
        let newPackageUsers = packageUsers.filter((user) => {
            return user.user !== userId
        });
        setFormData({ ...formData, packageUsers: newPackageUsers })
    }

    const rendeSelectList = () => {
        if (clients && clients.length > 0) {
            return clients.map(({ _id, firstName, lastName }, index) => {
                let name = `${firstName} ${lastName}`
                return (
                    <option key={index} value={JSON.stringify({ name, user: _id })}>{name}</option>
                );
            });
        }
    }

    const renderSelectClientList = () => {
        if (type === 'Individual' && packageUsers.length === 0) {
            return (
                <div className="form-group">
                    <small className="form-text">Add client Individual package </small>
                    <select name="packageUsers" required onChange={(e) => { onChange(e) }}>
                        <option value="">* ----</option>
                        {rendeSelectList()}
                    </select>
                </div>
            )
        } else if (type === 'group' && packageUsers.length < numberOfClients) {
            return (
                <div className="form-group">
                    <small className="form-text">Add clients group package</small>
                    <select name="packageUsers" required onChange={(e) => { onChange(e) }}>
                        <option value="">* ----</option>
                        {rendeSelectList()}
                    </select>
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <small className="form-text">Add clients</small>
                    <select name="packageUsers" disabled onChange={(e) => { onChange(e) }}>
                        <option value="">* ----</option>
                        {rendeSelectList()}
                    </select>
                </div>
            )
        }

    }

    const { status, type, packageUsers, numberOfClients, endDate, startDate } = formData

    return (
        <Fragment>
            {!ptPackage ? <Spinner /> :
                <div>
                    <h1 className="large text-primary">
                        Edit Package
            </h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Package information
                    </p>
                    {/* <small>Please tell us about yourself</small> */}
                    {packageUsers && packageUsers.length > 0 ?
                        <div className='package-client-list'>
                            {packageUsers.map((user) => {
                                return (
                                    <div className='package-client'>
                                        <h1 className='package-client-name'>{user.name}</h1>
                                        <button className='btn btn-danger' onClick={() => { removeClient(user.user) }}>x </button>
                                    </div>
                                )
                            })}</div>
                        :
                        <div>No Clients have been selected</div>
                    }
                    {/* <form className="form" onSubmit={(e) => onSubmit(e)}> */}
                    <form className="form" onSubmit={(e) => toggleDialog(e)}>
                        <div className="form-group">
                            <small className="form-text">Package Start date</small>
                            <DatePicker
                                selected={startDate}
                                onChange={date => onStartDateChange(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                // timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMM d, yyyy h:mm aa"
                            />
                        </div>
                        <div className="form-group">
                            <small className="form-text">Status</small>
                            <select name="status" value={status} onChange={(e) => { onChange(e) }}>
                                <option value="">* ----</option>
                                <option value="active">active</option>
                                <option value="complete">complete</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <small className="form-text">type of package</small>
                            <select name="type" value={type} onChange={(e) => { onChange(e) }}>
                                <option value="">* ----</option>
                                <option value="Individual">Individual</option>
                                <option value="group">Group</option>
                            </select>
                        </div>
                        {type === 'group' ?
                            <div className="form-group">
                                <small className="form-text">Number of clients</small>
                                <select name="numberOfClients" value={numberOfClients} onChange={(e) => { onChange(e) }}>
                                    <option value="">* ----</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            :
                            null
                        }
                        {type === 'Individual' || type === 'group' ?
                            renderSelectClientList() : null
                        }
                        {status === 'complete' ?
                            <div className="form-group">
                                <small className="form-text">Package complete date</small>
                                <DatePicker
                                    selected={endDate}
                                    onChange={date => onEndDateChange(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    // timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMM d, yyyy h:mm aa"
                                />
                            </div>
                            : ''
                        }
                        <input type="submit" className="btn btn-primary my-1" />
                        {showDialog ?
                            <Dialog title={'Add Package'} callback={onDialogClick}>
                                Please confirm Package update
                </Dialog> : null
                        }
                        <Link className="btn btn-light my-1" to="/admin"> Go Back</Link>
                    </form>
                </div>
            }
        </Fragment>
    )
}

EditPackage.propTypes = {
    // createProfile: PropTypes.func.isRequired,
    getSessionsByPackageId: PropTypes.func.isRequired,
    // profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        adminPT: state.adminPT
    }
};


export default connect(mapStateToProps, { getSessionsByPackageId, updatePackage, clearCurrentPackage })(withRouter(EditPackage)) 