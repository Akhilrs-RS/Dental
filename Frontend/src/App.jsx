import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AdminPage from './components/AdminPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname.startsWith('/admin') ? 'admin' : 'public';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname.startsWith('/admin') ? 'admin' : 'public');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route) => {
    if (route === 'admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentRoute('admin');
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('public');
    }
  };

  if (currentRoute === 'admin') {
    return <AdminPage onNavigateHome={() => navigateTo('public')} />;
  }

  return (
    <LandingPage onNavigate={navigateTo} />
  );
}

