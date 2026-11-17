import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import { favourites } from '../data/menu.js';

export default function NotFound() {
  useSEO({
    title: 'Page not found | Yaara Da Dhaba',
    description: 'This page does not exist. Head to the menu or the home page.',
    noindex: true,
  });

  return (
    <section className="section not-found">
      <div className="container">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1 className="section-title">This plate is empty</h1>
        <p className="section-lead">The page you were looking for has moved or never existed. The food is still here, though.</p>
        <div className="btn-row">
          <Link to="/menu" className="btn btn-primary">See the menu</Link>
          <Link to="/" className="btn btn-outline">Go to home page</Link>
        </div>
        <p className="not-found-hint">
          Popular right now: {favourites.slice(0, 3).map((f) => f.name).join(', ')}.
        </p>
      </div>
    </section>
  );
}
