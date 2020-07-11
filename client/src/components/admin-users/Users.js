import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPackageUsers, getAdminBookingCalendarEvents, loadUser, getConfirmedBookings } from '../../actions'
import PackagesItem from './UserList'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Clients = ({ adminPT: { clients, loading }, getPackageUsers, loadUser, getAdminBookingCalendarEvents, getConfirmedBookings }) => {

    const [data, setData] = useState({
        userData: '',
    });
    let startDate = moment().format('YYYY-MM-DD');
    let endDate = moment().add(7, 'd').format('YYYY-MM-DD');
    let dateObj = {
        startDate,
        endDate
    }

    let endDate2 = moment().add(1, 'd').format('YYYY-MM-DD');


    useEffect(() => {
        loadUser();
        getPackageUsers()
        getAdminBookingCalendarEvents(dateObj);
        getConfirmedBookings({ startDate, endDate: endDate2 });
        setData({
            userData: loading || !clients ? clients : clients,
        });
    }, [getPackageUsers, loading, loadUser]);


    const onChange = (e) => {
        let filterSearch = clients.filter((val) => {
            let name = `${val.firstName} ${val.lastName}`
            if (name.toLowerCase().indexOf(e.target.value) > -1) {
                return val
            }
        })
        setData({ userData: filterSearch });
    }


    const { userData } = data

    return (
        <Fragment>
            {loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Clients</h1>
                    <p className="lead">
                        <i className="far fa-clipboard">Track and Manage client attendence</i>
                    </p>
                    <div className="dash-buttons">
                        <Link to="/admin-manage-booking" className="btn btn-light"><i className="fas fa-calendar-check"></i> Manage Booking</Link>
                        <Link to="/register" className="btn btn-light"><i className="fas fa-user-plus"></i> Sign up User</Link>
                        {/* <li><Link to="/register">Sign up</Link></li> */}
                        <Link to="/admin-add-package" className="btn btn-light"><i className="fa fa-plus"></i> Add New Package</Link>
                        <Link to="/admin-update-session" className="btn btn-light"><i className="fa fa-plus"></i> Update sessions</Link>
                    </div>
                    <input className="user-search"
                        placeholder='Search'
                        autoComplete="off"
                        type="text"
                        name="search"
                        onChange={(e) => { onChange(e) }}
                        maxLength="20"
                    />
                    <div className='package-container'>
                        {userData.length > 0 ? (
                            userData.map((client) => {
                                return (
                                    <PackagesItem key={client._id} client={client} />
                                )
                            })
                        ) : <h4>No profiles found...</h4>}
                    </div>
                    {/* <div className="admin-add">
                        <Link to="/admin-add-package"><i className="fa fa-plus fa-3x" aria-hidden="true">{' '}</i></Link>
                    </div> */}
                </Fragment>
            }
        </Fragment>
    )
}

Clients.propTypes = {
    getPackageUsers: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        adminPT: state.adminPT
    }
}

export default connect(mapStateToProps, { getPackageUsers, loadUser, getAdminBookingCalendarEvents, getConfirmedBookings })(Clients);
