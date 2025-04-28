import React from 'react';

const InfoField = ({ fields, data, className }) => (
    <div className={className}>
        {fields.map((field, index) => (
            <div key={index} className="info-box">
                <label>{field}</label>
                <span>{data[index]}</span>
            </div>
        ))}
    </div>

);

export default InfoField;