import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { site } from '../data/site.js';

// Indian food-safety style veg / non-veg mark.
export function VegMark({ veg }) {
  return (
    <span className={`veg-mark ${veg ? 'is-veg' : 'is-nonveg'}`} role="img" aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}>
      <span />
    </span>
  );
}

export function Stars({ rating, size = 16 }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, rating - (n - 1)));
        return (
          <span key={n} className="star" style={{ width: size, height: size }}>
            <Icon name="star" size={size} className="star-bg" />
            <span className="star-fill" style={{ width: `${fill * 100}%` }}>
              <Icon name="star" size={size} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wrapper for content blocks. Generic fade-in-on-scroll was removed (it reads
// as template motion); only the "plate" variant animates, rolling the
// category plates in when they first scroll into view.
export function Reveal({ variant, ...props }) {
  if (variant) return <RevealAnimated variant={variant} {...props} />;
  const { as: Tag = 'div', delay, children, ...rest } = props;
  return <Tag {...rest}>{children}</Tag>;
}

function RevealAnimated({ as: Tag = 'div', variant, delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    let responded = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        responded = true;
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.05 }
    );
    io.observe(el);
    // Safety net: an observer always reports once after observe(). If it never
    // does, show the content rather than leave it invisible.
    const fallback = setTimeout(() => !responded && setShown(true), 1500);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal-${variant} ${shown ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay * 60}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Counts a number up from 0 when it first appears.
export function CountUp({ value, decimals = 0, duration = 1100 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setDisplay(value);
      return undefined;
    }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
}

// Live open / closed state in Kolkata time.
export function useOpenStatus() {
  const compute = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === 'hour').value);
    const m = Number(parts.find((p) => p.type === 'minute').value);
    const mins = h * 60 + m;
    const open = mins >= site.openHour * 60 && mins < site.closeHour * 60;
    const closingSoon = open && site.closeHour * 60 - mins <= 45;
    return { open, closingSoon };
  };
  const [status, setStatus] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setStatus(compute()), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

export function OpenBadge({ className = '' }) {
  const { open, closingSoon } = useOpenStatus();
  const label = open ? (closingSoon ? 'Closing soon, until 10 PM' : 'Open now, until 10 PM') : 'Closed now, opens 10 AM';
  return (
    <span className={`open-badge ${open ? 'is-open' : 'is-closed'} ${className}`}>
      <span className="open-dot" aria-hidden="true" />
      {label}
    </span>
  );
}

export function PageHero({ title, intro, children, image }) {
  return (
    <section className="page-hero">
      {image && <img className="page-hero-bg" src={image} alt="" aria-hidden="true" />}
      <div className="container page-hero-inner">
        <h1 className="page-hero-title">{title}</h1>
        {intro && <p className="page-hero-intro">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export const formatPrice = (n) => `₹${n.toLocaleString('en-IN')}`;

// Google Maps loads only after the visitor asks for it: no third-party
// cookies or data use until then. The choice is remembered.
export function MapEmbed({ className = '' }) {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem('ydd-map') === '1';
    } catch {
      return false;
    }
  });

  if (on) {
    return (
      <div className={`map-frame ${className}`}>
        <iframe
          src={site.mapsEmbed}
          title="Map showing Yaara Da Dhaba on Nilgunj Road, Agarpara"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className={`map-frame map-placeholder ${className}`}>
      <div className="map-placeholder-inner">
        <span className="map-pin"><Icon name="pin" size={30} /></span>
        <p className="map-placeholder-title">81, Nilgunj Road, Agarpara</p>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              try {
                localStorage.setItem('ydd-map', '1');
              } catch {
                /* ignore */
              }
              setOn(true);
            }}
          >
            Show map
          </button>
          <a href={site.directionsLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
            <Icon name="directions" /> Directions
          </a>
        </div>
        <p className="map-note">The map is provided by Google and may set cookies once it loads.</p>
      </div>
    </div>
  );
}

// Thin bar at the top showing how far through a long page you are.
export function ReadingProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="reading-progress" aria-hidden="true">
      <div ref={ref} />
    </div>
  );
}

// Shown while a page's code is loading.
export function PageLoader() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="loader-plate" aria-hidden="true">
        <span />
      </span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
