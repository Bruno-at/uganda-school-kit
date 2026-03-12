import React from 'react';
import { useLocation } from 'react-router-dom';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Excellence Academy | Premier School in Kampala, Uganda', description: 'World-class education nurturing character, excellence, and innovation. Admissions open for O-Level and A-Level programs in Kampala.' },
  '/about': { title: 'About Us | Excellence Academy', description: 'Learn about our mission, vision, leadership team, and 25+ years of educational excellence in Kampala, Uganda.' },
  '/admissions': { title: 'Admissions | Excellence Academy', description: 'Apply now for O-Level and A-Level programs. View entry requirements, fee structure, and schedule a campus visit.' },
  '/academics': { title: 'Academics | Excellence Academy', description: 'Comprehensive O-Level and A-Level curriculum following Uganda National standards with enhanced programs.' },
  '/student-life': { title: 'Student Life | Excellence Academy', description: 'Discover clubs, sports, arts, and house system activities that make Excellence Academy a vibrant community.' },
  '/parents': { title: 'For Parents | Excellence Academy', description: 'Access parent portal, school fees, notices, downloads, and support resources for Excellence Academy parents.' },
  '/news': { title: 'News & Events | Excellence Academy', description: 'Stay updated with the latest school news, events, achievements, and announcements.' },
  '/contact': { title: 'Contact Us | Excellence Academy', description: 'Get in touch with Excellence Academy. Visit us in Kyanja, Kampala or call +256 700 123 456.' },
  '/gallery': { title: 'Photo & Video Gallery | Excellence Academy', description: 'Explore moments from school life, events, sports, and celebrations at Excellence Academy.' },
  '/alumni': { title: 'Alumni Network | Excellence Academy', description: 'Connect with fellow graduates, share achievements, and stay part of the Excellence Academy family.' },
  '/donate': { title: 'Support Us | Excellence Academy', description: 'Make a donation to support scholarships, facilities, and educational programs at Excellence Academy.' },
  '/shop': { title: 'School Shop | Excellence Academy', description: 'Shop for uniforms, books, and official Excellence Academy merchandise online.' },
  '/calendar': { title: 'School Calendar | Excellence Academy', description: 'View important dates, events, and academic schedules for the current term.' },
  '/fees': { title: 'Fee Structure | Excellence Academy', description: 'Transparent and competitive fee structure for O-Level and A-Level programs with flexible payment plans.' },
};

const SEOHead: React.FC = () => {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || { title: 'Excellence Academy | Kampala, Uganda', description: 'World-class education nurturing character, excellence, and innovation.' };

  React.useEffect(() => {
    document.title = meta.title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:')) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', meta.description);
    setMeta('og:title', meta.title);
    setMeta('og:description', meta.description);
    setMeta('og:type', 'website');
    setMeta('og:url', window.location.href);
    setMeta('og:site_name', 'Excellence Academy');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);

    // JSON-LD Organization (on all pages)
    const orgId = 'jsonld-organization';
    let orgScript = document.getElementById(orgId) as HTMLScriptElement;
    if (!orgScript) {
      orgScript = document.createElement('script');
      orgScript.id = orgId;
      orgScript.type = 'application/ld+json';
      document.head.appendChild(orgScript);
    }
    orgScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'School',
      name: 'Excellence Academy',
      url: window.location.origin,
      logo: `${window.location.origin}/favicon.png`,
      description: 'World-class education nurturing character, excellence, and innovation in Kampala, Uganda.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kyanja',
        addressLocality: 'Kampala',
        addressCountry: 'UG',
      },
      telephone: '+256 700 123 456',
      email: 'info@excellenceacademy.ug',
      sameAs: [
        'https://facebook.com/excellenceacademy',
        'https://twitter.com/excellenceacad',
        'https://instagram.com/excellenceacademy',
      ],
      foundingDate: '2000',
      numberOfStudents: { '@type': 'QuantitativeValue', value: 1200 },
    });

    // JSON-LD BreadcrumbList
    const bcId = 'jsonld-breadcrumb';
    let bcScript = document.getElementById(bcId) as HTMLScriptElement;
    if (!bcScript) {
      bcScript = document.createElement('script');
      bcScript.id = bcId;
      bcScript.type = 'application/ld+json';
      document.head.appendChild(bcScript);
    }
    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin + '/' },
      ...pathSegments.map((seg, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        item: window.location.origin + '/' + pathSegments.slice(0, i + 1).join('/'),
      })),
    ];
    bcScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    });

    // JSON-LD WebPage
    const wpId = 'jsonld-webpage';
    let wpScript = document.getElementById(wpId) as HTMLScriptElement;
    if (!wpScript) {
      wpScript = document.createElement('script');
      wpScript.id = wpId;
      wpScript.type = 'application/ld+json';
      document.head.appendChild(wpScript);
    }
    wpScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      description: meta.description,
      url: window.location.href,
      isPartOf: { '@type': 'WebSite', name: 'Excellence Academy', url: window.location.origin },
    });
  }, [pathname, meta]);

  const pathSegments = pathname.split('/').filter(Boolean);

  return null;
};

export default SEOHead;
