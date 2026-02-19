import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';
import { HiArrowLeft, HiAcademicCap } from 'react-icons/hi';
import Seo from '../components/Seo';
import { getItemById, getImageUrl } from '../services/api';
import { Button } from '../components/Buttons';
import { manualCourses } from '../data/courses';

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (!id) return;
    const index = parseInt(id, 10);
    if (!Number.isNaN(index) && index >= 0 && index < manualCourses.length) {
      const course = manualCourses[index];
      setItem({
        title: course.titleEn,
        description: course.description,
        image: course.image,
        price: null,
      });
      setIsManual(true);
      setLoading(false);
      return;
    }
    getItemById(id)
      .then((res) => {
        setItem(res.data);
        setIsManual(false);
      })
      .catch((err) => setError(err.response?.data?.message || 'Course not found.'))
      .finally(() => setLoading(false));
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

  const imageUrl = isManual ? item.image : getImageUrl(item.image);
  const metaDesc = item.description ? (item.description.slice(0, 155) + (item.description.length > 155 ? '...' : '')) : `Learn ${item.title} with Babul Quran. Online Quran classes.`;

  return (
    <div className="min-h-screen bg-white py-14">
      <Seo title={item.title} description={metaDesc} image={imageUrl || undefined} />
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
          {item.price != null && (
            <p className="text-primary font-semibold text-lg mb-4 animate-fade-in-up animate-delay-200 opacity-0 flex items-center gap-2" style={{ animationFillMode: 'forwards' }}>
              <HiAcademicCap className="w-5 h-5" /> ${Number(item.price).toFixed(2)}/month
            </p>
          )}
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap animate-fade-in-up animate-delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>{item.description}</p>
          <div className="mt-8 flex gap-3 animate-fade-in-up animate-delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Button to="/contact?source=enrollment" variant="primary" className="inline-flex items-center gap-2">
              <HiAcademicCap className="w-4 h-4" /> Enroll Now
            </Button>
            <Button to="/#courses" variant="outlinePrimary" className="inline-flex items-center gap-2">
              <HiArrowLeft className="w-4 h-4" /> Back to Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
