// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Остальной код остается без изменений
import BottomNav from '../components/Buttons/BottomNav';
import ScrollToTop from '../components/Buttons/ScrollToTop';
import Messages from '../components/pages/Messages';
import Followers from '../components/pages/Followers';
import Posts from '../components/pages/Posts';
import Profile from '../components/pages/Profile';
import Blog from '../components/pages/Blog';
import AddTag from '../components/ProfileEdit/AddTag';
import EditAboutMe from '../components/ProfileEdit/EditAboutMe';
import EditStatus from '../components/ProfileEdit/EditStatus';
import EditLink from '../components/ProfileEdit/EditLink';
import EditExperiences from '../components/ProfileEdit/EditExperiences';
import EditExperienceNew from '../components/ProfileEdit/EditExperienceNew';
import Moderation1 from '../components/ProfileEdit/Moderation1';
import AddLink from '../components/ProfileEdit/AddLink';
import JobPage from '../components/PostsPage/JobPage';
import ApplicationForm from '../components/PostsPage/ApplicationForm';
import CreateProject from '../components/PostsPage/Create/CreateProject';
import CreateProjectPage from '../components/PostsPage/Create/CreateProjectPage';
import VacancyForm from '../components/PostsPage/VacancyForm';
import { ThemeProvider } from '../context/ThemeContext';
import { ProfileProvider } from '../context/ProfileContext';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <Router basename="/Pautinka/">
          <div className="app">
            <div className="content">
              <Routes>
                <Route path="/messages" element={<Messages />} />
                <Route path="/followers" element={<Followers />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/profile/add-tag" element={<AddTag />} />
                <Route path="/profile/edit-about-me" element={<EditAboutMe />} />
                <Route path="/profile/edit-status" element={<EditStatus />} />
                <Route path="/profile/edit-links" element={<EditLink />} />
                <Route path="/profile/edit-link/:id" element={<EditLink />} />
                <Route path="/profile/edit-experience" element={<EditExperiences />} />
                <Route path="/profile/edit-experience/new" element={<EditExperienceNew />} />
                <Route path="/profile/moderation" element={<Moderation1 />} />
                <Route path="/profile/add-link" element={<AddLink />} />
                <Route path="/jobpage" element={<JobPage />} />
                <Route path="/createproject" element={<CreateProject />} />
                <Route path="/createprojectpage" element={<CreateProjectPage />} />
                <Route path="/applicationform" element={<ApplicationForm />} />
                <Route path="/vacancyform" element={<VacancyForm />} />
                {/* <Route path="/" element={<ScrollToTop />} /> */}
              </Routes>
            </div>
            <BottomNav />
          </div>
        </Router>
      </ProfileProvider>
    </ThemeProvider>
  );
};

export default App;
