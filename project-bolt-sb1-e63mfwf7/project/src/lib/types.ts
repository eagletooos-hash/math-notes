export interface Grade {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  created_at: string;
}

export interface Subject {
  id: string;
  grade_id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  subject_id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  order: number;
  created_at: string;
}

export type Page =
  | { name: 'home' }
  | { name: 'grade'; gradeSlug: string }
  | { name: 'subject'; gradeSlug: string; subjectSlug: string }
  | { name: 'lesson'; gradeSlug: string; subjectSlug: string; lessonSlug: string }
  | { name: 'about' }
  | { name: 'contact' };
