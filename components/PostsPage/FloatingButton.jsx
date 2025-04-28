import React from 'react';
import '../../cssPages/Posts.scss';
import { useNavigate } from 'react-router-dom';
const FloatingButton = () => {
    const navigate = useNavigate();

    return (
        <div className="floating-button" onClick={() => navigate('/createproject')}>
            <div className="button-circle">
                <svg className="text-circle" viewBox="0 0 100 100">
                    <path
                        d="M 50, 50 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                        id="circlePath"
                    />
                    <text>
                        <textPath href="#circlePath">
                            Управление проектами Управление проектами
                        </textPath>
                    </text>
                </svg>
                <span className="plus">+</span>
            </div>
        </div>
    );
};

export default FloatingButton;