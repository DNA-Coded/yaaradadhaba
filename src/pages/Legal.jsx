import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';
import { PageHero, ReadingProgress } from '../components/ui.jsx';
import { site } from '../data/site.js';

const UPDATED = '17 November 2026';

const contactLine = (
  <p>
    Questions? Call <a href={`tel:${site.phonePrimary}`}>{site.phonePrimaryLabel}</a> or visit us at {site.addressFull}.
  </p>
);

const pages = {
  privacy: {
    title: 'Privacy policy',
    seo: 'How Yaara Da Dhaba handles your information when you use our website, call us or order on WhatsApp.',
    body: (
      <>
        <p>
          This policy explains what information is involved when you use yaaradadhaba.vercel.app, call us, or send us an
          order. We keep it short because we collect very little.
        </p>
        <h2>What this website collects</h2>
        <p>
          The website has no accounts, sign-ups or payment forms, and it does not use analytics or tracking
          cookies. A few small settings are saved only in your own browser: the dishes in your order (so they are
          still there if you come back), your light or dark mode choice, and whether you chose to show the map. If you
          arrive through a campaign link (for example from our Instagram), the campaign name is kept for that visit
          and added to your WhatsApp order message so we know how you found us. Nothing is sent to us until you choose
          to send an order.
        </p>
        <h2>When you order on WhatsApp or by phone</h2>
        <p>
          Tapping “Send order on WhatsApp” opens WhatsApp with your order typed in. Anything you send, such as your
          name, phone number or delivery address, reaches us through WhatsApp and is handled under WhatsApp’s own
          privacy policy. We use these details only to prepare and deliver your order and to contact you about it. We
          do not sell or share them for marketing.
        </p>
        <h2>Third-party services</h2>
        <p>
          The Google Map on our pages loads only after you tap Show map. Once loaded, Google may receive your IP
          address and set cookies as described in Google’s privacy policy. Fonts are served by Google Fonts, which
          receives your IP address but does not set cookies. Our hosting provider keeps standard
          server logs (such as IP address and pages requested) for security and reliability.
        </p>
        <h2>Changes</h2>
        <p>If we change how we handle information, we will update this page and the date below.</p>
        {contactLine}
      </>
    ),
  },
  terms: {
    title: 'Terms and conditions',
    seo: 'Terms for using the Yaara Da Dhaba website and placing orders.',
    body: (
      <>
        <p>
          By using yaaradadhaba.vercel.app you agree to these terms. If you do not agree, please do not use the website.
        </p>
        <h2>Menu, prices and photos</h2>
        <p>
          We keep the menu and prices on this website up to date, but prices and availability can change. The price
          confirmed by us when you order is the price you pay. Dish photos are for illustration and the food you
          receive may look different.
        </p>
        <h2>Orders</h2>
        <p>
          An order sent through the website, WhatsApp or phone is a request. It is accepted once we confirm it. We may
          decline an order, for example when an item is sold out or the address is outside our delivery area.
        </p>
        <h2>Using the website</h2>
        <p>
          The website is for your personal use. You must not use it for anything unlawful, try to gain unauthorised
          access to it or the systems behind it, or copy, modify or reverse engineer any part of it except as the law
          allows. You must follow the laws of India when using it.
        </p>
        <h2>Content and trademarks</h2>
        <p>
          The name Yaara Da Dhaba, the logo, photos and text on this website belong to us or are used with permission.
          Please do not reuse them without our written consent.
        </p>
        <h2>Liability</h2>
        <p>
          We provide the website as it is. To the extent the law allows, we are not responsible for losses caused by
          the website being unavailable or by information on it being out of date.
        </p>
        {contactLine}
      </>
    ),
  },
  refund: {
    title: 'Refund and cancellation',
    seo: 'When you can cancel an order with Yaara Da Dhaba and when you are entitled to a refund.',
    body: (
      <>
        <h2>Cancelling an order</h2>
        <p>
          You can cancel an order within the first five to ten minutes after placing it, before we start cooking. Call
          or WhatsApp us as soon as possible to cancel.
        </p>
        <h2>Refunds</h2>
        <p>
          You may be entitled to a refund for an order. If the packaging of an item, or of the whole order, has been
          tampered with or damaged and you refuse it at the time of delivery, you are entitled to a refund of the
          proportionate value.
        </p>
        <p>If something is wrong with your food, tell us straight away so we can make it right.</p>
        {contactLine}
      </>
    ),
  },
  shipping: {
    title: 'Delivery policy',
    seo: 'How delivery works for Yaara Da Dhaba orders in and around Agarpara, Kolkata.',
    body: (
      <>
        <h2>How delivery works</h2>
        <p>
          Orders are delivered by our local riders or a third-party delivery partner. Delivery usually takes 30 to 60
          minutes, depending on distance and how busy the kitchen is. Please make sure someone is available at the
          delivery address to receive the order.
        </p>
        <h2>Delivery fees</h2>
        <p>
          Delivery fees can vary with the distance between the dhaba and your address. We will tell you the fee when
          we confirm your order.
        </p>
        <h2>Delays</h2>
        <p>If your order is running late, we or our delivery partner will let you know.</p>
        <p>
          Prefer to collect? Choose Pickup in your <Link to="/menu">order</Link> and come by the counter.
        </p>
        {contactLine}
      </>
    ),
  },
};

export default function Legal({ page }) {
  const p = pages[page];
  useSEO({ title: `${p.title.charAt(0).toUpperCase() + p.title.slice(1)} | Yaara Da Dhaba`, description: p.seo });

  return (
    <>
      <ReadingProgress />
      <PageHero title={p.title.charAt(0).toUpperCase() + p.title.slice(1)} intro={`Last updated ${UPDATED}`} />
      <section className="section">
        <div className="container">
          <article className="prose legal">{p.body}</article>
        </div>
      </section>
    </>
  );
}
