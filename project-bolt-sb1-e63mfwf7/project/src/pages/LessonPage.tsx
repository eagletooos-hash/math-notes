import { useEffect, useState } from 'react';
import { ChevronRight, ArrowRight, FileText, BookOpen } from 'lucide-react';
import type { Grade, Subject, Lesson } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { navigate } from '@/lib/router';

interface LessonPageProps {
  gradeSlug: string;
  subjectSlug: string;
  lessonSlug: string;
}

export default function LessonPage({ gradeSlug, subjectSlug, lessonSlug }: LessonPageProps) {
  const [grade, setGrade] = useState<Grade | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
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
            .eq('slug', lessonSlug)
            .maybeSingle();

          if (lessonData) {
            setLesson(lessonData);
          }
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [gradeSlug, subjectSlug, lessonSlug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 rounded-xl bg-slate-100 animate-pulse mb-4 w-96"></div>
          <div className="h-12 rounded-xl bg-slate-100 animate-pulse mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 rounded bg-slate-100 animate-pulse"></div>
            <div className="h-4 rounded bg-slate-100 animate-pulse w-5/6"></div>
            <div className="h-4 rounded bg-slate-100 animate-pulse w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!grade || !subject || !lesson) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <p className="text-slate-500 font-tajawal text-lg">الدرس غير موجود</p>
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
          <button onClick={() => navigate({ name: 'home' })} className="hover:text-brand-600 transition-colors">
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
          <button
            onClick={() => navigate({ name: 'subject', gradeSlug, subjectSlug })}
            className="hover:text-brand-600 transition-colors"
          >
            {subject.name}
          </button>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-slate-700 font-bold truncate">{lesson.title}</span>
        </div>

        {/* Lesson content */}
        <article className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-8 sm:p-12 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-brand-600 font-tajawal bg-brand-50 px-3 py-1 rounded-lg">
              {subject.name}
            </span>
          </div>

          <h1 className="font-cairo text-3xl font-extrabold text-slate-800 mb-4">
            {lesson.title}
          </h1>

          {lesson.summary && (
            <p className="text-lg text-slate-600 font-tajawal leading-relaxed mb-8 pb-8 border-b border-slate-100">
              {lesson.summary}
            </p>
          )}

          {lesson.content ? (
            <div className="prose prose-slate max-w-none">
              <div
                className="text-slate-700 font-tajawal text-lg leading-loose whitespace-pre-wrap"
                style={{ lineHeight: '2' }}
              >
                {lesson.content}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-tajawal text-lg">
                محتوى الدرس سيتم إضافته قريباً
              </p>
            </div>
          )}
        </article>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate({ name: 'subject', gradeSlug, subjectSlug })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold font-tajawal hover:bg-slate-200 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            العودة لقائمة الدروس
          </button>
        </div>
      </div>
    </div>
  );
}
