import React from 'react';
import PropTypes from 'prop-types';

const CommonButton = ({ onClick, title, className, children }) => (
    <button onClick={onClick} className={className} title={title}>
        {children}
    </button>
);

CommonButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const ActionButtons = ({ onSave, onCancel, onDelete }) => (
    <div className="action-buttons">
        <CommonButton onClick={onSave} className="save-btn">Save</CommonButton>
        <CommonButton onClick={onCancel} className="cancel-btn">Cancel</CommonButton>
        <CommonButton onClick={onDelete} className="delete-btn">Delete</CommonButton>
    </div>
);

ActionButtons.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export { CommonButton, ActionButtons };