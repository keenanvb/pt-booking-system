import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { adminAddStats } from '../../../actions'

import Dialog from '../../dialog/Dialog'

const AddStats = ({ adminAddStats, history, match }) => {
    const [formData, setFormData] = useState({
        weight: '',
        fatPercentage: '',
        totalbodywater: '',
        muscle: '',
        boneDensity: '',
        rightArm: '',
        leftArm: '',
        rightLeg: '',
        leftLeg: '',
        hip: '',
        belly: '',
        butt: ''
    });

    const [showDialog, setShowDialog] = useState(false)

    const toggleDialog = (e) => {
        e.preventDefault();
        setShowDialog(!showDialog)
    }

    const onDialogClick = (yesOrNo) => {

        if (yesOrNo === 'yes') {
            adminAddStats(match.params.id, formData, history)
        }
        setShowDialog(!showDialog)

    }

    const { weight, fatPercentage, totalbodywater, muscle, boneDensity,
        rightArm, leftArm, rightLeg, leftLeg, hip, belly, butt
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     adminAddStats(match.params.id, formData, history)
    // }


    return (
        <Fragment>
            <h1 className="large text-primary">
                Add some stats </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Keep track of your progress </p>
            <small>*</small>
            <form className="form" onSubmit={(e) => toggleDialog(e)}>
                <div className="stats-container">
                    <div className="stats-1">
                        <div>
                            <h4>weight</h4>
                            <h4>{weight ? weight : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="weight"
                                min="0" max="100"
                                value={weight}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Fat Percentage</h4>
                            <h4>{fatPercentage ? fatPercentage : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="fatPercentage"
                                min="0" max="100"
                                value={fatPercentage}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Total Body Water</h4>
                            <h4>{totalbodywater ? totalbodywater : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="totalbodywater"
                                min="0" max="100"
                                value={totalbodywater}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Muscle</h4>
                            <h4>{muscle ? muscle : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="muscle"
                                min="0" max="100"
                                value={muscle}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Bone Density</h4>
                            <h4>{boneDensity ? boneDensity : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="boneDensity"
                                min="0" max="100"
                                value={boneDensity}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Belly</h4>
                            <h4>{belly ? belly : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="belly"
                                min="0" max="100"
                                value={belly}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                    </div>
                    <div className="stats-1">
                        <div>
                            <h4>Right Arm</h4>
                            <h4>{rightArm ? rightArm : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="rightArm"
                                min="0" max="100"
                                value={rightArm}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Left Arm</h4>
                            <h4>{leftArm ? leftArm : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="leftArm"
                                min="0" max="100"
                                value={leftArm}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Right Leg</h4>
                            <h4>{rightLeg ? rightLeg : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="rightLeg"
                                min="0" max="100"
                                value={rightLeg}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Left Leg</h4>
                            <h4>{leftLeg ? leftLeg : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="leftLeg"
                                min="0" max="100"
                                value={leftLeg}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Hip</h4>
                            <h4>{hip ? hip : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="hip"
                                min="0" max="100"
                                value={hip}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                        <div>
                            <h4>Butt</h4>
                            <h4>{butt ? butt : '0'}</h4>
                            <input
                                id="typeinp"
                                type="range"
                                name="butt"
                                min="0" max="100"
                                value={butt}
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                step="1" />
                        </div>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
            </form>
            {showDialog ?
                <Dialog title={'Stats'} callback={onDialogClick}>
                    Please confirm you would like to add this Statistic
                </Dialog> : null
            }
        </Fragment>
    )
}

AddStats.propTypes = {
    addStats: PropTypes.func.isRequired,
}

export default connect(null, { adminAddStats })(withRouter(AddStats))
