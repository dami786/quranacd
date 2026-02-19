import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaMicrophone, FaQuran, FaBook, FaBrain, FaMosque } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { getCourseImageUrl } from '../services/api';

const iconMap = {
  default: FaBookOpen,
  noorani: FaBookOpen,
  recite: FaMicrophone,
  tajweed: FaQuran,
  tafseer: FaBook,
  memorization: FaBrain,
  islamic: FaMosque,
};

export default function CardItem({ item, showReadMore = true, index = 0 }) {
  const { _id, title, description, price } = item;
  const IconComponent = iconMap[title?.toLowerCase()?.split(' ')[0]] || iconMap.default;
  const imageUrl = getCourseImageUrl(item);
  const [imageFailed, setImageFailed] = useState(false);
  const showImg = imageUrl && !imageFailed;

  return (
    <div
      className="bg-bg-alt rounded-xl border border-gray-200 overflow-hidden hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${80 * index}ms`, animationFillMode: 'forwards' }}
    >
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-10 text-center">
        {showImg ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-cover mx-auto rounded-lg ring-2 ring-white/60 shadow-lg border-2 border-white/40"
            onError={(e) => {
              const img = e.target;
              if (img.src.endsWith('.png')) img.src = img.src.replace(/\.png$/, '.jpg');
              else setImageFailed(true);
            }}
          />
        ) : null}
        {!showImg && <IconComponent className="w-16 h-16 mx-auto text-white/90" aria-hidden />}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        )}
        {price != null && (
          <p className="text-primary font-semibold mb-3">${Number(price).toFixed(2)}/month</p>
        )}
        {showReadMore && (
          <Link
            to={`/details/${_id}`}
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-primary-dark transition-colors group"
          >
            Read More
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
