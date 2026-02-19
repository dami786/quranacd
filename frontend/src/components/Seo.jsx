import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Babul Quran';
const DEFAULT_OG_IMAGE = '/images/image.png';

/**
 * Per-page SEO: title, meta description, Open Graph
 */
export default function Seo({ title, description, image = DEFAULT_OG_IMAGE, noIndex = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description || `Learn Quran online with ${SITE_NAME}. Free trial, qualified teachers, flexible schedule. Enroll now.`;
  const ogImage = image.startsWith('http') ? image : `${typeof window !== 'undefined' ? window.location.origin : ''}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
