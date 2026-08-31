import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, User } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 sm:p-12 mb-12 animate-fade-in-up">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-white/5"></div>
          <div className="relative z-10 text-center">
            <h1 className="font-cairo text-3xl sm:text-4xl font-extrabold text-white mb-4">
              تواصل معنا
            </h1>
            <p className="text-white/80 font-tajawal text-lg max-w-2xl mx-auto leading-relaxed">
              نحن هنا للإجابة على استفساراتك واقتراحاتك
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-4 animate-fade-in-up">
            {[
              {
                icon: Mail,
                title: 'البريد الإلكتروني',
                value: 'info@math-platform.edu',
                color: 'brand',
              },
              {
                icon: Phone,
                title: 'الهاتف',
                value: '+966 50 000 0000',
                color: 'emerald',
                ltr: true,
              },
              {
                icon: MapPin,
                title: 'الموقع',
                value: 'المملكة العربية السعودية',
                color: 'amber',
              },
            ].map((info, index) => {
              const Icon = info.icon;
              const colorClasses: Record<string, string> = {
                brand: 'bg-brand-50 text-brand-600',
                emerald: 'bg-emerald-50 text-emerald-600',
                amber: 'bg-amber-50 text-amber-600',
              };
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl ${colorClasses[info.color]} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-cairo text-base font-bold text-slate-800 mb-1">
                      {info.title}
                    </h3>
                    <p
                      className="text-slate-500 font-tajawal text-sm"
                      dir={info.ltr ? 'ltr' : undefined}
                    >
                      {info.value}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="p-6 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-brand-600" />
                <h3 className="font-cairo text-base font-bold text-slate-800">
                  ساعات العمل
                </h3>
              </div>
              <p className="text-slate-500 font-tajawal text-sm leading-relaxed">
                الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً
                <br />
                الجمعة - السبت: مغلق
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 animate-fade-in-up delay-100">
            <h2 className="font-cairo text-2xl font-extrabold text-slate-800 mb-2">
              أرسل لنا رسالة
            </h2>
            <p className="text-slate-500 font-tajawal text-sm mb-6">
              سنرد عليك في أقرب وقت ممكن
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-cairo text-xl font-bold text-slate-800 mb-2">
                  تم إرسال رسالتك بنجاح
                </h3>
                <p className="text-slate-500 font-tajawal text-sm">
                  شكراً لتواصلك معنا، سنرد عليك قريباً
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 font-tajawal mb-2">
                    الاسم
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pr-11 pl-4 py-3 rounded-xl border-2 border-slate-200 font-tajawal text-slate-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 font-tajawal mb-2">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pr-11 pl-4 py-3 rounded-xl border-2 border-slate-200 font-tajawal text-slate-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 font-tajawal mb-2">
                    الرسالة
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 font-tajawal text-slate-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-l from-brand-600 to-brand-700 text-white font-bold font-tajawal hover:from-brand-700 hover:to-brand-800 transition-all duration-300 shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40"
                >
                  <Send className="w-5 h-5" />
                  إرسال الرسالة
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
