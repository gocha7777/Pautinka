// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useProfile } from '../../context/ProfileContext';
// import AvatarSection from '../Profile/AvatarSection';
// import { SaveButton, CancelButton, DeleteButton } from '../ActionButtons';
// import useProfileEditor from '../../hooks/useProfileEditor';

// const AddLink = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { links },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { links: profileData.links || [] },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 links: updatedState.links,
//             }));
//         }
//     );

//     const handleAddLink = () => {
//         handleInputChange({
//             target: {
//                 name: 'links',
//                 value: [...links, { id: Date.now(), name: '', url: '' }],
//             },
//         });
//     };

//     const handleRemoveLink = (id) => {
//         handleInputChange({
//             target: {
//                 name: 'links',
//                 value: links.filter((link) => link.id !== id),
//             },
//         });
//     };

//     return (
//         <div className="link-container">
//             <div className="link-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ← Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

//                 <div className="links-wrapper">
//                     {links.map((link) => (
//                         <div key={link.id} className="link-item">
//                             <input
//                                 type="text"
//                                 placeholder="Название"
//                                 value={link.name}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'links',
//                                             value: links.map((l) =>
//                                                 l.id === link.id ? { ...l, name: e.target.value } : l
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="URL"
//                                 value={link.url}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'links',
//                                             value: links.map((l) =>
//                                                 l.id === link.id ? { ...l, url: e.target.value } : l
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <button onClick={() => handleRemoveLink(link.id)} className="remove-link">
//                                 ✕
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 <button onClick={handleAddLink} className="add-link-btn">
//                     Добавить ссылку
//                 </button>

//                 {hasChanges && (
//                     <div className="edit-button-group">
//                         <CancelButton onClick={handleCancel} />
//                         <SaveButton onClick={handleSave} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const AddTag = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { tags },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { tags: profileData.tags || [] },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 tags: updatedState.tags,
//             }));
//         }
//     );

//     const availableTags = profileData?.availableTags || [];
//     const unselectedTags = availableTags.filter((tag) => !tags.includes(tag));

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ➔ Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

//                 <div className="tags-list">
//                     {tags.map((tag, index) => (
//                         <div key={index} className="tag">
//                             <span>{tag}</span>
//                             <button
//                                 onClick={() =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'tags',
//                                             value: tags.filter((t) => t !== tag),
//                                         },
//                                     })
//                                 }
//                                 className="remove-tag"
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="tags-block">
//                     <input
//                         type="text"
//                         name="search"
//                         placeholder="Начните вводить навык"
//                         onChange={handleInputChange}
//                         className="search-tag-input"
//                     />
//                     <div className="available-tags-list">
//                         {unselectedTags.map((tag, index) => (
//                             <div
//                                 key={index}
//                                 className="available-tag"
//                                 onClick={() =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'tags',
//                                             value: [...tags, tag],
//                                         },
//                                     })
//                                 }
//                             >
//                                 {tag}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {hasChanges && (
//                     <div className="edit-button-group">
//                         <CancelButton onClick={handleCancel} />
//                         <SaveButton onClick={handleSave} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const EditAboutMe = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { name, description },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { name: profileData.name, description: profileData.description },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 ...updatedState,
//             }));
//         }
//     );

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ➔ Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={name} />

//                 <div className="tags-block">
//                     <span>Обо мне</span>
//                     <textarea
//                         name="description"
//                         value={description}
//                         onChange={handleInputChange}
//                         className="description-input"
//                     />

//                     <div className="edit-button-group">
//                         <button onClick={handleCancel} className="cancel-btn">
//                             Отмена
//                         </button>
//                         {hasChanges && (
//                             <button onClick={handleSave} className="save-btn">
//                                 Сохранить изменения
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const EditExperienceNew = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { experience },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { experience: profileData.experience || [] },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 experience: updatedState.experience,
//             }));
//         }
//     );

//     const handleAddExperience = () => {
//         handleInputChange({
//             target: {
//                 name: 'experience',
//                 value: [
//                     ...experience,
//                     {
//                         id: Date.now(),
//                         company: '',
//                         department: '',
//                         position: '',
//                         startDate: '',
//                         endDate: '',
//                         logo: '',
//                     },
//                 ],
//             },
//         });
//     };

