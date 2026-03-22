import React from 'react';
import './spinner.css';

const Spinner: React.FC = () => {
    return (
        <div className="loader-wrapper">
            <span className="loader"></span>
        </div>
    );
};

export default Spinner;

