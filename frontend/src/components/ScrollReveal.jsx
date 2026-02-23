import { useEffect, useRef, useState } from 'react';

/**
 * Scroll pe jab element viewport mein aaye tab animate karo (MyWiseTutor-style).
 * direction: 'left' | 'right' | 'up' | 'top' | 'bottom' | 'fade' | 'zoom'
 */
const DIRECTION_CLASS = {
  left: 'scroll-left-in',
  right: 'scroll-right-in',
  up: 'scroll-bottom-in',
  top: 'scroll-top-in',
  bottom: 'scroll-bottom-in',
  fade: 'scroll-fade-in',
  zoom: 'scroll-zoom-in',
};

export default function ScrollReveal({ direction = 'up', children, className = '', as: Tag = 'div', wrapOnly = false }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass = wrapOnly ? '' : (DIRECTION_CLASS[direction] ?? DIRECTION_CLASS.up);
  return (
    <Tag ref={ref} className={`${revealClass} ${inView ? 'in-view' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
