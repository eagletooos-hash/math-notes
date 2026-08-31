import { useEffect, useState } from 'react';
import {
  ChevronRight,
  Calculator,
  Sigma,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import type { Grade, Subject } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';

interface GradePageProps {
  gradeSlug: string;
}

const iconMap: Record<string, typeof Calculator> = {
  calculator: Calculator,
  'square-root-variable': Sigma,
};

export default function GradePage({ gradeSlug }: GradePageProps) {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: gradeData } = await supabase
        .from('grades')
        .select('*')
        .eq('slug', gradeSlug)
        .maybeSingle();

      if (gradeData) {
        setGrade(gradeData);

        const { data: subjectData } = await supabase
          .from('subjects')
          .select('*')
          .eq('grade_id', gradeData.id)
          .order('order', { ascending: true });

        if (subjectData) {
          setSubjects(subjectData);
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [gradeSlug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse mb-8"></div>
          <div className="space-y-8">
            <div className="h-52 rounded-[2rem] bg-slate-100 animate-pulse"></div>
            <div className="h-52 rounded-[2rem] bg-slate-100 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!grade) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <p className="text-slate-500 font-tajawal text-lg">الصف غير موجود</p>
        <button
          onClick={() => navigate({ name: 'home' })}
          className="mt-4 text-brand-600 font-bold hover:underline"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 font-tajawal mb-8 animate-fade-in">
          <button
            onClick={() => navigate({ name: 'home' })}
            className="hover:text-brand-600 transition-colors"
          >
            الرئيسية
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-700 font-bold">{grade.name}</span>
        </div>

        {/* Header banner */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-10 sm:p-14 mb-12 animate-fade-in-up min-h-[180px] flex items-center">
          <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -right-12 w-60 h-60 rounded-full bg-white/5"></div>
          <div className="relative z-10">
            <h1 className="font-cairo text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {grade.name}
            </h1>
            <p className="text-white/80 font-tajawal text-lg max-w-2xl leading-relaxed">
              {grade.description}
            </p>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-8">
          <h2 className="font-cairo text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
            المواد الدراسية
          </h2>
          <p className="text-slate-500 font-tajawal text-lg">
            اختر المادة التي تريد دراستها
          </p>
        </div>

        {/* Subject cards — stacked vertically, large */}
        {subjects.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] bg-slate-50">
            <BookOpen className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-tajawal text-lg">
              لا توجد مواد متاحة حالياً
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {subjects.map((subject, index) => {
              const Icon = iconMap[subject.icon] ?? Calculator;
              return (
                <button
                  key={subject.id}
                  onClick={() =>
                    navigate({
                      name: 'subject',
                      gradeSlug: gradeSlug,
                      subjectSlug: subject.slug,
                    })
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
                        {subject.name}
                      </h3>
                      <p className="text-slate-500 group-hover:text-white/90 font-tajawal text-base sm:text-lg leading-relaxed transition-colors duration-500">
                        {subject.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 hidden sm:flex">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
                        <ChevronRight className="w-7 h-7 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Back button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate({ name: 'home' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold font-tajawal hover:bg-slate-200 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
