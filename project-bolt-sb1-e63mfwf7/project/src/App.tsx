import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import GradePage from '@/pages/GradePage';
import SubjectPage from '@/pages/SubjectPage';
import LessonPage from '@/pages/LessonPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import { parseHash } from '@/lib/router';
import type { Page } from '@/lib/types';

function App() {
  const [page, setPage] = useState<Page>(parseHash());

  useEffect(() => {
    const handleHashChange = () => {
      setPage(parseHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (page.name) {
      case 'home':
        return <HomePage />;
      case 'grade':
        return <GradePage gradeSlug={page.gradeSlug} />;
      case 'subject':
        return <SubjectPage gradeSlug={page.gradeSlug} subjectSlug={page.subjectSlug} />;
      case 'lesson':
        return (
          <LessonPage
            gradeSlug={page.gradeSlug}
            subjectSlug={page.subjectSlug}
            lessonSlug={page.lessonSlug}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentPage={page} />
      <main className="flex-1">{renderPage()}</main>
      <Footer currentPage={page} />
    </div>
  );
}

export default App;
