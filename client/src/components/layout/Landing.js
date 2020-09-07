import React, { useEffect, useState, useRef, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
// import Fitness from './landing/Fitness'
import About from './landing/About'
import Footer from './Footer'
// import Maps from './Maps'
// import Contact from '../contact/Contact'
// import Spinner from './Spinner'


const Landing = ({ isAuthenticated }) => {


    const [display, setDisplay] = useState(false)
    const [count, setCount] = useState(0)
    const [activeLink, setActiveLink] = useState(0)


    useEffect(() => {
        window.scrollTo(0, 0)
        // window.addEventListener('scroll', scrolly, false);
        scrolly();
        // return (() => {
        //     window.removeEventListener('scroll', scrolly, false);
        // })
    }, []);

    let scrolly = () => {

        window.addEventListener('scroll', function () {

            // const { about, services } = elements

            let displaySideNav = window.scrollY > 300
            if (displaySideNav) {
                setDisplay(true)
                setCount(1)

                // let aboutPosition = document.getElementById("about").offsetTop;
                // let servicesPosition = document.getElementById("services").offsetTop;

                // if (window.scrollY >= aboutPosition) {
                //     setActiveLink(1);
                // }

                // if (window.scrollY >= servicesPosition - 2) {

                //     setActiveLink(2);
                // }

                // if (window.scrollY <= aboutPosition - 2) {
                //     setActiveLink(0)
                // }
            } else {
                setDisplay(false)
            }
        })
    }


    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <div id="landing" className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Mobile Personal Trainer</h1>
                        <p className="lead">
                            Live Your Best Life
                        </p>
                        <div className="pulse-container">
                            <div className="pulse">
                                <a href="#about">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path opacity=".87" fill="none" d="M24 24H0V0h24v24z" /><path d="M15.88 9.29L12 13.17 8.12 9.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`nav-sidebar ${display ? `show-sidebar fade-in` : `hide-sidebar-${count}`}`}>
                <a className={`${activeLink === 3 ? 'active-link' : null} `} href="#contact"><i className="far fa-envelope"></i></a>
                <a className={`${activeLink === 2 ? 'active-link' : null} `} href="#services"><i className="fas fa-dumbbell"></i></a>
                <a className={`${activeLink === 1 ? 'active-link' : null} `} href="#about"><i className="fa fa-about"></i> About</a>
                <a href="#landing"><i className="fa fa-heart"></i></a>
            </div>
            <div className="container" id="about">
                <About />
            </div>
            {/* <div id="services">
                <Fitness />
            </div> */}
            {/* <div id="contact" className="contact-section">
                <div className="map-conatiner" style={{ width: '100%', marginRight: '12px' }}>
                    <Maps
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `600px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
                <div style={{ width: '100%', marginLeft: '12px' }}>
                    <Contact />
                </div>

            </div> */}
            <div className="pulse-container-bottom">
                <div className="pulse">
                    <a href="#landing">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M11.29 8.71L6.7 13.3c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 10.83l3.88 3.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 8.71c-.38-.39-1.02-.39-1.41 0z" /></svg>
                    </a>
                </div>
            </div>
            <Footer />
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}


const mapStateToProps = state => {
    const { isAuthenticated } = state.auth
    return {
        isAuthenticated
    }
};

export default connect(mapStateToProps)(Landing)