//     const handleRemoveExperience = (id) => {
//         handleInputChange({
//             target: {
//                 name: 'experience',
//                 value: experience.filter((exp) => exp.id !== id),
//             },
//         });
//     };

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ➔ Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

//                 <div className="tags-block">
//                     <span>Опыт работы</span>

//                     {experience.map((exp) => (
//                         <div key={exp.id} className="experience-item">
//                             <input
//                                 type="text"
//                                 placeholder="Компания"
//                                 value={exp.company}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'experience',
//                                             value: experience.map((item) =>
//                                                 item.id === exp.id
//                                                     ? { ...item, company: e.target.value }
//                                                     : item
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Должность"
//                                 value={exp.position}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'experience',
//                                             value: experience.map((item) =>
//                                                 item.id === exp.id
//                                                     ? { ...item, position: e.target.value }
//                                                     : item
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <button
//                                 onClick={() => handleRemoveExperience(exp.id)}
//                                 className="remove-experience"
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                     ))}

//                     <button onClick={handleAddExperience} className="add-experience-btn">
//                         Добавить опыт работы
//                     </button>

//                     {hasChanges && (
//                         <div className="edit-button-group">
//                             <CancelButton onClick={handleCancel} />
//                             <SaveButton onClick={handleSave} />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };


// const EditExperiences = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { experiences },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { experiences: profileData.experiences || [] },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 experiences: updatedState.experiences,
//             }));
//         }
//     );

//     const handleAddExperience = () => {
//         handleInputChange({
//             target: {
//                 name: 'experiences',
//                 value: [
//                     ...experiences,
//                     {
//                         id: Date.now(),
//                         company: '',
//                         position: '',
//                         startDate: '',
//                         endDate: '',
//                     },
//                 ],
//             },
//         });
//     };

//     const handleRemoveExperience = (id) => {
//         handleInputChange({
//             target: {
//                 name: 'experiences',
//                 value: experiences.filter((exp) => exp.id !== id),
//             },
//         });
//     };

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ➔ Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

//                 <div className="tags-block">
//                     <span>Опыт работы</span>

//                     {experiences.map((exp) => (
//                         <div key={exp.id} className="experience-item">
//                             <input
//                                 type="text"
//                                 placeholder="Компания"
//                                 value={exp.company}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'experiences',
//                                             value: experiences.map((item) =>
//                                                 item.id === exp.id
//                                                     ? { ...item, company: e.target.value }
//                                                     : item
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Должность"
//                                 value={exp.position}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'experiences',
//                                             value: experiences.map((item) =>
//                                                 item.id === exp.id
//                                                     ? { ...item, position: e.target.value }
//                                                     : item
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <button
//                                 onClick={() => handleRemoveExperience(exp.id)}
//                                 className="remove-experience"
//                             >
//                                 ✕
//                             </button>
//                         </div>
//                     ))}

//                     <button onClick={handleAddExperience} className="add-experience-btn">
//                         Добавить опыт работы
//                     </button>

//                     {hasChanges && (
//                         <div className="edit-button-group">
//                             <CancelButton onClick={handleCancel} />
//                             <SaveButton onClick={handleSave} />
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };


// const EditLink = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { links },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { links: profileData.links || [] },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 links: updatedState.links,
//             }));
//         }
//     );

//     const handleRemoveLink = (id) => {
//         handleInputChange({
//             target: {
//                 name: 'links',
//                 value: links.filter((link) => link.id !== id),
//             },
//         });
//     };

//     return (
//         <div className="link-container">
//             <div className="link-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ← Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

