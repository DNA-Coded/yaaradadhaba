import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import Icon from '../components/Icon.jsx';
import { OpenBadge, PageHero, ReadingProgress, Reveal, formatPrice } from '../components/ui.jsx';
import { menu, startingPrice } from '../data/menu.js';
import { galleryImg } from '../data/gallery.js';
import { site, whatsappLink, GREETING } from '../data/site.js';

export default function About() {
  useSEO({
    title: 'About Us | Yaara Da Dhaba, Agarpara, Kolkata',
    description:
      'Yaara Da Dhaba is a neighbourhood dhaba on Nilgunj Road, Agarpara, serving rolls, Kolkata-style Chinese, biryani, momo and South Indian food at everyday prices.',
  });

  return (
    <>
      <ReadingProgress />
      <PageHero
        title="About the dhaba"
        intro="A small, busy kitchen on Nilgunj Road that feeds students, office-goers and families in Agarpara."
        image={galleryImg('signboard', 1400)}
      />

      <section className="section">
        <div className="container about-grid">
          <Reveal className="prose">
            <h2 className="section-title">Food for every day, not just special days</h2>
            <p>
              Yaara Da Dhaba sits at 81, Nilgunj Road in Agarpara. You will find us by the signboard and the smell of
              chow on the tawa. We cook a little of everything people in Kolkata love to eat: kathi-style rolls,
              Indo-Chinese chow and fried rice, biryani from the handi, momo, pav bhaji, and dosa made to order.
            </p>
            <p>
              The idea is simple. Food should be fresh, filling and fairly priced, so you can eat here on a Tuesday
              without thinking twice. An egg roll is {formatPrice(startingPrice('Rolls'))}, a veg meal is ₹50, and our
              most expensive dish is still under ₹200.
            </p>
            <p>
              Sit down and eat with us, pick up on your way home, or send your order on WhatsApp and we will have it
              ready.
            </p>
          </Reveal>
          <Reveal className="about-photos" delay={1}>
            <img src={galleryImg('dosa-on-tawa')} alt="A dosa being spread on the tawa" width="640" height="1137" loading="lazy" />
            <img src={galleryImg('indoor-tables')} alt="Indoor tables by the green wall" width="640" height="853" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="section section-steel">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">What we cook</h2>
            <p className="section-lead">Nine sections on the menu, each with a starting price you can plan around.</p>
          </Reveal>
          <ul className="cook-list">
            {menu.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i % 3}>
                <Link to={`/menu#${c.id}`}>
                  <strong>{c.category}</strong>
                  <span>{c.blurb}</span>
                  <em>from {formatPrice(startingPrice(c.category))}</em>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container about-visit">
          <Reveal>
            <h2 className="section-title">Drop by</h2>
            <OpenBadge />
            <p className="section-lead">{site.addressFull}</p>
            <div className="btn-row">
              <a href={site.directionsLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <Icon name="directions" /> Get directions
              </a>
              <a href={whatsappLink(GREETING)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
