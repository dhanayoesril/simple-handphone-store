import React from 'react';
import './Image.css';

const Image = (props) => {
    return (
        <div className="me-4">
            <img 
                className="img-footer"
                src={props.src}
                alt="new"
            />
        </div>
    )
}

export default Image