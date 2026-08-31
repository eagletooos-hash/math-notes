/*
# جداول منصة الرياضيات للمرحلة الثانوية

إنشاء جداول لموقع تعليمي لمادة الرياضيات للمرحلة الثانوية.
التطبيق لا يتطلب تسجيل دخول، لذا البيانات عامة (single-tenant).

1. الجداول الجديدة
- `grades` — المراحل الدراسية (أول ثانوي، ثاني ثانوي، ثالث ثانوي)
  - `id` (uuid, مفتاح أساسي)
  - `name` (text, اسم المرحلة)
  - `slug` (text, معرف فريد للرابط)
  - `description` (text, وصف المرحلة)
  - `icon` (text, اسم الأيقونة)
  - `color` (text, لون المرحلة)
  - `sort_order` (int, ترتيب العرض)
  - `created_at` (timestamp)

- `subjects` — المواد الدراسية (رياضيات 1، رياضيات 2، إلخ)
  - `id` (uuid, مفتاح أساسي)
  - `grade_id` (uuid, مفتاح أجنبي إلى grades)
  - `name` (text, اسم المادة)
  - `slug` (text, معرف فريد للرابط)
  - `description` (text, وصف المادة)
  - `icon` (text, اسم الأيقونة)
  - `order` (int, ترتيب المادة)
  - `created_at` (timestamp)

- `lessons` — الدروس
  - `id` (uuid, مفتاح أساسي)
  - `subject_id` (uuid, مفتاح أجنبي إلى subjects)
  - `title` (text, عنوان الدرس)
  - `slug` (text, معرف فريد للرابط)
  - `summary` (text, ملخص الدرس)
  - `content` (text, محتوى الدرس)
  - `order` (int, ترتيب الدرس)
  - `created_at` (timestamp)

2. الأمان
- تفعيل RLS على جميع الجداول.
- السماح بالقراءة والكتابة للجميع (anon + authenticated) لأن التطبيق عام بدون تسجيل دخول.
*/

CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'book-open',
  color text NOT NULL DEFAULT 'blue',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id uuid NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'calculator',
  "order" int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (grade_id, slug)
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text NOT NULL,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  "order" int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (subject_id, slug)
);

ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_grades" ON grades;
CREATE POLICY "anon_select_grades" ON grades FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_grades" ON grades;
CREATE POLICY "anon_insert_grades" ON grades FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_grades" ON grades;
CREATE POLICY "anon_update_grades" ON grades FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_grades" ON grades;
CREATE POLICY "anon_delete_grades" ON grades FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_subjects" ON subjects;
CREATE POLICY "anon_select_subjects" ON subjects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_subjects" ON subjects;
CREATE POLICY "anon_insert_subjects" ON subjects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_subjects" ON subjects;
CREATE POLICY "anon_update_subjects" ON subjects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_subjects" ON subjects;
CREATE POLICY "anon_delete_subjects" ON subjects FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_lessons" ON lessons;
CREATE POLICY "anon_select_lessons" ON lessons FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_lessons" ON lessons;
CREATE POLICY "anon_insert_lessons" ON lessons FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_lessons" ON lessons;
CREATE POLICY "anon_update_lessons" ON lessons FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_lessons" ON lessons;
CREATE POLICY "anon_delete_lessons" ON lessons FOR DELETE
  TO anon, authenticated USING (true);
