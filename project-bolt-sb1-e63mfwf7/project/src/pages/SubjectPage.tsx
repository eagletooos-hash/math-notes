import { useEffect, useState } from 'react';
import {
  ChevronRight,
  FileText,
  ArrowRight,
  Layers,
} from 'lucide-react';
import type { Grade, Subject, Lesson } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';

interface SubjectPageProps {
  gradeSlug: string;
  subjectSlug: string;
}

export default function SubjectPage({
  gradeSlug,
  subjectSlug,
}: SubjectPageProps) {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
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
          .eq('slug', subjectSlug)
          .maybeSingle();

        if (subjectData) {
          setSubject(subjectData);

          const { data: lessonData } = await supabase
            .from('lessons')
            .select('*')
            .eq('subject_id', subjectData.id)
            .order('order', { ascending: true });

          if (lessonData) {
            setLessons(lessonData);
          }
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [gradeSlug, subjectSlug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse mb-8"></div>
          <div className="space-y-6">
            <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse"></div>
            <div className="h-40 rounded-[2rem] bg-slate-100 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!grade || !subject) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <p className="text-slate-500 font-tajawal text-lg">المادة غير موجودة</p>
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
        <div className="flex items-center gap-2 text-sm text-slate-500 font-tajawal mb-8 animate-fade-in flex-wrap">
          <button
            onClick={() => navigate({ name: 'home' })}
            className="hover:text-brand-600 transition-colors"
          >
            الرئيسية
          </button>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <button
            onClick={() => navigate({ name: 'grade', gradeSlug })}
            className="hover:text-brand-600 transition-colors"
          >
            {grade.name}
          </button>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-slate-700 font-bold">{subject.name}</span>
        </div>

        {/* Header banner */}
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-10 sm:p-14 mb-12 animate-fade-in-up min-h-[180px] flex items-center">
          <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -right-12 w-60 h-60 rounded-full bg-white/5"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <span className="text-white/70 font-tajawal text-sm">
                {grade.name}
              </span>
            </div>
            <h1 className="font-cairo text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {subject.name}
            </h1>
            <p className="text-white/80 font-tajawal text-lg leading-relaxed">
              {subject.description}
            </p>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-8">
          <h2 className="font-cairo text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2">
            قائمة الدروس
          </h2>
          <p className="text-slate-500 font-tajawal text-lg">
            {lessons.length > 0
              ? `${lessons.length} درس متاح`
              : 'لا توجد دروس متاحة حالياً'}
          </p>
        </div>

        {/* Lesson cards — large, stacked */}
        {lessons.length === 0 ? (
          <div className="text-center py-20 rounded-[2rem] bg-slate-50">
            <FileText className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-tajawal text-lg mb-2">
              لا توجد دروس متاحة حالياً
            </p>
            <p className="text-slate-400 font-tajawal text-sm">
              سيتم إضافة الدروس والملخصات والاختبارات قريباً
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() =>
                  navigate({
                    name: 'lesson',
                    gradeSlug,
                    subjectSlug,
                    lessonSlug: lesson.slug,
                  })
                }
                className="group relative w-full overflow-hidden rounded-[2rem] border-2 border-slate-200 bg-white p-8 sm:p-10 text-right transition-all duration-500 hover:border-brand-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/20 animate-fade-in-up min-h-[160px] flex items-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Blue gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                {/* Decorative shape */}
                <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-slate-50 group-hover:bg-white/10 transition-colors duration-500"></div>

                <div className="relative z-10 flex items-center gap-5 sm:gap-6 w-full">
                  {/* Number badge */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 group-hover:text-white transition-all duration-500 group-hover:scale-110 font-cairo font-extrabold text-2xl sm:text-3xl">
                    {index + 1}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cairo text-xl sm:text-2xl font-extrabold text-slate-800 group-hover:text-white mb-1 transition-colors duration-500">
                      {lesson.title}
                    </h3>
                    {lesson.summary && (
                      <p className="text-slate-500 group-hover:text-white/90 font-tajawal text-sm sm:text-base leading-relaxed transition-colors duration-500">
                        {lesson.summary}
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 hidden sm:flex">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
                      <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Back button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate({ name: 'grade', gradeSlug })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold font-tajawal hover:bg-slate-200 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            العودة لـ {grade.name}
          </button>
        </div>
      </div>
    </div>
  );
}
