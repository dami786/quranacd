import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { Input } from '../components/Forms';
import { FaClock, FaMoneyBillWave, FaTag, FaChalkboardTeacher, FaBook, FaAward, FaWhatsapp, FaQuestionCircle, FaHandHoldingHeart, FaMosque, FaChild, FaQuoteLeft, FaQuoteRight /* FaComments - chatbot */ } from 'react-icons/fa';
import Hero from '../components/Hero';
import StepsSection from '../components/StepsSection';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '../components/Buttons';
import { manualCourses } from '../data/courses';
import { getCourseImageUrl } from '../services/api';
// import { submitQuery, getRepliesByEmail } from '../services/api';

// const LAST_QUERY_EMAIL_KEY = 'lastQueryEmail';

const featureIcons = [
  { Icon: FaClock, iconLabel: 'Schedule' },
  { Icon: FaMoneyBillWave, iconLabel: 'Money back' },
  { Icon: FaTag, iconLabel: 'Affordable' },
  { Icon: FaChalkboardTeacher, iconLabel: 'Teachers' },
  { Icon: FaBook, iconLabel: 'Curriculum' },
  { Icon: FaAward, iconLabel: 'Certificate' },
];

const teacherSlides = [
  {
    image: '/images/teacher.jpg',
    heading: 'Meet Our Inspiring Online Quran Teacher Experts',
    intro: 'Discover a profound connection with the Quran through our dedicated Online Quran Teacher experts. Our instructors are committed to nurturing your spiritual growth.',
    boxTitle: 'Four Classes per Month – Steady Progress, Lasting Impact',
    boxText: "Consistency is the key to success. With four classes scheduled per month, you'll experience steady advancement.",
  },
  {
    image: '/images/gh.jpg',
    heading: 'Qualified & Certified Quran Instructors',
    intro: 'Our male and female teachers are trained and certified to teach Noorani Qaida, Tajweed, Hifz, and Tafseer. Learn with confidence from authentic scholars.',
    boxTitle: 'One-to-One Personalized Learning',
    boxText: 'Every student gets individual attention. Our teachers adapt to your pace and focus on your goals—whether reading, memorization, or understanding.',
  },
  {
    image: '/images/hero%202.jpg',
    heading: 'Learn Quran Online at Your Convenience',
    intro: 'Schedule classes when it suits you. We offer flexible timings so you can balance work, family, and your Quranic journey without compromise.',
    boxTitle: 'Free 3-Day Trial – No Commitment',
    boxText: 'Experience our teaching style and curriculum before you enroll. Book your free trial and see why families choose Babul Quran.',
  },
  {
    image: '/images/hero%204.jpg',
    heading: 'From Beginners to Huffaz – We Guide You',
    intro: 'Whether you are starting with Arabic letters or aiming to complete Hifz, our teachers walk with you step by step with patience and expertise.',
    boxTitle: 'Structured Curriculum, Clear Progress',
    boxText: 'We follow a proven path: Noorani Qaida → Nazra → Tajweed → Hifz/Tafseer. Track your progress and celebrate milestones together.',
  },
];

const testimonials = [
  { name: 'Mrs. Zainab Sheikh', role: 'Mother of Ayesha (Nazra Quran student)', quote: "I saw Babul Quran's ad and wasn't sure at first. Now my daughter reads Quran with correct pronunciation after enrolling here. Very satisfied with the results." },
  { name: 'Mrs. Salma Raza', role: 'Mother of Iqra (Quran Studies student)', quote: "I am from Italy and enrolled my daughter after seeing their page. The teacher taught with excellent Tajweed and Islamic guidance. My daughter now recites with confidence and beauty." },
  { name: 'Mr. Ahmed Hassan', role: 'Father of two (Hifz students)', quote: 'Flexible timings and qualified teachers made all the difference. Both my sons are progressing in Hifz. May Allah reward the team at Babul Quran.' },
  { name: 'Mrs. Fatima Khan', role: 'Parent (Free trial then enrolled)', quote: 'The free trial convinced us. Professional setup, patient teacher, and my child looks forward to every class. Highly recommend for online Quran learning.' },
];