//                 <div className="links-wrapper">
//                     {links.map((link) => (
//                         <div key={link.id} className="link-item">
//                             <input
//                                 type="text"
//                                 placeholder="Название"
//                                 value={link.name}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'links',
//                                             value: links.map((l) =>
//                                                 l.id === link.id ? { ...l, name: e.target.value } : l
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="URL"
//                                 value={link.url}
//                                 onChange={(e) =>
//                                     handleInputChange({
//                                         target: {
//                                             name: 'links',
//                                             value: links.map((l) =>
//                                                 l.id === link.id ? { ...l, url: e.target.value } : l
//                                             ),
//                                         },
//                                     })
//                                 }
//                             />
//                             <button onClick={() => handleRemoveLink(link.id)} className="remove-link">
//                                 ✕
//                             </button>
//                         </div>
//                     ))}
//                 </div>

//                 {hasChanges && (
//                     <div className="edit-button-group">
//                         <CancelButton onClick={handleCancel} />
//                         <SaveButton onClick={handleSave} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const EditStatus = () => {
//     const { profileData, setProfileData } = useProfile();

//     const {
//         state: { statusShort, statusLong },
//         hasChanges,
//         handleInputChange,
//         handleSave,
//         handleCancel,
//         handleNavigateBack,
//     } = useProfileEditor(
//         { statusShort: profileData.statusShort, statusLong: profileData.statusLong },
//         (updatedState) => {
//             setProfileData((prevData) => ({
//                 ...prevData,
//                 ...updatedState,
//             }));
//         }
//     );

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <button onClick={() => handleNavigateBack('/')} className="back-to-profile-button">
//                     ➔ Редактирование профиля
//                 </button>

//                 <AvatarSection avatarUrl={profileData.avatar} name={profileData.name} />

//                 <div className="tags-block">
//                     <span>Статус</span>

//                     <div className="status">
//                         <div className="short-status">
//                             <p>Краткий статус</p>
//                             <textarea
//                                 name="statusShort"
//                                 value={statusShort}
//                                 onChange={handleInputChange}
//                                 className="description-input"
//                             />
//                         </div>

//                         <div className="long-status">
//                             <p>Длинный статус</p>
//                             {statusLong.map((line, index) => (
//                                 <div key={index} className="input-with-remove">
//                                     <input
//                                         type="text"
//                                         name={`statusLong[${index}]`}
//                                         value={line}
//                                         onChange={handleInputChange}
//                                     />
//                                     <DeleteButton onClick={() => handleCancel()} />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="edit-button-group">
//                         <CancelButton onClick={handleCancel} />
//                         {hasChanges && <SaveButton onClick={handleSave} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Moderation1 = () => {
//     const navigate = useNavigate();

//     const handleBackToProfile = () => {
//         navigate('/');
//     };

//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <div className="mobile-status-header" onClick={handleBackToProfile}>
//                     <div>&larr; Статус заявки</div>
//                     <div className="preview-icon">&#128065; Предпросмотр</div>
//                 </div>
//                 <div className="mobile-status-container">
//                     <div className="mobile-status-steps">
//                         {/* Step 1 */}
//                         <div className="mobile-status-step active">
//                             <div className="mobile-status-marker"></div>
//                             <div className="mobile-status-content">
//                                 <div className="mobile-status-title">
//                                     Заявка отправлена
//                                     <span className="mobile-status-date">02.10.25</span>
//                                     <span className="mobile-status-check">&#10003;</span>
//                                 </div>
//                                 <div className="mobile-status-description">
//                                     Заявка успешно отправлена и поставлена в очередь на обработку.
//                                     Начало обработки ожидается в течение 5 минут.
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Step 2 */}
//                         <div className="mobile-status-step"></div>
//                         <div className="mobile-status-marker"></div>
//                         <div className="mobile-status-content">
//                             <div className="mobile-status-title">Заявка в работе</div>
//                         </div>
//                     </div>

//                     {/* Step 3 */}
//                     <div className="mobile-status-step">
//                         <div className="mobile-status-marker"></div>
//                         <div className="mobile-status-content">
//                             <div className="mobile-status-title">Заявка принята</div>
//                         </div>
//                     </div>
//                 </div>

//                 <button className="publish-profile-button">Опубликовать профиль</button>
//             </div>
//         </div>
//     );
// };

// export { AddTag, EditAboutMe, EditStatus, EditLink, EditExperiences, EditExperienceNew, AddLink, Moderation1 };