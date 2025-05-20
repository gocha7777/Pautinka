import React, { useState, useRef, useEffect } from 'react';
import '../../cssPages/Posts.scss';
import TagsList from '../Profile/TagsList';
import ScrollToTop from '../Buttons/ScrollToTop';
import FloatingButton from '../PostsPage/FloatingButton';
import ProfileService from '../../api/Services/ProfileService';
import TagsPost from '../PostsPage/TagsPost';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const Posts = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isModalExpanded, setIsModalExpanded] = useState(false);
  const [isSwipeBlocked, setIsSwipeBlocked] = useState(false);
  const containerRef = useRef(null);
  const isTransitioning = useRef(false);
  const touchStartX = useRef(0);
  const [extendedProjects, setExtendedProjects] = useState([]);
  const [showArrows, setShowArrows] = useState(true);
  const arrowTimeout = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProfileService.getAllProjects();
        const approvedProjects = data.filter(p => p.status === 'approved');
        setProjects(approvedProjects);
        setExtendedProjects([
          approvedProjects[approvedProjects.length - 1],
          ...approvedProjects,
          approvedProjects[0]
        ]);
      } catch (err) {
        console.error("Ошибка при получении проектов:", err);
      }
    };
    fetchProjects();
  }, []);
  const triggerArrowVisibility = () => {
    setShowArrows(false);
    if (arrowTimeout.current) clearTimeout(arrowTimeout.current);
    arrowTimeout.current = setTimeout(() => {
      setShowArrows(true);
    }, 3000); // 3 секунды
  };

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
    if (!containerRef.current || projects.length === 0) return;
    if (currentIndex === 0 || currentIndex === projects.length + 1) return;

    containerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex, projects]);

  const handleSwipe = (direction) => {
    if (isTransitioning.current || isSwipeBlocked) return;
    isTransitioning.current = true;

    if (direction === 'left') setCurrentIndex((prev) => prev + 1);
    if (direction === 'right') setCurrentIndex((prev) => prev - 1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) handleSwipe('left');
    else if (diffX < -50) handleSwipe('right');
  };

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
      {/* Стрелки влево и вправо */}
      {!isSwipeBlocked && (
        <>
          <div className="scroll-arrow left" onClick={() => handleSwipe('right')}>
            <ChevronLeft size={20} />
          </div>
          <div className="scroll-arrow right" onClick={() => handleSwipe('left')}>
            <ChevronRight size={20} />
          </div>
        </>
      )}

      {projects.length === 0 ? (
        <div className="no-projects-message">
          <p>Пока нет опубликованных проектов</p>
        </div>
      ) : (
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
            const isVertical = project.image?.includes('foto/1.png');

            return (
              <div key={index} className="post-horizontal">
                <FloatingButton />
                <img
                  src={project.coverImage ? `https://localhost:7268${project.coverImage}` : '/default.jpg'}
                  className={`post-image-horizontal ${isVertical ? 'vertical' : ''}`}
                />

                <div className="post-content-horizontal">
                  <h1>{project.name}</h1>
                  <TagsPost tags={(project.tags || []).map(tag => tag.tagName)} />
                </div>

                {isActive && (
                  <ScrollToTop
                    project={getRealProject()}
                    onExpandChange={(expanded) => {
                      setIsModalExpanded(expanded);
                      setIsSwipeBlocked(expanded);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
