import React, { Component } from 'react';
import img from '../../../img/gym_1.jpg'

const Gym = () => {
    return (
        <div>
            <img className='landing' alt="gym" src={img} />
        </div>
    );
}

export default Gym;