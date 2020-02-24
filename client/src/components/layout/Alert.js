import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ProgressBar from '../layout/ProgressBar'

const Alert = ({ alerts }) => {
    // alerts = [{ alertType: 'success', message: 'hello 1' },
    // { alertType: 'success', message: 'hello 2' },
    // { alertType: 'danger', message: 'hello 3' }]
    if (alerts !== null && alerts.length > 0) {
        return alerts.map((alert, index) => {
            return (
                <div>
                    <div key={alert.id} className={`alert alert-${alert.alertType} alart-stacking-${index}`}>
                        <div>
                            {alert.message}
                        </div>
                        <div>
                            <ProgressBar alertType={alert.alertType} done={100} />
                        </div>
                    </div>

                </div>
            )
        })
    } else {
        return null
    }
}

Alert.propTypes = {
    alerts: PropTypes.array
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alert)
