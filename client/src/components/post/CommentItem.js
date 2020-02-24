import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeComment } from '../../actions'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import noImageAvail from '../../img/No-image-available.png'

const CommentItem = ({ auth, removeComment, comment: { _id, text, name, avatar, user, date }, postId }) => {

    let imageSrc = avatar ? `uploads/${avatar}` : `${noImageAvail}`;

    return (
        <Fragment>
            <div class="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${user}`}>
                        <img
                            class="round-img"
                            src={imageSrc}
                            alt=""
                        />
                        <h4>{name}</h4>
                    </Link>
                </div>
                <div>
                    <p class="my-1">
                        {text}
                    </p>
                    <p class="post-date">
                        <Moment format='DD/MM/YYYY'>{date}</Moment>
                    </p>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={(e) => {
                            removeComment(postId, _id)
                        }}>Remove comment</button>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

CommentItem.propTypes = {
    removeComment: PropTypes.func.isRequired,
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { removeComment })(CommentItem)
