import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';
import type { Page } from '@/lib/types';
import { navigate, pageToHref } from '@/lib/router';

interface FooterProps {
  currentPage: Page;
}

export default function Footer({ currentPage }: FooterProps) {
  const links: { label: string; page: Page }[] = [
    { label: 'الرئيسية', page: { name: 'home' } },
    { label: 'من نحن', page: { name: 'about' } },
    { label: 'تواصل معنا', page: { name: 'contact' } },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-cairo text-lg font-extrabold text-white">منصة الرياضيات</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              منصة تعليمية متخصصة في مادة الرياضيات للمرحلة الثانوية، نقدم شروحات ودروس وملخصات
              لتسهيل فهم المفاهيم الرياضية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-cairo text-base font-bold text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={pageToHref(link.page)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.page);
                    }}
                    className="text-sm text-slate-400 hover:text-brand-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cairo text-base font-bold text-white mb-4">معلومات التواصل</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>info@math-platform.edu</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span dir="ltr">+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-sm text-slate-500 font-tajawal">
            © {new Date().getFullYear()} منصة الرياضيات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
