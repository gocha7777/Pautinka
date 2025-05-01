import React, { useState, useRef, useEffect } from 'react';
import '../../cssPages/Posts.scss';
import TagsList from '../Profile/TagsList';
import { useProfile } from '../../context/ProfileContext';
import ScrollToTop from '../Buttons/ScrollToTop';
import FloatingButton from '../PostsPage/FloatingButton';

const projects = [
  {
    id: 1,
    title: 'Spectacle',
    description: 'Уважаемые коллеги и потенциальные участники нашего проекта! Мы с радостью объявляем о запуске нашего нового стартапа в сфере ивент-менеджмента! Наше агентство нацелено на создание незабываемых событий, которые вдохновляют и оставляют глубокий след в памяти. Почему именно мы? - Инновационный подход: Мы не просто организуем мероприятия, мы создаем уникальные и креативные концепции, которые выделяются на фоне стандартных решений. - Опыт и профессионализм: Наши специалисты имеют значительный опыт и готовы воплотить в жизнь самые смелые идеи. - Клиентоориентированность: В центре нашего внимания — потребности и желание клиента, каждое мероприятие разрабатывается индивидуально. Приглашаем вас присоединиться Мы ищем талантливых и энергичных профессионалов, желающих стать частью нашей команды. Если вы горите желанием творить и готовы вкладывать свою душу в реализацию прое',
    image: 'foto/1.png',
    author: 'Александра Жаркова',
  },
  {
    id: 2,
    title: 'Marketing Pro',
    description: `Уважаемые коллеги и потенциальные участники нашего проекта!
        Мы с радостью объявляем о запуске нашего нового стартапа в сфере ивент-менеджмента!`,
    image: 'https://www.fontanka.ru/longreads/68984611/2020/images/tild3763-3430-4461-b936-643463306131___-01.jpg',
    author: 'Максим Козин',
  },
  {
    id: 3,
    title: 'Creative Minds',
    description: 'Уважаемые коллеги и потенциальные участники нашего проекта! Мы с радостью объявляем о запуске нашего нового стартапа в сфере ивент-менеджмента! Наше агентство нацелено на создание незабываемых событий, которые вдохновляют и оставляют глубокий след в памяти. Почему именно мы? - Инновационный подход: Мы не просто организуем мероприятия, мы создаем уникальные и креативные концепции, которые выделяются на фоне стандартных решений. - Опыт и профессионализм: Наши специалисты имеют значительный опыт и готовы воплотить в жизнь самые смелые идеи. - Клиентоориентированность: В центре нашего внимания — потребности и желание клиента, каждое мероприятие разрабатывается индивидуально. Приглашаем вас присоединиться Мы ищем талантливых и энергичных профессионалов, желающих стать частью нашей команды. Если вы горите желанием творить и готовы вкладывать свою душу в реализацию прое',
    image: 'https://telegra.ph/file/d9cc65e64b436ff7bb5e7.jpg',
    author: 'Ксения Минская',
  },
];

const Posts = () => {
  const { profileData } = useProfile();
  const [currentIndex, setCurrentIndex] = useState(1); // начальный индекс — первый проект
  const [isModalExpanded, setIsModalExpanded] = useState(false);
  const [isSwipeBlocked, setIsSwipeBlocked] = useState(false);

  const containerRef = useRef(null);
  const isTransitioning = useRef(false);

  const extendedProjects = [
    projects[projects.length - 1],
    ...projects,
    projects[0],
  ];

  const handleTransitionEnd = () => {
    isTransitioning.current = false;
    if (currentIndex === 0) {
      containerRef.current.style.transition = 'none';
      setCurrentIndex(projects.length);
      containerRef.current.style.transform = `translateX(-${projects.length * 100}%)`;
    } else if (currentIndex === projects.length + 1) {
      containerRef.current.style.transition = 'none';
      setCurrentIndex(1);
      containerRef.current.style.transform = `translateX(-100%)`;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    if (currentIndex === 0 || currentIndex === projects.length + 1) return;
    containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex, projects.length]);

  const handleSwipe = (direction) => {
    if (isTransitioning.current || isSwipeBlocked) return;
    isTransitioning.current = true;
    if (direction === 'left') {
      setCurrentIndex((prev) => prev + 1);
    } else if (direction === 'right') {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - endX;
    if (diffX > 50) handleSwipe('left');
    else if (diffX < -50) handleSwipe('right');
  };

  // Получаем текущий проект из projects, корректируя currentIndex
  const getRealProject = () => {
    if (currentIndex === 0) return projects[projects.length - 1];
    if (currentIndex === projects.length + 1) return projects[0];
    return projects[currentIndex - 1];
  };

  return (
    <div
      className="posts-container-horizontal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="posts-wrapper"
        ref={containerRef}
        style={{
          width: `${extendedProjects.length * 100}%`,
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedProjects.map((project, index) => {
          const isActive = index === currentIndex;

          // Determine if the image is vertical based on its aspect ratio
          const isVertical = project.image.includes('foto/1.png'); // Example condition for vertical images

          return (
            <div key={index} className="post-horizontal">
              <FloatingButton />
              <img
                src={project.image}
                alt={project.title}
                className={`post-image-horizontal ${isVertical ? 'vertical' : ''}`}
              />
              <div className="post-content-horizontal">
                <h1>{project.title}</h1>
                <TagsList tags={profileData.tags} />
              </div>

              {/* Только на активном слайде отображаем модалку */}
              {isActive && (
                <ScrollToTop
                  project={getRealProject()}
                  onExpandChange={(expanded) => {
                    setIsModalExpanded(expanded); // Toggles modal expand/collapse
                    setIsSwipeBlocked(expanded); // Blocks swipe when modal is expanded
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* FloatingButton на том же слое */}
    </div>
  );
};

export default Posts;