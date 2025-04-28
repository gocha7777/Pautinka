import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../cssPages/EditPages.scss';



const Moderation1 = () => {
    const navigate = useNavigate();

    const handleBackToProfile = () => {
        navigate('/');
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="mobile-status-header" onClick={ () => window.history.back()}>
                    <div>&larr; Статус заявки</div>
                    <div className="preview-icon">&#128065; Предпросмотр</div>
                </div>
                <div className="mobile-status-container">
                    <div className="mobile-status-steps">
                        {/* Step 1 */}
                        <div className="mobile-status-step active">
                            <div className="mobile-status-marker"></div>
                            <div className="mobile-status-content">
                                <div className="mobile-status-title">
                                    Заявка отправлена
                                    <span className="mobile-status-date">02.10.25</span>
                                    <span className="mobile-status-check">&#10003;</span>
                                </div>
                                <div className="mobile-status-description">
                                    Заявка успешно отправлена и поставлена в очередь на обработку.
                                    Начало обработки ожидается в течение 5 минут.
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="mobile-status-step">
                            <div className="mobile-status-marker"></div>
                            <div className="mobile-status-content">
                                <div className="mobile-status-title">Заявка в работе</div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="mobile-status-step">
                            <div className="mobile-status-marker"></div>
                            <div className="mobile-status-content">
                                <div className="mobile-status-title">Заявка принята</div>
                            </div>
                        </div>
                    </div>

                    <button className="publish-profile-button">Опубликовать профиль</button>
                </div>
            </div>
        </div>
    );
};

export default Moderation1;