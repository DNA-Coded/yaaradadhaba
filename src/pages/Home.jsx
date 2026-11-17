import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import Icon from '../components/Icon.jsx';
import { MapEmbed, OpenBadge, Reveal, Stars, VegMark, formatPrice } from '../components/ui.jsx';
import { AddButton } from '../cart/Cart.jsx';
import { menu, favourites, tickerItems, dishImg, startingPrice } from '../data/menu.js';
import { reviews } from '../data/reviews.js';
import { galleryImg } from '../data/gallery.js';
import { site, whatsappLink, GREETING } from '../data/site.js';

function Steam() {
  return (
    <svg className="steam" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M40 110 C 25 85, 55 70, 40 45 S 50 15, 42 0" />
      <path d="M62 110 C 47 85, 77 70, 62 45 S 72 15, 64 0" />
      <path d="M84 110 C 69 85, 99 70, 84 45 S 94 15, 86 0" />
    </svg>
  );
}

function PriceTicker() {
  const row = tickerItems.map((i) => (
    <li key={i.id}>
      <span>{i.name}</span>
      <strong>{formatPrice(i.price)}</strong>
    </li>
  ));
  return (
    <div className="ticker-wrap">
      <section className="ticker" aria-label="Prices">
        <div className="ticker-track">
          <ul>{row}</ul>
          <ul aria-hidden="true">{row}</ul>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Yaara Da Dhaba | Rolls, Chowmein, Biryani & Dosa in Agarpara, Kolkata',
    description:
      'Neighbourhood dhaba on Nilgunj Road, Agarpara. Egg roll from ₹45, chicken biryani ₹110, chowmein, momo and masala dosa. Open 10 AM to 10 PM daily. Order on WhatsApp.',
  });

  const featuredReviews = reviews.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="hero-line"><span>Hot rolls, chow</span></span>
              <span className="hero-line"><span>and biryani on</span></span>
              <span className="hero-line"><span>Nilgunj Road.</span></span>
            </h1>
            <p className="hero-lead hero-anim">
              A neighbourhood dhaba in Agarpara, Kolkata. Egg roll from ₹45, chicken biryani for ₹110, cooked fresh
              from 10 AM to 10 PM, every day.
            </p>
            <div className="hero-actions hero-anim">
              <Link to="/menu" className="btn btn-primary btn-lg">See the menu</Link>
              <a href={`tel:${site.phonePrimary}`} className="btn btn-ghost-light btn-lg">
                <Icon name="phone" /> Call to order
              </a>
            </div>
            <div className="hero-meta hero-anim">
              <OpenBadge className="on-dark" />
              <Link to="/reviews" className="hero-rating">
                <Stars rating={site.rating} />
                <span><strong>{site.rating}</strong> on Google</span>
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-plate hero-plate-main">
              <Steam />
              <span className="plate-clip">
                <img src={dishImg('chicken-biryani', 900)} alt="" width="900" height="900" fetchpriority="high" />
              </span>
            </div>
            <div className="hero-plate hero-plate-side">
              <span className="plate-clip">
                <img src={dishImg('chicken-roll', 480)} alt="" width="480" height="480" />
              </span>
            </div>
            <span className="price-tag hero-tag-main">Chicken Biryani <strong>₹110</strong></span>
            <span className="price-tag hero-tag-side">Chicken Roll <strong>₹70</strong></span>
          </div>
        </div>
      </section>

      <PriceTicker />

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <h2 className="section-title">What are you craving?</h2>
            <p className="section-lead">Nine kinds of food from one small kitchen. Tap a plate to jump straight to it on the menu.</p>
          </Reveal>
          <ul className="plates">
            {menu.map((cat, i) => (
              <Reveal as="li" key={cat.id} delay={i} variant="plate">
                <Link to={`/menu#${cat.id}`} className="plate-link">
                  <span className="plate-img">
                    <img src={dishImg(cat.image, 480)} alt="" width="480" height="480" loading="lazy" />
                  </span>
                  <span className="plate-name">{cat.category}</span>
                  <span className="plate-from">from {formatPrice(startingPrice(cat.category))}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAVOURITES */}
      <section className="section section-steel">
        <div className="container">
          <Reveal className="section-head section-head-split">
            <div>
              <h2 className="section-title">Most ordered</h2>
              <p className="section-lead">The dishes regulars come back for. Add them to your order and send it on WhatsApp.</p>
            </div>
            <Link to="/menu" className="text-link">See all {menu.reduce((n, c) => n + c.items.length, 0)} dishes</Link>
          </Reveal>
          <div className="dish-grid">
            {favourites.map((item, i) => (
              <Reveal as="article" key={item.id} delay={i % 3} className="dish-card">
                <div className="dish-card-img">
                  <img src={dishImg(item.image, 480)} alt={item.name} width="480" height="480" loading="lazy" />
                </div>
                <div className="dish-card-body">
                  <div className="dish-card-title">
                    <VegMark veg={item.v} />
                    <h3>{item.name}</h3>
                  </div>
                  <p className="dish-card-meta">{item.category}{item.note ? `, ${item.note}` : ''}</p>
                  <div className="dish-card-foot">
                    <span className="price">{formatPrice(item.price)}</span>
                    <AddButton item={item} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REAL DHABA */}
      <section className="section">
        <div className="container real-grid">
          <Reveal className="real-copy">
            <h2 className="section-title">This is where it's made</h2>
            <p className="section-lead">
              A small kitchen on Nilgunj Road, one big tawa, and a counter that stays busy from late morning till
              night. Every photo here was taken at the dhaba.
            </p>
            <Link to="/gallery" className="btn btn-outline">Open the gallery</Link>
          </Reveal>
          <div className="real-photos">
            <Reveal className="real-photo real-photo-a" delay={0}>
              <img src={galleryImg('signboard')} alt="The Yaara Da Dhaba signboard above the counter" loading="lazy" width="640" height="447" />
            </Reveal>
            <Reveal className="real-photo real-photo-b" delay={1}>
              <img src={galleryImg('noodles-on-tawa')} alt="Chowmein being tossed on the big tawa" loading="lazy" width="640" height="1137" />
            </Reveal>
            <Reveal className="real-photo real-photo-c" delay={2}>
              <img src={galleryImg('chicken-pakora')} alt="Freshly fried chicken pakora" loading="lazy" width="640" height="360" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section section-ink">
        <div className="container">
          <Reveal className="section-head section-head-split">
            <div>
              <h2 className="section-title">What people say</h2>
              <p className="section-lead">
                Rated <strong>{site.rating} out of 5</strong> by our customers on Google.
              </p>
            </div>
            <Link to="/reviews" className="text-link on-dark">Read more reviews</Link>
          </Reveal>
          <div className="quote-grid">
            {featuredReviews.map((r, i) => (
              <Reveal as="figure" key={r.name} delay={i} className="quote">
                <Stars rating={r.rating} size={15} />
                <blockquote>{r.text}</blockquote>
                <figcaption>{r.name}</figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section className="section">
        <div className="container visit">
          <Reveal className="visit-info">
            <h2 className="section-title">Come hungry</h2>
            <OpenBadge />
            <dl className="visit-list">
              <div>
                <dt><Icon name="pin" /> Address</dt>
                <dd>{site.addressFull}</dd>
              </div>
              <div>
                <dt><Icon name="clock" /> Hours</dt>
                <dd>{site.hoursLabel}</dd>
              </div>
              <div>
                <dt><Icon name="phone" /> Phone</dt>
                <dd>
                  <a href={`tel:${site.phonePrimary}`}>{site.phonePrimaryLabel}</a>
                  <br />
                  <a href={`tel:${site.phoneSecondary}`}>{site.phoneSecondaryLabel}</a>
                </dd>
              </div>
            </dl>
            <div className="btn-row">
              <a href={whatsappLink(GREETING)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> WhatsApp us
              </a>
              <a href={site.directionsLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <Icon name="directions" /> Get directions
              </a>
            </div>
          </Reveal>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
