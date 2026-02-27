import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import { HiArrowLeft, HiAcademicCap } from 'react-icons/hi';
import Seo from '../components/Seo';
import { getCourseImageUrl } from '../services/api';
import { Button } from '../components/Buttons';
import { manualCourses } from '../data/courses';

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const index = parseInt(id, 10);
    if (!Number.isNaN(index) && index >= 0 && index < manualCourses.length) {
      const course = manualCourses[index];
      setItem({
        title: course.titleEn,
        titleEn: course.titleEn,
        description: course.description,
        image: course.image,
      });
    } else {
      setError('Course not found.');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-bg-alt flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Not found.'}</p>
          <Button to="/" variant="primary">Back to Home</Button>
        </div>
      </div>
    );
  }

  const imageUrl = getCourseImageUrl(item);
  const metaDesc = item.description ? (item.description.slice(0, 155) + (item.description.length > 155 ? '...' : '')) : `Learn ${item.title} with Babul Quran. Online Quran classes.`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: item.title,
    description: metaDesc,
    provider: { '@type': 'Organization', name: 'Babul Quran' },
    ...(origin && imageUrl && { image: imageUrl.startsWith('http') ? imageUrl : `${origin}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}` }),
  };

  const index = parseInt(id, 10);
  const relatedCourses = manualCourses.filter((_, i) => i !== index);

  return (
    <div className="min-h-screen bg-white py-14">
      <Seo title={item.title} description={metaDesc} image={imageUrl || undefined} canonicalPath={`/details/${id}`} schema={courseSchema} />
      <div className="max-w-container mx-auto px-5">
        <div className="max-w-2xl mx-auto">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={item.title}
              className="w-full h-64 object-cover rounded-xl mb-6 shadow-card animate-fade-in-up"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 animate-fade-in-up">
              <FaBookOpen className="w-20 h-20 text-white/90" />
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 animate-fade-in-up animate-delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>{item.title}</h1>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
            {item.description}
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed animate-fade-in-up animate-delay-350 opacity-0" style={{ animationFillMode: 'forwards' }}>
            In this course you will study in one-to-one online classes with qualified teachers, following a structured plan of new lessons, revision and regular
            feedback. Flexible timings allow you to choose slots that match your routine and time zone, while homework and practice ensure that you remember what
            you learn and slowly build a strong, lifelong connection with the Quran. Classes are kept interactive and encouraging so that children and adults
            both stay motivated, ask questions openly, and feel confident in their recitation and understanding. From the very first lesson, our aim is that
            every student feels supported, progresses step by step, and sees real improvement in their Quran journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up animate-delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Button to="/contact?source=enrollment" variant="primary" className="inline-flex items-center gap-2">
              <HiAcademicCap className="w-4 h-4" /> Enroll Now
            </Button>
            <Button to="/#courses" variant="outlinePrimary" className="inline-flex items-center gap-2 hover:text-white">
              <HiArrowLeft className="w-4 h-4" /> Back to Courses
            </Button>
          </div>

          {relatedCourses.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <HiAcademicCap className="w-6 h-6 text-primary" /> Related Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 -mx-1">
                {manualCourses.map((course, i) => {
                  if (i === index) return null;
                  const courseImage = getCourseImageUrl(course);
                  return (
                    <Link
                      key={course.titleEn}
                      to={`/details/${i}`}
                      className="group block bg-bg-alt rounded-xl border border-gray-200 overflow-hidden hover:shadow-card-hover hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="h-36 w-full overflow-hidden bg-gray-200">
                        <img
                          src={courseImage}
                          alt={course.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const img = e.target;
                            if (img.src && !img.src.includes('image.png')) img.src = '/images/image.png';
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">{course.titleEn}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{course.description}</p>
                        <span className="inline-block mt-2 text-primary text-sm font-medium group-hover:underline">View course →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
