import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Quran from './pages/Quran';
import Imams from './pages/Imams';
import Callers from './pages/Callers';
import Support from './pages/Support';
import Education from './pages/Education';
import Fatwa from './pages/Fatwa';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="news" element={<News />} />
                  <Route path="quran" element={<Quran />} />
                  <Route path="imams" element={<Imams />} />
                  <Route path="callers" element={<Callers />} />
                  <Route path="support" element={<Support />} />
                  <Route path="education" element={<Education />} />
                  <Route path="fatwa" element={<Fatwa />} />
                  <Route path="login" element={<Login />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </HashRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;