import { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, Home, Info, Mail } from 'lucide-react';
import type { Page } from '@/lib/types';
import { navigate, pageToHref } from '@/lib/router';

interface NavbarProps {
  currentPage: Page;
}

export default function Navbar({ currentPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPage]);

  const navLinks: { label: string; icon: typeof Home; page: Page }[] = [
    { label: 'الرئيسية', icon: Home, page: { name: 'home' } },
    { label: 'من نحن', icon: Info, page: { name: 'about' } },
    { label: 'تواصل معنا', icon: Mail, page: { name: 'contact' } },
  ];

  const isActive = (page: Page) => {
    if (page.name === 'home' && currentPage.name === 'home') return true;
    if (page.name === 'about' && currentPage.name === 'about') return true;
    if (page.name === 'contact' && currentPage.name === 'contact') return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate({ name: 'home' })}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <h1 className="font-cairo text-xl font-extrabold text-slate-800 leading-tight">
                منصة الرياضيات
              </h1>
              <p className="text-xs text-slate-500 font-tajawal">التعليم الثانوي</p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.page);
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.page)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-tajawal font-bold text-sm transition-all duration-300 ${
                    active
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-brand-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="القائمة"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.page);
                return (
                  <a
                    key={link.label}
                    href={pageToHref(link.page)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.page);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-tajawal font-bold text-sm transition-all duration-300 ${
                      active
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
