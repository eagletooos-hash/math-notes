import { useEffect, useState } from 'react';
import {
  BookOpen,
  Brain,
  GraduationCap,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Users,
  Calculator,
} from 'lucide-react';
import type { Grade } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';

const iconMap: Record<string, typeof BookOpen> = {
  'book-open': BookOpen,
  brain: Brain,
  'graduation-cap': GraduationCap,
};

export default function HomePage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      const { data, error } = await supabase
        .from('grades')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setGrades(data);
      }
      setLoading(false);
    };
    fetchGrades();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-50 border border-brand-200 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-bold text-brand-700 font-tajawal">
              منصة تعليمية متكاملة
            </span>
          </div>

          <h1 className="font-cairo text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 animate-fade-in-up delay-100 text-balance leading-tight">
            تعلّم الرياضيات بثقة
            <span className="block mt-2 bg-gradient-to-l from-brand-600 via-brand-500 to-emerald-500 bg-clip-text text-transparent">
              في المرحلة الثانوية
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-tajawal max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200 leading-relaxed">
            شروحات ودروس وملخصات شاملة لمادة الرياضيات لجميع صفوف المرحلة الثانوية،
            مصممة لتسهيل فهم المفاهيم وتحقيق التفوق.
          </p>
        </div>
      </section>

      {/* Grade Cards — stacked vertically */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-cairo text-3xl sm:text-4xl font-extrabold text-slate-800 mb-3">
              اختر صفك الدراسي
            </h2>
            <p className="text-slate-500 font-tajawal text-lg">
              ثلاث مراحل دراسية، كل واحدة تحتوي على مواد متخصصة
            </p>
          </div>

          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-52 rounded-[2rem] bg-slate-100 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {grades.map((grade, index) => {
                const Icon = iconMap[grade.icon] ?? BookOpen;

                return (
                  <button
                    key={grade.id}
                    onClick={() =>
                      navigate({ name: 'grade', gradeSlug: grade.slug })
                    }
                    className="group relative w-full overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white p-10 sm:p-14 text-right transition-all duration-500 hover:border-brand-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/20 animate-fade-in-up min-h-[200px] flex items-center"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Blue gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                    {/* Decorative shapes */}
                    <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-slate-50 group-hover:bg-white/10 transition-colors duration-500"></div>
                    <div className="absolute -bottom-16 -right-8 w-48 h-48 rounded-full bg-slate-50/50 group-hover:bg-white/5 transition-colors duration-500"></div>

                    <div className="relative z-10 flex items-center gap-6 sm:gap-8 w-full">
                      {/* Icon */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                        <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-cairo text-2xl sm:text-3xl font-extrabold text-slate-800 group-hover:text-white mb-2 transition-colors duration-500">
                          {grade.name}
                        </h3>
                        <p className="text-slate-500 group-hover:text-white/90 font-tajawal text-base sm:text-lg leading-relaxed transition-colors duration-500">
                          {grade.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 hidden sm:flex">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
                          <ChevronLeft className="w-7 h-7 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16">
            {[
              {
                icon: Calculator,
                value: '6',
                label: 'مواد دراسية',
                color: 'brand',
              },
              {
                icon: Users,
                value: '3',
                label: 'مراحل دراسية',
                color: 'emerald',
              },
              {
                icon: TrendingUp,
                value: '100%',
                label: 'محتوى مجاني',
                color: 'amber',
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses: Record<string, string> = {
                brand: 'bg-brand-50 text-brand-600',
                emerald: 'bg-emerald-50 text-emerald-600',
                amber: 'bg-amber-50 text-amber-600',
              };
              return (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-2xl bg-white border border-slate-100"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${colorClasses[stat.color]} flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <p className="font-cairo text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 font-tajawal text-xs sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
