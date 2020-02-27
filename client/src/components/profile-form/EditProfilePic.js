import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { updateProfilePicture, getCurrentProfile, setAlert } from '../../actions'


const EditProfilePic = ({ updateProfilePicture, getCurrentProfile, history, setAlert }) => {
    const [formData, setFormData] = useState({
        file: '',
        preview: ''
    });

    useEffect(() => {
        return (() => {
            getCurrentProfile();
        })
    }, [getCurrentProfile])

    const onChange = (e) => {
        let actualfile = e.target.files[0];

        let reader = new FileReader();
        reader.readAsDataURL(actualfile);

        setFormData({
            ...formData,
            file: e.target.files[0],
            preview: URL.createObjectURL(actualfile),
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const maxAllowedSize = 2000000
        console.log('file', file);
        if (file.size < maxAllowedSize) {
            let fd = new FormData();
            fd.append("file", file);
            updateProfilePicture(fd, history)
        } else {
            setAlert('Please reduce image size: Max 2mb', 'danger')
        }
    }

    const { file, preview } = formData

    return (
        <Fragment>
            <h1 className="large text-primary">
                Update Profile Picture
           </h1>
            <p className="lead">
                <i className="fas fa-user-plus"></i>
            </p>
            <form className="form" encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
                {file ?
                    <div className="form-group">
                        <img onClick={() => {
                            setFormData({
                                file: '',
                                preview: ''
                            })
                        }} src={preview} alt="" className="round-img img-size-small">
                        </img>
                    </div>
                    :
                    <div className="form-group">
                        <small className="form-text">Change Profile pic</small>
                        <input type="file" name='file' accept="image/*" onChange={(e) => { onChange(e) }} />
                    </div>}
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="edit-profile">Go Back</Link>
            </form>
        </Fragment>
    )
}

EditProfilePic.propTypes = {
    updateProfilePicture: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        profile: state.profile
    }
};


export default connect(mapStateToProps, { updateProfilePicture, getCurrentProfile, setAlert })(withRouter(EditProfilePic)) // wrap withRouter to get access to history
