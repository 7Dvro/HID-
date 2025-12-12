import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quran from './pages/Quran';
import Imams from './pages/Imams';
import Education from './pages/Education';
import Fatwa from './pages/Fatwa';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
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
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quran" element={<Quran />} />
              <Route path="imams" element={<Imams />} />
              <Route path="education" element={<Education />} />
              <Route path="fatwa" element={<Fatwa />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;