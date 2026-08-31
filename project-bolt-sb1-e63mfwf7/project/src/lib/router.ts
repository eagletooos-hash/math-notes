import type { Page } from '@/lib/types';

export function parseHash(): Page {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'home' };

  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'contact') return { name: 'contact' };

  if (parts[0] === 'grade' && parts[1]) {
    if (parts[2] === 'subject' && parts[3]) {
      if (parts[4] === 'lesson' && parts[5]) {
        return { name: 'lesson', gradeSlug: parts[1], subjectSlug: parts[3], lessonSlug: parts[5] };
      }
      return { name: 'subject', gradeSlug: parts[1], subjectSlug: parts[3] };
    }
    return { name: 'grade', gradeSlug: parts[1] };
  }

  return { name: 'home' };
}

export function navigate(page: Page): void {
  let hash = '#/';
  switch (page.name) {
    case 'home':
      hash = '#/';
      break;
    case 'about':
      hash = '#/about';
      break;
    case 'contact':
      hash = '#/contact';
      break;
    case 'grade':
      hash = `#/grade/${page.gradeSlug}`;
      break;
    case 'subject':
      hash = `#/grade/${page.gradeSlug}/subject/${page.subjectSlug}`;
      break;
    case 'lesson':
      hash = `#/grade/${page.gradeSlug}/subject/${page.subjectSlug}/lesson/${page.lessonSlug}`;
      break;
  }
  window.location.hash = hash;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function pageToHref(page: Page): string {
  let hash = '#/';
  switch (page.name) {
    case 'home':
      hash = '#/';
      break;
    case 'about':
      hash = '#/about';
      break;
    case 'contact':
      hash = '#/contact';
      break;
    case 'grade':
      hash = `#/grade/${page.gradeSlug}`;
      break;
    case 'subject':
      hash = `#/grade/${page.gradeSlug}/subject/${page.subjectSlug}`;
      break;
    case 'lesson':
      hash = `#/grade/${page.gradeSlug}/subject/${page.subjectSlug}/lesson/${page.lessonSlug}`;
      break;
  }
  return hash;
}
