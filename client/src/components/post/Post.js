import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../actions'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id)
    }, [getPost, match.params.id])
    return (
        <div>
            {loading || post == null ? <Spinner /> :
                <Fragment>
                    <Link to='/posts' className='btn'>back to posts</Link>
                    <PostItem post={post} showActions={false} />
                    <CommentForm postId={post._id} />
                    <div className="comments">
                        {post.comments.map((comment) => {
                            return (
                                <CommentItem key={comment._id} comment={comment} postId={post._id} />
                            )
                        })}
                    </div>
                </Fragment>
            }
        </div>
    )
}


Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, { getPost })(Post)