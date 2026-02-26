import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import { Input, Textarea, Select } from '../components/Forms';
import { Button } from '../components/Buttons';
import { submitTrial, submitQuery } from '../services/api';

const courseOptions = [
  'Select Course',
  'Noorani Qaida',
  'Recite Quran',
  'Quran with Tajweed',
  'Quran with Tafseer',
  'Quran Memorization',
  'Islamic Studies',
  'Any other',
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const sourceFromUrl = searchParams.get('source');
  const packageFromUrl = searchParams.get('pkg') || '';
  const isEnrollment = sourceFromUrl === 'enrollment';
  const isPackages = sourceFromUrl === 'packages';
  const showCourseField = isEnrollment || isPackages;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedCourse, setSelectedCourse] = useState('Select Course');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const form = e.target;
    const courseVal = form.course?.value?.trim() || '';
    const otherText = form.courseOther?.value?.trim() || '';
    let messageVal = form.message?.value?.trim() || '';

    if (isEnrollment && (!courseVal || courseVal === 'Select Course')) {
      setMessage({ type: 'error', text: 'Please select a course for enrollment.' });
      return;
    }

    setLoading(true);
    if (courseVal === 'Any other' && otherText) {
      messageVal = (messageVal ? messageVal + '\n\n' : '') + 'Course/Subject requested: ' + otherText;
    }
    const name = form.name?.value?.trim() || '';
    const email = form.email?.value?.trim() || '';
    const phone = form.phone?.value?.trim() || '';

    const trialPayload = {
      name,
      email,
      phone,
      course: courseVal,
      message: messageVal,
      source: isEnrollment ? 'enrollment' : 'free_trial',
    };

    // Packages section se aaye hue enquiries Queries API pe jaayengi (package + course save hoga)
    const request = isPackages
      ? submitQuery({
          name,
          email,
          phone,
          message: messageVal || `Package enquiry${packageFromUrl ? ` for ${packageFromUrl}` : ''}.`,
          package: packageFromUrl,
          course: courseVal,
        })
      : submitTrial(trialPayload);

    request
      .then(() => {
        if (localStorage.getItem('token')) {
          localStorage.setItem('hasInquiry', 'true');
          window.dispatchEvent(new Event('inquiry-change'));
        }
        const successText = isEnrollment
          ? 'Thank you! Your enrollment enquiry has been received. We will contact you soon.'
          : isPackages
          ? 'Thank you! Your package enquiry has been received. We will contact you soon.'
          : 'Thank you! Your inquiry has been received. We will contact you soon for your free trial.';
        setMessage({ type: 'success', text: successText });
        form.reset();
        setSelectedCourse('Select Course');
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Failed to send. Please try again.';
        setMessage({ type: 'error', text: msg });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Contact"
        description="Contact Babul Quran for free trial or enrollment. Send your inquiry for online Quran classes. We'll help you schedule classes and get started."
        canonicalPath="/contact"
      />
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
          <div className={`grid grid-cols-1 ${showCourseField ? 'sm:grid-cols-2' : ''} gap-4`}>
            <Input label="Your Name" name="name" required placeholder="Your name" />
            <Input label="Your Email" name="email" type="email" required placeholder="your@email.com" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone / WhatsApp" name="phone" type="tel" placeholder="+92 312 4810000" />
            {showCourseField && (
              <div className="space-y-2">
                <Select
                  label={isEnrollment ? 'Select Course (required)' : 'Select Course'}
                  name="course"
                  options={courseOptions}
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required={isEnrollment}
                />
                {selectedCourse === 'Any other' && (
                  <Input
                    label="Specify what you want to learn"
                    name="courseOther"
                    placeholder="e.g. Arabic language, specific Surah, etc."
                  />
                )}
              </div>
            )}
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
