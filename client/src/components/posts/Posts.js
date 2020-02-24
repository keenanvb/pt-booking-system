import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts()
    }, [getPosts])


    return (
        <div>
            {loading ? <Spinner /> :
                <Fragment>
                    <h1 className="large text-primary">Posts</h1>
                    <p className="lead">
                        <i className="fas fa-user"> Welcome to the community</i>
                    </p>
                    <PostForm />
                    {posts.map((post) => {
                        return (
                            <PostItem key={post._id} post={post} />
                        )
                    })}
                </Fragment>}
        </div>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, { getPosts })(Posts)
