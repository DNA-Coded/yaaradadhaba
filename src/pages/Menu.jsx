import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import Icon from '../components/Icon.jsx';
import { OpenBadge, VegMark, formatPrice } from '../components/ui.jsx';
import { AddButton } from '../cart/Cart.jsx';
import { menu, allItems, dishImg, MENU_UPDATED } from '../data/menu.js';
import { site, whatsappLink, GREETING } from '../data/site.js';

const DIETS = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg only' },
  { id: 'nonveg', label: 'Non-veg' },
];

function groupBySub(items) {
  const groups = [];
  for (const item of items) {
    const key = item.sub || '';
    let g = groups.find((x) => x.key === key);
    if (!g) groups.push((g = { key, items: [] }));
    g.items.push(item);
  }
  return groups;
}

export default function Menu() {
  useSEO({
    title: 'Menu & Prices | Yaara Da Dhaba, Agarpara',
    description: `Full menu with prices: rolls from ₹45, chowmein, fried rice, biryani, momo, pav bhaji and dosa. ${allItems.length} dishes, order on WhatsApp or call ${site.phonePrimaryLabel}.`,
  });

  const [params] = useSearchParams();
  const [query, setQuery] = useState(() => params.get('q') || '');

  // Arriving from site search with ?q=...
  useEffect(() => {
    const q = params.get('q');
    if (q !== null) setQuery(q);
  }, [params]);
  const [diet, setDiet] = useState('all');
  const [active, setActive] = useState(menu[0].id);
  const chipBar = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const matchesQ = !q || item.name.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q);
          const matchesDiet = diet === 'all' || (diet === 'veg' ? item.v : !item.v);
          return matchesQ && matchesDiet;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, diet]);

  const resultCount = filtered.reduce((n, c) => n + c.items.length, 0);
  const isFiltering = query.trim() !== '' || diet !== 'all';

  // Highlight the category currently in view.
  useEffect(() => {
    const sections = filtered.map((c) => document.getElementById(c.id)).filter(Boolean);
    if (!sections.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [filtered]);

  // Keep the active chip visible in the horizontal chip bar.
  useEffect(() => {
    const chip = chipBar.current?.querySelector(`[data-id="${active}"]`);
    const bar = chipBar.current;
    if (chip && bar) {
      const left = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
      bar.scrollTo({ left, behavior: 'smooth' });
    }
  }, [active]);

  const jumpTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Land the section just under the fixed header and sticky toolbar.
    const toolbarH = document.querySelector('.menu-toolbar')?.offsetHeight || 0;
    const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
    const target = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, target - headerH - toolbarH - 8), behavior: reduce ? 'auto' : 'smooth' });
    setActive(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <section className="page-hero page-hero-menu">
        <div className="container page-hero-inner">
          <h1 className="page-hero-title">Menu and prices</h1>
          <p className="page-hero-intro">
            {allItems.length} dishes across {menu.length} sections. Tap Add to build your order, then send it to us on
            WhatsApp in one message.
          </p>
          <div className="menu-hero-meta">
            <OpenBadge className="on-dark" />
            <span className="menu-updated">Prices last updated {MENU_UPDATED}</span>
          </div>
        </div>
      </section>

      <div className="print-only print-head">
        <strong>Yaara Da Dhaba</strong>
        <span>{site.addressFull}</span>
        <span>Order: {site.phonePrimaryLabel} | {site.hoursLabel} | Prices as of {MENU_UPDATED}</span>
      </div>

      <div className="menu-toolbar">
        <div className="container">
          <div className="menu-toolbar-row">
            <label className="search">
              <Icon name="search" />
              <span className="sr-only">Search the menu</span>
              <input
                type="search"
                placeholder={`Search ${allItems.length} dishes`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                enterKeyHint="search"
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              />
              {query && (
                <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                  <Icon name="close" size={16} />
                </button>
              )}
            </label>
            <div className="diet-toggle" role="group" aria-label="Filter by diet">
              {DIETS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={diet === d.id}
                  className={`diet-btn diet-${d.id} ${diet === d.id ? 'is-active' : ''}`}
                  onClick={() => setDiet(d.id)}
                >
                  {d.id !== 'all' && <VegMark veg={d.id === 'veg'} />}
                  <span className={d.id === 'all' ? '' : 'diet-label'}>{d.label}</span>
                </button>
              ))}
            </div>
          </div>
          <nav className="chips" ref={chipBar} aria-label="Menu sections">
            {filtered.map((cat) => (
              <button
                key={cat.id}
                type="button"
                data-id={cat.id}
                className={`chip ${active === cat.id ? 'is-active' : ''}`}
                onClick={() => jumpTo(cat.id)}
                aria-current={active === cat.id ? 'true' : undefined}
              >
                {cat.category}
                <span className="chip-count">{cat.items.length}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container menu-body">
        {isFiltering && (
          <p className="menu-results" aria-live="polite">
            {resultCount === 0 ? 'No dishes match.' : `${resultCount} ${resultCount === 1 ? 'dish' : 'dishes'} found.`}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h2>Nothing matches “{query}”</h2>
            <p>Try a shorter word like “chow” or “roll”, or show the whole menu again.</p>
            <button type="button" className="btn btn-primary" onClick={() => { setQuery(''); setDiet('all'); }}>
              Show full menu
            </button>
          </div>
        ) : (
          filtered.map((cat) => (
            <section key={cat.id} id={cat.id} className="menu-section" aria-labelledby={`${cat.id}-title`}>
              <header className="menu-section-head">
                <span className="menu-section-img">
                  <img src={dishImg(cat.image, 480)} alt="" width="480" height="480" loading="lazy" />
                </span>
                <div>
                  <h2 id={`${cat.id}-title`} className="menu-section-title">{cat.category}</h2>
                  <p className="menu-section-blurb">{cat.blurb}</p>
                </div>
              </header>

              <div className="menu-section-list">
                {groupBySub(cat.items).map((group) => (
                  <div key={group.key || 'all'} className="menu-group">
                    {group.key && <h3 className="menu-group-title">{group.key}</h3>}
                    <ul className="menu-rows">
                      {group.items.map((item) => (
                        <li key={item.id} className="menu-row">
                          <VegMark veg={item.v} />
                          <div className="menu-row-name">
                            <span className="menu-row-title">{item.name}</span>
                            {item.note && <span className="menu-row-note">{item.note}</span>}
                            {item.pop && <span className="tag-best">Best seller</span>}
                          </div>
                          <span className="menu-row-leader" aria-hidden="true" />
                          <span className="price">{formatPrice(item.price)}</span>
                          <AddButton item={item} compact />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <section className="cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <h2>Rather just tell us?</h2>
            <p>Call or message and we will take your order the old-fashioned way.</p>
          </div>
          <div className="btn-row">
            <a href={`tel:${site.phonePrimary}`} className="btn btn-primary"><Icon name="phone" /> {site.phonePrimaryLabel}</a>
            <a href={whatsappLink(GREETING)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /> WhatsApp
            </a>
          </div>
          <button type="button" className="link-btn print-btn" onClick={() => window.print()}>
            <Icon name="print" size={18} /> Print the menu or save it as a PDF
          </button>
        </div>
      </section>
    </>
  );
}
