// import React, { useState } from 'react';
// import '../../cssPages/Styles.scss';
// import { useNavigate } from 'react-router-dom';
// import { useProfile } from '../../context/ProfileContext';
// import AvatarSection from '../Profile/AvatarSection';
// import StatsRow from '../Profile/StatsRow';
// import TagsList from '../Profile/TagsList';
// import StatusBlock from '../Profile/StatusBlock';
// import AboutMe from '../Profile/AboutMe';
// import InfoField from '../Profile/InfoField';
// import ScrollableExperienceCards from '../Profile/SlideExperience';

import React from 'react';
import '../../cssPages/Blog.css';

const RatingPage = () => {
  return (
    <div className="blog-coming-soon">
      <h3>Coming soon...</h3>
    </div>
  );
};
export default RatingPage;

// const RatingPage = () => {
//   const experience = [
//     {
//       src: 'https://cdn-icons-png.flaticon.com/128/2504/2504953.png',
//       company: 'VK',
//       position: 'Маркетолог',
//       duration: '04.24 - сейчас',
//     },
//     {
//       src: 'https://cdn.tbank.ru/static/pfa-multimedia/images/ae288629-59d7-4eb6-b074-8bb0549a43b6.svg',
//       company: 'Tinkoff',
//       position: 'SMM-менеджер',
//       duration: '10.23 - 03.24',
//     },
//     {
//       src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Yandex.Browser_icon.svg/1024px-Yandex.Browser_icon.svg.png',
//       company: 'Yandex',
//       position: 'Продуктовый менеджер',
//       duration: '01.22 - 09.23',
//     },
//   ];
//   // const [isEditing, setIsEditing] = useState(false);
//   // const { theme, setTheme } = useTheme();
//   const navigate = useNavigate();
//   const { profileData } = useProfile();

//   return (
//     < div className={`profile-container`}>
//       <div className="profile-card">

//         <AvatarSection avatarUrl="foto\foto-profile.png" name={profileData.name}/>
//         <StatusBlock
//           statusShort={profileData.statusShort}
//           statusLong={profileData.statusLong}
//           onEditStatus={() => navigate('/profile/edit-status')}
//         />
//         <button className="toggle-edit" onClick={() => setIsEditing(!isEditing)}>
//           Написать
//         </button>

//         <StatsRow stats={profileData.stats} />


//         <TagsList
//           tags={profileData.tags}
//           onAddTag={() => navigate('/profile/add-tag')}
//         />
//         <InfoField
//           fields={['ВУЗ', 'Курс']}
//           data={[
//             profileData.infoFields['ВУЗ'],
//             profileData.infoFields['Курс'],
//           ]}
//           className="info-right flex"
//         ></InfoField>
//         <AboutMe
//           description={profileData.descriptionuser}
//           onEditAboutMe={() => navigate('/profile/edit-about-me')}
//         />
//         <div className='scrollable-experience-container'>
//           <ScrollableExperienceCards experience={experience} totalExperience="1 год 7 месяцев" />
//         </div>
//       </div>
//     </div>
//   )
// }
// export default RatingPage






// // import React, { useState } from 'react';
// // import '../../cssPages/RatingPage.scss'; // Стили для страницы рейтинга


// // const RatingPage = () => {
// //   const [rating, setRating] = useState(0);
// //   const [feedback, setFeedback] = useState('');
// //   const [submitted, setSubmitted] = useState(false);

// //   const handleStarClick = (index) => {
// //     setRating(index + 1); // Устанавливаем рейтинг от 1 до 5
// //   };

// //   const handleFeedbackChange = (e) => {
// //     setFeedback(e.target.value);
// //   };

// //   const handleSubmit = () => {
// //     if (rating === 0) {
// //       alert('Пожалуйста, выберите рейтинг перед отправкой.');
// //       return;
// //     }

// //     setSubmitted(true);
// //   };

// //   return (
// //     <div className="rating-page-container">
// //       {submitted ? (
// //         <div className="thank-you-message">
// //           <h2>Спасибо за ваш отзыв!</h2>
// //           <p>Ваш рейтинг: {rating} ⭐</p>
// //           <p>Ваш отзыв: {feedback}</p>
// //         </div>
// //       ) : (
// //         <div className="rating-card">
// //           <h1>Оцените приложение</h1>
// //           <div className="stars-container">
// //             {[...Array(5)].map((_, index) => (
// //               <span
// //                 key={index}
// //                 className={`star ${index < rating ? 'selected' : ''}`}
// //                 onClick={() => handleStarClick(index)}
// //               >
// //                 ★
// //               </span>
// //             ))}
// //           </div>
// //           <textarea
// //             placeholder="Оставьте отзыв (необязательно)"
// //             value={feedback}
// //             onChange={handleFeedbackChange}
// //             className="feedback-input"
// //           ></textarea>
// //           <button onClick={handleSubmit} className="submit-btn">
// //             Отправить
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
