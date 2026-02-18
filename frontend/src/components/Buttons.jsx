import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg transition-all duration-200 border-2 border-transparent hover:scale-[1.02] active:scale-[0.98]';

const variants = {
  primary:
    'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark',
  outline:
    'bg-transparent text-white border-white hover:bg-white hover:text-primary',
  outlinePrimary:
    'bg-transparent text-primary border-primary hover:bg-primary hover:text-white',
  free: 'bg-accent text-white border-accent hover:bg-amber-600 hover:border-amber-600',
  light:
    'bg-white text-primary border-white hover:bg-bg-alt hover:text-primary-dark',
  danger:
    'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600',
};

export function Button({ to, href, variant = 'primary', className = '', children, type = 'button', ...props }) {
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`.trim();
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
