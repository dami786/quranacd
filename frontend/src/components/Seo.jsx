import { Helmet } from 'react-helmet-async';

export const SITE_NAME = 'Babul Quran';
export const DEFAULT_OG_IMAGE = '/images/image.png';

const getOrigin = () => (typeof window !== 'undefined' ? window.location.origin : '');

/**
 * Per-page SEO: title, meta description, Open Graph, Twitter Card, canonical, optional JSON-LD schema
 */
export default function Seo({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  canonicalPath,
  schema,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description || `Learn Quran online with ${SITE_NAME}. Free trial, qualified teachers, flexible schedule. Enroll now.`;
  const origin = getOrigin();
  const ogImage = image.startsWith('http') ? image : `${origin}${image.startsWith('/') ? '' : '/'}${image}`;
  const canonicalUrl = canonicalPath != null ? `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}` : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  );
}
