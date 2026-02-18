import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import { Input, Textarea, Select } from '../components/Forms';
import { Button } from '../components/Buttons';
import { submitTrial } from '../services/api';

const courseOptions = [
  'Select Course',
  'Noorani Qaida',
  'Recite Quran',
  'Quran with Tajweed',
  'Quran with Tafseer',
  'Quran Memorization',
  'Islamic Studies',
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const sourceFromUrl = searchParams.get('source');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    const form = e.target;
    const data = {
      name: form.name?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      phone: form.phone?.value?.trim() || '',
      course: form.course?.value?.trim() || '',
      message: form.message?.value?.trim() || '',
      source: sourceFromUrl === 'enrollment' ? 'enrollment' : 'free_trial',
    };
    submitTrial(data)
      .then(() => {
        if (localStorage.getItem('token')) {
          localStorage.setItem('hasInquiry', 'true');
          window.dispatchEvent(new Event('inquiry-change'));
        }
        setMessage({ type: 'success', text: 'Thank you! Your inquiry has been received. We will contact you soon for your free trial.' });
        form.reset();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to send. Please try again.';
        setMessage({ type: 'error', text: msg });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-14 md:py-16 max-w-container mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center animate-fade-in-up flex items-center justify-center gap-2">
          <FaEnvelope className="w-9 h-9 text-primary" /> {sourceFromUrl === 'enrollment' ? 'Enroll / Get Admission' : 'Get in Touch'}
        </h1>
        <p className="text-gray-600 text-center max-w-xl mx-auto mb-10 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
          {sourceFromUrl === 'enrollment'
            ? 'Complete the form below to enroll in a course or get admission. Our team will contact you to schedule your classes.'
            : 'Send Inquiry – Experience the convenience of learning Quran online. Complete the form and our team will assist you in scheduling your trial classes.'}
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Your Name" name="name" required placeholder="Your name" />
            <Input label="Your Email" name="email" type="email" required placeholder="your@email.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone / WhatsApp" name="phone" type="tel" placeholder="+92 312 4810000" />
            <Select
              label="Select Course"
              name="course"
              options={courseOptions}
            />
          </div>
          <Textarea label="Your Message" name="message" rows={4} placeholder="Your message..." />
          {message.text && (
            <p className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full inline-flex items-center justify-center gap-2" disabled={loading}>
            <FaPaperPlane className="w-4 h-4" /> {loading ? 'Sending...' : sourceFromUrl === 'enrollment' ? 'Submit Enquiry' : 'Send Inquiry / Start Free Trial'}
          </Button>
        </form>
      </section>
    </div>
  );
}
