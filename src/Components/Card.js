import React from 'react'
import myimg from '../photos/about.jpg'

const Card = ({ title, image, description }) => (
    <div className="card">
        <img src={myimg} alt={title} />
        <div className="card-body">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>
)

export default Card;
