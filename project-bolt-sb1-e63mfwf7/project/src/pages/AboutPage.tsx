import { Target, Eye, Heart, BookOpen, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'رسالتنا',
      desc: 'توفير تعليم رياضي عالي الجودة لجميع طلاب المرحلة الثانوية، مع تبسيط المفاهيم المعقدة وجعلها في متناول الجميع.',
      color: 'brand',
    },
    {
      icon: Eye,
      title: 'رؤيتنا',
      desc: 'أن نكون المنصة التعليمية الأولى في تدريس الرياضيات للمرحلة الثانوية، وتمكين الطلاب من تحقيق التفوق الأكاديمي.',
      color: 'emerald',
    },
    {
      icon: Heart,
      title: 'قيمنا',
      desc: 'الجودة، الشمولية، والوصول المجاني للجميع. نؤمن بأن التعليم حق لكل طالب يسعى للنجاح.',
      color: 'amber',
    },
  ];

  const colorClasses: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 mb-12 animate-fade-in-up">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/5"></div>
          <div className="relative z-10 text-center">
            <h1 className="font-cairo text-3xl sm:text-4xl font-extrabold text-white mb-4">
              من نحن
            </h1>
            <p className="text-white/80 font-tajawal text-lg max-w-2xl mx-auto leading-relaxed">
              منصة تعليمية متخصصة في مادة الرياضيات للمرحلة الثانوية،
              نسعى لتقديم محتوى تعليمي متميز يلبي احتياجات الطلاب
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${colorClasses[value.color]} flex items-center justify-center mx-auto mb-5`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-cairo text-xl font-bold text-slate-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 font-tajawal text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg shadow-slate-200/50 mb-16 animate-fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: BookOpen, value: '6', label: 'مواد دراسية', color: 'text-brand-600 bg-brand-50' },
              { icon: Users, value: '3', label: 'مراحل دراسية', color: 'text-emerald-600 bg-emerald-50' },
              { icon: Award, value: '100%', label: 'محتوى مجاني', color: 'text-amber-600 bg-amber-50' },
              { icon: Target, value: '∞', label: 'إمكانية التوسع', color: 'text-purple-600 bg-purple-50' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index}>
                  <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="font-cairo text-3xl font-extrabold text-slate-800 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 font-tajawal text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 animate-fade-in-up">
          <h2 className="font-cairo text-2xl font-extrabold text-slate-800 mb-4">
            قصة المنصة
          </h2>
          <p className="text-slate-600 font-tajawal text-lg leading-loose mb-4">
            بدأت منصة الرياضيات من فكرة بسيطة: تسهيل تعلم الرياضيات لطلاب المرحلة الثانوية
            عبر توفير شروحات واضحة ومنظمة في مكان واحد. نؤمن بأن الرياضيات مادة يمكن للجميع
            إتقانها بالطريقة الصحيحة والمحتوى المناسب.
          </p>
          <p className="text-slate-600 font-tajawal text-lg leading-loose">
            اليوم، نقدم محتوى منظماً لثلاث مراحل دراسية وستة مواد، ونخطط لإضافة المزيد من
            الدروس والاختبارات والملخصات بشكل مستمر لخدمة طلابنا.
          </p>
        </div>
      </div>
    </div>
  );
}
