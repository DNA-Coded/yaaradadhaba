import { useEffect } from 'react';
import useSEO from '../hooks/useSEO.js';
import Icon from '../components/Icon.jsx';
import { MapEmbed, OpenBadge, PageHero } from '../components/ui.jsx';
import { useCopy } from '../components/feedback.jsx';
import { site, whatsappLink, GREETING } from '../data/site.js';
import { galleryImg } from '../data/gallery.js';
import { faq } from '../data/faq.js';

// FAQ structured data so search engines can show the answers directly.
function useFaqSchema() {
  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'faq-schema';
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
}

export default function Contact() {
  useSEO({
    title: 'Contact & Location | Yaara Da Dhaba, Agarpara',
    description: `Call ${site.phonePrimaryLabel} or WhatsApp to order. Find Yaara Da Dhaba at 81, Nilgunj Road, Agarpara, Kolkata 700109. Open 10 AM to 10 PM daily. Delivery, cancellation and veg FAQs.`,
  });
  useFaqSchema();
  const copy = useCopy();

  return (
    <>
      <PageHero
        title="Contact and location"
        intro="Call, message or just walk in. We are on Nilgunj Road in Agarpara."
        image={galleryImg('storefront-counter', 1400)}
      />

      <section className="section">
        <div className="container">
          <ul className="contact-cards">
            <li className="contact-card">
              <h2><Icon name="phone" size={20} /> Call us</h2>
              <div className="contact-body">
                <a href={`tel:${site.phonePrimary}`} className="contact-big">{site.phonePrimaryLabel}</a>
                <a href={`tel:${site.phoneSecondary}`}>{site.phoneSecondaryLabel}</a>
                <button type="button" className="copy-btn" onClick={() => copy(site.phonePrimaryLabel, 'Phone number')}>
                  <Icon name="copy" size={16} /> Copy number
                </button>
              </div>
            </li>
            <li className="contact-card">
              <h2><Icon name="whatsapp" size={20} /> WhatsApp</h2>
              <div className="contact-body">
                <span>Send your order or a question. We reply during opening hours.</span>
                <a href={whatsappLink(GREETING)} target="_blank" rel="noopener noreferrer" className="contact-big">Start a chat</a>
              </div>
            </li>
            <li className="contact-card">
              <h2><Icon name="clock" size={20} /> Hours</h2>
              <div className="contact-body">
                <span className="contact-big">{site.hoursLabel}</span>
                <OpenBadge />
              </div>
            </li>
            <li className="contact-card">
              <h2><Icon name="pin" size={20} /> Address</h2>
              <div className="contact-body">
                <address>{site.addressLines.map((l) => <span key={l}>{l}</span>)}</address>
                <a href={site.directionsLink} target="_blank" rel="noopener noreferrer">Get directions</a>
                <button type="button" className="copy-btn" onClick={() => copy(site.addressFull, 'Address')}>
                  <Icon name="copy" size={16} /> Copy address
                </button>
              </div>
            </li>
          </ul>
          <MapEmbed className="map-frame-wide" />
        </div>
      </section>

      <section className="section section-steel" id="faq" aria-labelledby="faq-title">
        <div className="container faq-wrap">
          <div className="section-head">
            <h2 id="faq-title" className="section-title">Questions people ask</h2>
            <p className="section-lead">Quick answers about ordering, delivery and visiting.</p>
          </div>
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>
                  <span>{f.q}</span>
                  <Icon name="chevronDown" className="faq-chevron" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
