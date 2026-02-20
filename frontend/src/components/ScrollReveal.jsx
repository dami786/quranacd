import { useEffect, useRef, useState } from 'react';

/**
 * Scroll pe jab element viewport mein aaye tab animate karo (left / right / up se).
 * direction: 'left' | 'right' | 'up'
 */
export default function ScrollReveal({ direction = 'up', children, className = '', as: Tag = 'div' }) {
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

  const revealClass = direction === 'left' ? 'scroll-reveal-left' : direction === 'right' ? 'scroll-reveal-right' : 'scroll-reveal-up';
  return (
    <Tag ref={ref} className={`${revealClass} ${inView ? 'in-view' : ''} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
