import { Link } from 'react-router-dom';

const base =
  'group relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg transition-all duration-200 border-2 border-transparent hover:scale-[1.02] active:scale-[0.98] before:content-[""] before:absolute before:inset-0 before:z-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100';

const variants = {
  primary:
    'bg-primary text-white border-primary hover:border-primary-dark before:bg-primary-dark',
  outline:
    'bg-transparent text-white border-white before:bg-white group-hover:text-primary',
  outlinePrimary:
    'bg-transparent text-primary border-primary before:bg-primary group-hover:text-white',
  free: 'bg-accent text-white border-accent hover:border-amber-600 before:bg-amber-600',
  light:
    'bg-white text-primary border-white before:bg-bg-alt group-hover:text-primary-dark',
  danger:
    'bg-red-500 text-white border-red-500 hover:border-red-600 before:bg-red-600',
};

export function Button({ to, href, variant = 'primary', className = '', children, type = 'button', ...props }) {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`.trim();
  const content = <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>;
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
