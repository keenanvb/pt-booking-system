import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bookingUpdate, clearForm } from '../../actions'


const Success = ({ booking, handleStepperClick, resetStep, clearForm }) => {



    return (
        <Fragment>
            <h1 className="large text-primary">
                Booking successful</h1>
            <p className="lead">
                <i className=""></i></p>
            <small></small>
            <Link to="/dashboard" onClick={() => {
                clearForm();
                resetStep();
            }
            } className="btn btn-light"><i className="fas fa-chart-bar"></i>  Dashboard </Link>
            <Link to="/booking" onClick={() => {
                clearForm();
                resetStep();
            }
            } className="btn btn-light"><i className="fas fa-chart-bar"></i>  Make another Booking </Link>
        </Fragment>
    )
}

Success.propTypes = {
    clearForm: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        booking: state.booking
    }
}

export default connect(mapStateToProps, { bookingUpdate, clearForm })(withRouter(Success))
