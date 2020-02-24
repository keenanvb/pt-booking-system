import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPackage } from '../../actions'
import Dialog from '../dialog/Dialog'
import DatePicker from "react-datepicker";

const AddPackage = ({ adminPT: { clients }, addPackage, history }) => {
    const [formData, setFormData] = useState({
        type: '',
        packageUsers: [],
        usersList: clients,
        numberOfClients: 0
    });

    const [startDate, setStartDate] = useState(new Date());


    const [showDialog, setShowDialog] = useState(false)

    const onChange = (e) => {
        if (e.target.name === 'packageUsers') {
            const { packageUsers } = formData

            let selectedUser = JSON.parse(e.target.value)
            packageUsers.push(selectedUser);

            setFormData({ ...formData, packageUsers })
            // filterDropwDownList();
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }
    }

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }

    // const filterDropwDownList = (addUser) => {
    //     let filteredDropdownList = [];
    //     if (addUser) {
    //         filteredDropdownList = usersList.push(addUser)
    //     } else {
    //         filteredDropdownList = usersList.filter((item) => {
    //             return !packageUsers.find(({ name }) => item.name === name)
    //         });
    //     }
    //     setFormData({ ...formData, usersList: filteredDropdownList })
    // }



    const onDialogClick = (yesOrNo) => {
        if (yesOrNo === 'yes') {

            const { type, packageUsers } = formData

            let packageData = { type, users: packageUsers, startDate }

            addPackage(packageData, history)
        }
        setShowDialog(!showDialog)
    }



    const rendeSelectList = () => {
        if (usersList.length > 0) {
            return usersList.map(({ lastName, firstName, _id }, index) => {
                let name = `${firstName} ${lastName}`
                return (
                    <option key={index} value={JSON.stringify({ name, user: _id })}>{`${firstName} ${lastName}`}</option>
                );
            });
        }
    }

    const removeClient = (client) => {

        const { packageUsers } = formData

        let newPackageUsers = packageUsers.filter(({ user }) => {

            return user !== client.user
        });
        // filterDropwDownList(user);
        setFormData({ ...formData, packageUsers: newPackageUsers })

    }

    const renderSelectClientList = () => {
        if (type === 'Individual' && packageUsers.length === 0) {
            return (
                <div className="form-group">
                    <small className="form-text">Add client to individual package </small>
                    <select name="packageUsers" required onChange={(e) => { onChange(e) }}>
                        <option value="">* ----</option>
                        {rendeSelectList()}
                    </select>
                </div>
            )
        } else if (type === 'group' && packageUsers.length < numberOfClients) {
            return (
                <div className="form-group">
                    <small className="form-text">Add clients to group package</small>
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

    const { usersList, type, packageUsers, numberOfClients } = formData
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Package</h1>
            <p className="lead">
                <i className=""></i> Add package for client </p>
            {packageUsers.length > 0 ?
                <div className='package-client-list'>
                    {packageUsers.map((user) => {
                        return (
                            <div className='package-client'>
                                <h1 className='package-client-name'>{`${user.name}`}</h1>
                                <button className='btn btn-danger round' onClick={() => { removeClient(user) }}>x </button>
                            </div>
                        )
                    })}</div>
                :
                <div>No Clients have been selected</div>
            }
            <form className="form" onSubmit={(e) => toggleDialog(e)}>
                <div className="form-group">
                    <small className="form-text">Package Start date</small>
                    <DatePicker
                        selected={startDate}
                        // value={completed}
                        name="startDate"
                        // onChange={(e) => { onChange(e) }}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        // timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMM d, yyyy h:mm aa"
                    />
                </div>
                <div className="form-group">
                    <small className="form-text">Type of Package</small>
                    <select name="type" required value={type} onChange={(e) => { onChange(e) }}>
                        <option value="" defaultValue disabled hidden>* ----</option>
                        <option value="Individual" >Individual</option>
                        <option value="group">Group</option>
                    </select>
                </div>
                {type === 'group' ?
                    <div className="form-group">
                        <small className="form-text">Number of clients</small>
                        <select name="numberOfClients" required value={numberOfClients} onChange={(e) => { onChange(e) }}>
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

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/admin">Go Back</Link>
            </form>
            {showDialog ?
                <Dialog title={'Add Package'} callback={onDialogClick}>
                    Please confirm you would like to add this Session
                </Dialog> : null
            }

        </Fragment>
    )
}

AddPackage.propTypes = {
    addPackage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        adminPT: state.adminPT
    }
}

export default connect(mapStateToProps, { addPackage })(withRouter(AddPackage))
