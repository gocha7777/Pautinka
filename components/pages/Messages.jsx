import React, { useState } from 'react';
import '../../cssPages/RatingPage.scss'; // Стили для страницы рейтинга

const RatingPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (index) => {
    setRating(index + 1); // Устанавливаем рейтинг от 1 до 5
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Пожалуйста, выберите рейтинг перед отправкой.');
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="rating-page-container">
      {submitted ? (
        <div className="thank-you-message">
          <h2>Спасибо за ваш отзыв!</h2>
          <p>Ваш рейтинг: {rating} ⭐</p>
          <p>Ваш отзыв: {feedback}</p>
        </div>
      ) : (
        <div className="rating-card">
          <h1>Оцените приложение</h1>
          <div className="stars-container">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? 'selected' : ''}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Оставьте отзыв (необязательно)"
            value={feedback}
            onChange={handleFeedbackChange}
            className="feedback-input"
          ></textarea>
          <button onClick={handleSubmit} className="submit-btn">
            Отправить
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingPage;