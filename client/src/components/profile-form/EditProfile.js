import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions'
import noImageAvail from '../../img/No-image-available.png'

const EditProfile = ({ profile: { profile, loading }, getCurrentProfile, createProfile, history }) => {
    const [formData, setFormData] = useState({
        avatar: '',
        location: '',
        status: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        timesPerWeek: '',
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            avatar: loading || !profile.avatar ? '' : profile.avatar,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            bio: loading || !profile.bio ? '' : profile.bio,
            timesPerWeek: loading || !profile.timesPerWeek ? '' : profile.timesPerWeek,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
        })
    }, [getCurrentProfile, loading])

    const { location, status, bio, twitter,
        facebook, linkedin, youtube, instagram, timesPerWeek,
        avatar } = formData


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true)
    }

    let imageSrc = avatar ? `api/profile/photo/${avatar}` : `${noImageAvail}`;

    console.log('imageSrc', imageSrc)

    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
           </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Add some information
            </p>
            <img onClick={() => {
                history.push("/edit-profile-pic");
            }} src={imageSrc} alt="" className="round-img img-size-small">
            </img>
            {/* <small>Please tell us about yourself</small> */}
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <small className="form-text">Tell us a little about yourself</small>
                    <textarea placeholder="" name="bio" value={bio} onChange={(e) => { onChange(e) }}></textarea>
                </div>
                <div className="form-group">
                    <small className="form-text">Status</small>
                    <input type="text" placeholder="Status" name="status" value={status} onChange={(e) => { onChange(e) }}></input>

                </div>
                <div className="form-group">
                    <small className="form-text">How much times a week would you like to train</small>
                    <select name="timesPerWeek" value={timesPerWeek} onChange={(e) => { onChange(e) }}>
                        <option value="0">* Per Week</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group">
                    <small className="form-text">Location</small>
                    <select name="location" value={location} onChange={(e) => { onChange(e) }}>
                        <option value="0">* Select Location Status</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="my-2">
                    <button onClick={() => {
                        toggleSocialInputs(!displaySocialInputs)
                    }} type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs ?
                    <Fragment> <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => { onChange(e) }} />
                    </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => { onChange(e) }} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => { onChange(e) }} />
                        </div>
                    </Fragment> : null
                }
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>

            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
};


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile)) // wrap withRouter to get access to history
