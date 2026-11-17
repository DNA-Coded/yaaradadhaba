import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import { CountUp, PageHero, Reveal, Stars } from '../components/ui.jsx';
import { reviews } from '../data/reviews.js';
import { site } from '../data/site.js';
import { galleryImg } from '../data/gallery.js';
import { menu, allItems } from '../data/menu.js';

const menuAnchor = (dish) => {
  const cat = menu.find((c) => c.category === dish) || menu.find((c) => c.category === allItems.find((i) => i.name === dish)?.category);
  return cat ? `/menu#${cat.id}` : '/menu';
};

const initials = (name) => name.split(' ').map((p) => p[0]).join('').slice(0, 2);

export default function Reviews() {
  useSEO({
    title: 'Customer Reviews | Yaara Da Dhaba, Agarpara',
    description: `What customers say about Yaara Da Dhaba in Agarpara, Kolkata. Rated ${site.rating} out of 5 on Google for fresh food, quick service and fair prices.`,
  });

  const mentioned = [...new Set(reviews.map((r) => r.dish))];

  return (
    <>
      <PageHero
        title="Reviews"
        intro="What regulars and first-timers say after eating with us."
        image={galleryImg('regulars-outside', 1400)}
      />

      <section className="section">
        <div className="container reviews-top">
          <Reveal className="score-card">
            <p className="score-num"><CountUp value={site.rating} decimals={1} /></p>
            <Stars rating={site.rating} size={22} />
            <p className="score-label">Average rating on Google</p>
            <a href={site.mapsLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              See all reviews on Google
            </a>
          </Reveal>
          <Reveal className="score-side" delay={1}>
            <h2 className="section-title">Dishes people mention</h2>
            <ul className="mention-list">
              {mentioned.map((d) => (
                <li key={d}><Link to={menuAnchor(d)}>{d}</Link></li>
              ))}
            </ul>
            <p className="section-lead">
              Eaten with us recently? A short review on Google helps other people in Agarpara find a good meal.
            </p>
            <a href={site.mapsLink} className="text-link" target="_blank" rel="noopener noreferrer">Write a review on Google</a>
          </Reveal>
        </div>
      </section>

      <section className="section section-steel">
        <div className="container review-grid">
          {reviews.map((r, i) => (
            <Reveal as="figure" key={r.name} className="review-card" delay={i % 3}>
              <Stars rating={r.rating} size={16} />
              <blockquote>{r.text}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">{initials(r.name)}</span>
                <span>
                  <strong>{r.name}</strong>
                  <span className="review-dish">Ordered {r.dish}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