export default function Home() {
  const location = useLocation();
  // --- chatbot (commented out) ---
  // const [chatOpen, setChatOpen] = useState(false);
  // const [chatMessages, setChatMessages] = useState([]);
  // const [querySent, setQuerySent] = useState(false);
  // const [queryLoading, setQueryLoading] = useState(false);
  // const [queryError, setQueryError] = useState('');
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const offerTriggeredRef = useRef(false);
  const [teacherSlideIndex, setTeacherSlideIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Show offer popup: 10s after load OR when user scrolls 50% down (whichever first)
  useEffect(() => {
    const tryShow = () => {
      if (offerTriggeredRef.current) return;
      offerTriggeredRef.current = true;
      setShowOfferPopup(true);
    };

    const timer = setTimeout(tryShow, 10_000);

    const onScroll = () => {
      const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = (scrollTop / scrollHeight) * 100;
      if (pct >= 50) tryShow();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Teachers section background + text slider – auto-advance every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setTeacherSlideIndex((i) => (i + 1) % teacherSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Testimonials slider – hero jaisa auto-advance har 4 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- chatbot: fetch replies when chat opens (commented out) ---
  // useEffect(() => {
  //   if (!chatOpen) return;
  //   let email = '';
  //   try { email = localStorage.getItem(LAST_QUERY_EMAIL_KEY) || ''; } catch (_) {}
  //   if (!email.trim()) return;
  //   getRepliesByEmail(email.trim())
  //     .then((res) => {
  //       const data = Array.isArray(res.data) ? res.data : [];
  //       const msgs = [];
  //       data.forEach((item) => {
  //         if (item.message) msgs.push({ from: 'user', text: item.message });
  //         if (item.reply) msgs.push({ from: 'bot', text: item.reply });
  //       });
  //       if (msgs.length) setChatMessages(msgs);
  //     })
  //     .catch(() => {});
  // }, [chatOpen]);

  const closeOfferPopup = () => setShowOfferPopup(false);

  // Nav link se #courses ya #zakat-donation pe click pe us section tak scroll
  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  const faqAnswers = {
    'courses': 'We offer Noorani Qaida, Quran recitation, Tajweed, Tafseer, Memorization and Islamic Studies. All details and trial form are on the Courses and Contact pages.',
    'trial': 'You get 3 days of free one-to-one online Quran classes. Just fill the Contact form or WhatsApp us and we will schedule your trial.',
    'fee': 'Our standard fee is USD $30 per month for one-to-one classes (30 minutes, four classes per month).',
    'contact': 'You can contact us via the Contact page form, email babulquranacademy1@gmail.com or WhatsApp +92 312 4810000.',
  };

  // --- chatbot: quick Q&A + send query (commented out) ---
  // const askBot = (type) => {
  //   const questionMap = {
  //     courses: 'What courses do you offer?',
  //     trial: 'How does the free trial work?',
  //     fee: 'What is the monthly fee?',
  //     contact: 'How can I contact you?',
  //   };
  //   const key = type;
  //   const q = questionMap[key];
  //   const a = faqAnswers[key];
  //   if (!q || !a) return;
  //   setChatMessages((prev) => [
  //     ...prev,
  //     { from: 'user', text: q },
  //     { from: 'bot', text: a },
  //   ]);
  // };

  // const handleSendQuery = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const name = form.queryName?.value?.trim();
  //   const email = form.queryEmail?.value?.trim();
  //   const message = form.queryMessage?.value?.trim();
  //   if (!name || !email || !message) return;
  //   setQueryError('');
  //   setQueryLoading(true);
  //   submitQuery({ name, email, message, phone: form.queryPhone?.value?.trim() || '', package: form.queryPackage?.value?.trim() || '' })
  //     .then(() => {
  //       if (email) try { localStorage.setItem(LAST_QUERY_EMAIL_KEY, email); } catch (_) {}
  //       setQuerySent(true);
  //       form.reset();
  //     })
  //     .catch((err) => setQueryError(err.response?.data?.message || 'Failed to send. Please try again.'))
  //     .finally(() => setQueryLoading(false));
  // };

  return (
    <>
      <Seo
        title="Learn Quran Online | Free Trial"
        description="Babul Quran offers online Quran classes with qualified teachers. Free 3-day trial, flexible schedule, Noorani Qaida, Tajweed, Hifz & more. Enroll now."
      />
      {/* 20% off first admission popup - 10s after load or 50% scroll */}
      {showOfferPopup && (
        <div
          className="fixed inset-0 z-[100] min-h-screen flex items-center justify-center p-4 bg-black/50 animate-fade-in"
          onClick={closeOfferPopup}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-xl shadow-xl border border-gray-200 w-[min(100%,280px)] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeOfferPopup}
              className="absolute top-2 right-2 p-1.5 rounded-lg  text-gray-500 hover:text-primary transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="pt-6 pb-4 px-5 text-center">
              <p className="text-lg font-bold text-primary mb-0.5 leading-tight">20% off on first Admission</p>
              <p className="text-gray-600 text-sm font-medium mb-3">Limited offer</p>
              <Button to="/contact?source=offer" variant="primary" className="w-full py-2.5 text-sm" onClick={closeOfferPopup}>
                Avail this offer
              </Button>
            </div>
          </div>
        </div>
      )}
      <Hero />
      {/* Learn Quran Online - 3 Steps (same as reference) */}
      <ScrollReveal direction="up">
        <StepsSection />
      </ScrollReveal>
      {/* CTA Banner (Islamic pattern bg + left image from Pexels) */}
      <ScrollReveal direction="up">
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-12 md:py-16 overflow-hidden">
        {/* Islamic-style pattern: diagonal stripes + subtle geometric grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                135deg,
                rgba(255,255,255,0.08) 0px,
                rgba(255,255,255,0.08) 12px,
                transparent 12px,
                transparent 24px
              )
            `,
            backgroundSize: '24px 24px',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.3' stroke-width='1'%3E%3Cpath d='M20 2l8 8-8 8-8-8zM0 20l8 8-8 8-8-8zM40 20l8 8-8 8-8-8z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-container mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Left - Quran image (Pexels free) */}
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-white/20 ring-2 ring-white/10">
                <img
                  src="/images/gh.jpg"
                  alt="Quran on rehal – complimentary online Quran classes"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
            {/* Right text */}
            <div className="text-center md:text-left">
              <h2 className="text-lg md:text-xl font-semibold mb-3">
                EXPERIENCE COMPLIMENTARY ONLINE QURAN CLASSES AT NO COST
              </h2>
              <p className="max-w-xl md:max-w-none mb-2 opacity-95">
                Avail our Complimentary Trial Classes by Completing the Form to Learn Quran Online.
                Experience the Three-Day Free Trial Offer from <strong>Babul Quran</strong>. Enroll Now!
              </p>
              <p className="font-semibold mb-5">3 Days Free Trial</p>
              <Button to="/contact" variant="light">
                Book Free Trial Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
      {/* Reason to learn with us (formerly Why Choose) */}
      <ScrollReveal direction="left">
      <section id="about" className="py-16 md:py-20 bg-bg-alt overflow-hidden">
        <div className="max-w-container mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3 animate-fade-in-up">Reason to learn with us</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
              Reason to learn with us
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4 animate-fade-in-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }} />
            <p className="text-gray-600 text-base md:text-lg animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
              Our Competitive Features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: 'Flexible Schedule 24/7', text: 'Our dedicated team ensures 24/7 availability of our online Quran teachers. Engage in online Quran classes conveniently, regardless of your location.' },
              { title: 'Money Back Guarantee', text: 'If you are dissatisfied with our instructors during your one-month online Quran classes, we offer a refund option to return your payment.' },
              { title: 'Affordable Tuition Fee', text: 'Our range of services is designed to be highly competitive. We offer special discounts on family packages and reduced rates for those in need.' },
              { title: 'Qualified Quran Teachers', text: 'Our team of male and female teachers are highly skilled experts who have undergone rigorous training and certification.' },
              { title: 'Authentic & Suitable Curriculum', text: 'Our educational framework emphasizes the fundamental principles of Islamic teachings with a well-structured curriculum.' },
              { title: 'Certificate of Appraisal', text: 'We grant a certificate of achievement to all students upon the successful culmination of their course.' },
            ].map(({ title, text }, idx) => {
              const { Icon } = featureIcons[idx] || featureIcons[0];
              return (
                <div
                  key={title}
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 opacity-0 animate-fade-in-up relative overflow-hidden card-islamic-pattern"
                  style={{ animationDelay: `${150 + idx * 80}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary-dark/15 text-primary flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Reasons to Hire Us - image + text (jaise screenshot) */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 animate-fade-in-up">
            Reasons to <span className="text-primary">Hire Us?</span>
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Reasons to Hire Us image – height barabar, centre aligned */}
            <div className="w-full opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
              <div className="rounded-3xl overflow-hidden shadow-card border border-gray-200 h-full min-h-[320px] md:min-h-[400px] flex items-center justify-center">
                <img
                  src="/images/hiring%20us.jpg"
                  alt="Reasons to hire Babul Quran – qualified teachers and flexible learning"
                  className="w-full h-full min-h-[320px] md:min-h-[400px] object-cover object-center"
                />
              </div>
            </div>
            {/* Right: content – centre aligned with image */}
            <div className="w-full space-y-4 text-gray-600 text-base md:text-lg leading-relaxed text-center md:text-left opacity-0 animate-fade-in-up animate-delay-150 flex flex-col justify-center" style={{ animationFillMode: 'forwards' }}>
              <p>
                At Babul Quran, we take pride in our team of highly qualified and experienced teachers. They are
                dedicated to providing you with personalized guidance and support on your Quranic journey. We understand
                that everyone has different commitments. That&apos;s why we offer flexible learning options for the
                students. Whether you&apos;re a working professional, a student, or a busy parent, you can choose the time
                that suits you best. Our <strong>online Quran classes</strong> are available seven days a week, allowing you
                to learn at your convenience.
              </p>
            </div>
          </div>
          {/* Reason to learn with us – section commented out
          <div className="mt-12 max-w-6xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-8">
              Reason to learn with us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: 'FLEXIBLE SCHEDULE',
                  text: 'At Babul Quran, we understand busy schedules. Our tutors offer flexible class timings so students can learn at their convenience without compromising on quality—whether you have a few days a week or more.',
                  Icon: FaClock,
                },
                {
                  title: 'PERSONALIZED LEARNING',
                  text: 'Every student is unique. Our one-to-one sessions are tailored to individual pace, style, and goals—ensuring confidence, consistency, and long-term progress in Quran and Islamic studies.',
                  Icon: FaChalkboardTeacher,
                },
                {
                  title: 'QUALIFIED TUTORS',
                  text: 'Learn from certified male and female Quran teachers who specialize in Noorani Qaida, Tajweed, Hifz, and Tafseer. Clear, engaging, and effective lessons every time.',
                  Icon: FaBook,
                },
              ].map(({ title, text, Icon }, idx) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${120 + idx * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-3 text-primary">{title}</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
          */}
        </div>
      </section>
      </ScrollReveal>

      {/* Our Packages – few days / full week options for students */}
      <ScrollReveal direction="up">
      <section id="packages" className="py-14 md:py-16 bg-bg-alt">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Our Premium Packages
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            We have flexible packages so students who can attend only a few days a week can still learn at their pace.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 max-w-6xl mx-auto">
            {[
              { name: 'Basic', days: '2–3 days/week', desc: 'Ideal when time is limited. Two or three focused sessions weekly for steady progress.', icon: '◇' },
              { name: 'Standard', days: '4 days/week', desc: 'Balanced option with four weekly sessions to maintain momentum and consistency.', icon: '★' },
              { name: 'Plus', days: '5 days/week', desc: 'Five sessions weekly for deeper understanding and stronger improvement.', icon: '+' },
              { name: 'Premium', days: '6 days/week', desc: 'Maximum support with six sessions weekly for intensive learning and mastery.', icon: '▣' },
              { name: 'Flexi', days: 'Flexible days', desc: 'Choose your preferred days each week. Suits changing schedules and busy families.', icon: '◆' },
            ].map((pkg, idx) => (
              <div
                key={pkg.name}
                className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 text-center opacity-0 animate-fade-in-up flex flex-col min-h-[280px]"
                style={{ animationDelay: `${80 * idx}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 text-xl font-bold">{pkg.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{pkg.name}</h3>
                <p className="text-primary text-sm font-semibold mb-2">{pkg.days}</p>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed flex-1">{pkg.desc}</p>
                <Button to="/contact?source=packages" variant="primary" className="mt-4 w-full py-2 text-sm flex-shrink-0">
                  Enquire
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Teachers – background image slider + text flips with each slide */}
      <ScrollReveal direction="right">
      <section id="teachers" className="py-14 text-center relative overflow-hidden min-h-[420px] md:min-h-[480px] flex flex-col justify-center">
        {/* Background slider – 2–4 images with fade */}
        {teacherSlides.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: 'contrast(1.12) brightness(1.1)',
              opacity: teacherSlideIndex === idx ? 1 : 0,
              zIndex: teacherSlideIndex === idx ? 0 : -1,
            }}
            aria-hidden
          />
        ))}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.52) 0%, rgba(30, 41, 59, 0.48) 35%, rgba(30, 41, 59, 0.5) 65%, rgba(15, 23, 42, 0.55) 100%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 max-w-container mx-auto px-5">
          {/* Text flips with slide – key by index for smooth change */}
          {teacherSlides.map((slide, idx) => (
            <div
              key={idx}
              className="transition-opacity duration-500 ease-in-out"
              style={{
                opacity: teacherSlideIndex === idx ? 1 : 0,
                display: teacherSlideIndex === idx ? 'block' : 'none',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-fade-in-up flex flex-row items-start justify-start md:justify-center gap-2 text-left md:text-center">
                <FaChalkboardTeacher className="w-8 h-8 md:w-10 md:h-10 text-primary shrink-0 mt-0.5" />
                <span>{slide.heading}</span>
              </h2>
              <p className="max-w-2xl mx-auto text-white/95 mb-4">
                {slide.intro}
              </p>
              <p className="max-w-2xl mx-auto text-gray-700 mb-6 bg-white p-4 rounded-lg border-l-4 border-primary text-left">
                <strong>{slide.boxTitle}</strong>
                <br />
                {slide.boxText}
              </p>
            </div>
          ))}
          <Button to="/contact" variant="primary">
            Join Us Today
          </Button>
        </div>
        {/* Slider dots – click to go to slide */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {teacherSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTeacherSlideIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                teacherSlideIndex === idx ? 'bg-primary scale-125' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>
      </ScrollReveal>
      {/* Courses from API - moved below Teachers */}
      <ScrollReveal direction="up">
      <section id="courses" className="py-14 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-3 animate-fade-in-up">
            We Offer Various Courses to Learn Quran Online
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
            Our mission is to provide convenient Quranic education to individuals from all walks of life.
          </p>
          {/* Manual courses – detail ke sath */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {manualCourses.map((course, index) => (
              <div
                key={course.titleEn}
                className="bg-bg-alt rounded-xl border border-gray-200 overflow-hidden hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 opacity-0 animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${80 * index}ms`, animationFillMode: 'forwards' }}
              >
                <div className="h-40 w-full flex-shrink-0 overflow-hidden bg-gray-200">
                  <img
                    src={getCourseImageUrl(course)}
                    alt={course.titleEn}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target;
                      if (img.src.endsWith('.png')) img.src = img.src.replace(/\.png$/, '.jpg');
                      else img.src = '/images/image.png';
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <Link to={`/details/${index}`} className="font-bold text-gray-800 text-lg mb-2 hover:text-primary transition-colors block">
                    {course.titleEn}
                  </Link>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button to="/contact?source=enrollment" variant="primary" className="w-fit text-sm">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Know More – in courses ke ilawa parhna/janana ho to contact pe */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Want to study something else or need more information?</p>
            <Button to="/contact?source=knowmore" variant="primary" className="px-6 py-3">
              Know More
            </Button>
          </div>
        </div>
      </section>
      </ScrollReveal>
      {/* Price – commented out
      <ScrollReveal direction="left">
      <section id="fee" className="py-12 bg-white text-center">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
            USD $30.00 Only/Month – Affordability without Compromise
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We offer this exclusive learning opportunity at an <strong>unbelievably affordable rate</strong> of
            USD $30.00 per month. One-to-one learning with 30-minute classes, four times a month.
          </p>
        </div>
      </section>
      </ScrollReveal>
      */}
      {/* Zakat & Donation - pehle jaisa: cards, button click pe form */}
      <ScrollReveal direction="right">
      <section id="zakat-donation" className="py-14 md:py-16 bg-bg-alt">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-left md:text-center mb-2 animate-fade-in-up flex flex-row items-start justify-start md:justify-center gap-2">
            <FaHandHoldingHeart className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0 mt-0.5" />
            <span>Zakat & Donation</span>
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
            Fulfill your Zakat and Sadaqah by supporting Islamic education and masjid development. Your contribution helps madrasa children and mosque building.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-soft hover:shadow-card-hover transition-all text-center flex flex-col">
              <FaChild className="w-14 h-14 text-primary mx-auto mb-4 flex-shrink-0" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Donate for Madrasa</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Support Islamic education for children. Your donation helps run our madrasa.</p>
              <Button to="/donate/madrasa" variant="primary" className="w-full py-3">
                View Detail
              </Button>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-soft hover:shadow-card-hover transition-all text-center flex flex-col">
              <FaMosque className="w-14 h-14 text-primary mx-auto mb-4 flex-shrink-0" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Donate for Mosque</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Contribute to mosque building and maintenance. May Allah accept your sadaqah.</p>
              <Button to="/donate/mosque" variant="primary" className="w-full py-3">
                View Detail
              </Button>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-soft hover:shadow-card-hover transition-all text-center flex flex-col">
              <FaHandHoldingHeart className="w-14 h-14 text-primary mx-auto mb-4 flex-shrink-0" />
              <h3 className="font-bold text-gray-800 text-lg mb-2">Fitrana & Sadaqa</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Give Fitrana (Eid al-Fitr) and general Sadaqa. Your charity supports those in need.</p>
              <Button to="/donate/fitrana" variant="primary" className="w-full py-3">
                View Detail
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6 animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
            Contact us to specify your intention (Zakat / Sadaqah) and we will guide you through a secure process.
          </p>
        </div>
      </section>
      </ScrollReveal>
      {/* CTA */}
      <ScrollReveal direction="up">
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 text-center">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-lg md:text-xl font-semibold mb-3 animate-fade-in-up flex flex-row items-start justify-start md:justify-center gap-2 text-left md:text-center">
            <FaAward className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5" />
            <span>Claim Your FREE Online Quran Class Trial Today</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-6 opacity-95">
            We are offering a free online Quran class. Delve into a personalized one-to-one, 30-minute class,
            tailored to your level and goals, all at absolutely no cost!
          </p>
          <Button to="/contact?source=enrollment" variant="light">
            Quick Admission
          </Button>
        </div>
      </section>
      </ScrollReveal>
      {/* FAQ */}
      <ScrollReveal direction="left">
      <section className="py-14 bg-bg-alt">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-left md:text-center mb-10 animate-fade-in-up flex flex-row items-start justify-start md:justify-center gap-2">
            <FaQuestionCircle className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0 mt-0.5" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: 'Who can enroll in "Learn Quran Online" courses?', a: 'Everyone can enroll in our courses, from kids to adults who are willing to learn Quran online.' },
              { q: 'Is there a trial period available?', a: 'Yes, we offer a trial period for interested students. It\'s an excellent opportunity to experience our online Quran classes and interact with our teachers.' },
              { q: 'Can I schedule classes according to my kid\'s availability?', a: 'Absolutely! We offer flexible online Quran classes for kids to accommodate your child\'s schedule and routines.' },
              { q: 'What is the duration of each class?', a: 'Generally, classes are scheduled for 30-minute or 60-minute sessions to accommodate various learning needs.' },
            ].map(({ q, a }, idx) => (
              <div key={q} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 opacity-0 animate-fade-in-up" style={{ animationDelay: `${100 + idx * 100}ms`, animationFillMode: 'forwards' }}>
                <h3 className="font-semibold text-gray-800 px-5 py-4 flex items-center gap-2">
                  <FaQuestionCircle className="w-4 h-4 text-primary flex-shrink-0" /> {q}
                </h3>
                <p className="text-gray-600 text-sm px-5 pb-4 pt-0 pl-11">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>
      {/* Testimonials – footer se pehle, image jaisa design (2 cards side-by-side, dots) */}
      <ScrollReveal direction="up">
      <section id="testimonials" className="py-14 md:py-16 bg-white">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
            See What Others Are Saying About Babul Quran
          </h2>
          <div className="max-w-5xl mx-auto">
            {/* Desktop: 2 cards side-by-side per slide (2 slides) */}
            <div className="hidden md:block overflow-hidden">
              {[0, 1].map((page) => (
                <div
                  key={page}
                  className={`grid grid-cols-2 gap-4 transition-opacity duration-400 ${Math.floor(testimonialIndex / 2) === page ? 'block' : 'hidden'}`}
                >
                  {testimonials.slice(page * 2, page * 2 + 2).map((t) => (
                    <div key={t.name} className="bg-sky-50 rounded-2xl p-6 md:p-8 border border-sky-100 shadow-md relative min-h-[200px] flex flex-col">
                      <FaQuoteLeft className="absolute top-4 left-4 w-7 h-7 text-primary/30" aria-hidden />
                      <FaQuoteRight className="absolute bottom-4 right-4 w-7 h-7 text-primary/30" aria-hidden />
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed flex-1 pt-2 pr-8 pb-2 pl-8">{t.quote}</p>
                      <p className="font-bold text-gray-800 text-base">{t.name}</p>
                      <p className="text-gray-600 text-sm">{t.role}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Mobile: 1 card at a time */}
            <div className="md:hidden">
              {testimonials.map((t, idx) => (
                <div key={t.name} className={`${testimonialIndex === idx ? 'block' : 'hidden'}`}>
                  <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100 shadow-md relative">
                    <FaQuoteLeft className="absolute top-4 left-4 w-7 h-7 text-primary/30" aria-hidden />
                    <FaQuoteRight className="absolute bottom-4 right-4 w-7 h-7 text-primary/30" aria-hidden />
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 pt-2 pr-8 pb-2 pl-8">{t.quote}</p>
                    <p className="font-bold text-gray-800 text-base">{t.name}</p>
                    <p className="text-gray-600 text-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots: 2 on desktop (2 slides), 4 on mobile (4 slides) */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="hidden md:flex justify-center gap-2">
                {[0, 1].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setTestimonialIndex(page * 2)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      Math.floor(testimonialIndex / 2) === page ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${page + 1}`}
                  />
                ))}
              </div>
              <div className="flex md:hidden justify-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      testimonialIndex === idx ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
      {/* WhatsApp (chatbot commented out) */}
      {createPortal(
        <>
          <a
            href="https://wa.me/923124810000"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 left-4 md:bottom-6 md:left-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full shadow-card flex items-center gap-2 font-semibold z-50 transition-all hover:scale-105 hover:shadow-card-hover text-sm md:text-base"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 flex-shrink-0" /> <span className="hidden sm:inline">WhatsApp us</span>
          </a>
          {/* --- chatbot button + panel (commented out) ---
          <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
            <Button
              type="button"
              variant="primary"
              onClick={() => setChatOpen((o) => !o)}
              className="px-4 py-2.5 md:px-4 md:py-3 rounded-full shadow-card text-sm md:text-base"
              aria-label="Open chatbot"
            >
              <FaComments className="w-5 h-5 flex-shrink-0" /> <span className="hidden sm:inline">Chat with us</span>
            </Button>
          </div>
          {chatOpen && (
            <div className="fixed top-20 right-4 md:top-24 md:right-6 w-80 max-w-[90vw] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-card border border-gray-200 z-50 flex flex-col overflow-hidden">
              <div className="flex-shrink-0 px-4 py-3 bg-primary text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaComments className="w-4 h-4" />
                  <span className="font-semibold text-sm">Quran Academy Chatbot</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setChatOpen(false); setQuerySent(false); setQueryError(''); }}
                  className="text-white/80 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="px-4 py-3 space-y-2 text-xs text-gray-700">
                {chatMessages.length === 0 && (
                  <p className="text-gray-600">
                    Ask anything about our academy, courses, fee or free trial. Select a quick question below to begin.
                  </p>
                )}
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-xl max-w-[80%] ${
                        m.from === 'user'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-3 pt-2 border-t border-gray-100">
                <p className="text-[11px] text-gray-500 mb-1">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outlinePrimary" className="rounded-full text-xs px-2 py-1 hover:text-white" onClick={() => askBot('courses')}>
                    Courses
                  </Button>
                  <Button type="button" variant="outlinePrimary" className="rounded-full text-xs px-2 py-1 hover:text-white" onClick={() => askBot('trial')}>
                    Free Trial
                  </Button>
                  <Button type="button" variant="outlinePrimary" className="rounded-full text-xs px-2 py-1 hover:text-white" onClick={() => askBot('fee')}>
                    Fee
                  </Button>
                  <Button type="button" variant="outlinePrimary" className="rounded-full text-xs px-2 py-1 hover:text-white" onClick={() => askBot('contact')}>
                    Contact
                  </Button>
                </div>
                <p className="text-[11px] text-gray-500 mt-3 mb-1">Or send your question – we&apos;ll reply soon:</p>
                {querySent ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                    We&apos;ve received your query. Our team will get back to you soon via email or WhatsApp.
                    <button type="button" onClick={() => setQuerySent(false)} className="block mt-2 text-primary font-medium text-left">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSendQuery} className="space-y-2">
                    <input type="text" name="queryName" required placeholder="Your name" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                    <input type="email" name="queryEmail" required placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                    <input type="tel" name="queryPhone" placeholder="Phone (optional)" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                    <select name="queryPackage" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">
                      <option value="">Package (if enquiring about one)</option>
                      <option value="Basic">Basic (2–3 days/week)</option>
                      <option value="Standard">Standard (4 days/week)</option>
                      <option value="Plus">Plus (5 days/week)</option>
                      <option value="Premium">Premium (6 days/week)</option>
                      <option value="Flexi">Flexi (flexible days)</option>
                    </select>
                    <textarea name="queryMessage" required rows={2} placeholder="Your question or message" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
                    {queryError && <p className="text-red-600 text-xs">{queryError}</p>}
                    <Button type="submit" variant="primary" className="w-full py-2 text-sm" disabled={queryLoading}>{queryLoading ? 'Sending...' : 'Send query'}</Button>
                  </form>
                )}
              </div>
              </div>
            </div>
          )}
          */}
        </>,
        document.body
      )}
    </>
  );
}
