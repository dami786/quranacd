import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_NAME } from './Seo';

/**
 * Global JSON-LD: Organization (EducationalOrganization) + WebSite
 * Renders on every page so search engines understand the site and brand.
 */
export default function GlobalSchema() {
  const { pathname } = useLocation();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://quranacd.vercel.app';
  const url = `${origin}${pathname || ''}`;
  const logo = `${origin}/images/image.png`;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: origin,
    logo,
    description: `Learn Quran online with ${SITE_NAME}. Free trial, qualified teachers, flexible schedule. Noorani Qaida, Tajweed, Hifz, Tafseer and more.`,
    email: 'babulquranacademy1@gmail.com',
    telephone: '+923124810000',
    sameAs: [
      'https://www.facebook.com',
      'https://www.instagram.com',
      'https://www.youtube.com',
      'https://twitter.com',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: origin,
    description: `Online Quran classes with ${SITE_NAME}. Free 3-day trial, one-to-one lessons, qualified teachers. Enroll for Noorani Qaida, Nazra, Tajweed, Hifz and Tafseer.`,
    publisher: { '@id': `${origin}/#organization` },
    inLanguage: 'en',
  };

  const schema = [
    { ...organization, '@id': `${origin}/#organization` },
    website,
  ];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
