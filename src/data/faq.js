import { site } from './site.js';
import { allItems } from './menu.js';

// Answers are taken from the menu and the site's own policies.
export const faq = [
  {
    q: 'How do I place an order?',
    a: 'Open the menu, tap Add on the dishes you want, then tap Send order on WhatsApp. Your order arrives in one message. You can also call us on ' + site.phonePrimaryLabel + '.',
  },
  {
    q: 'Do you deliver?',
    a: 'Yes. Orders are delivered by our local riders or a delivery partner, usually in 30 to 60 minutes. The delivery fee depends on distance and we confirm it when we confirm your order.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We are open from 10 AM to 10 PM, every day of the week.',
  },
  {
    q: 'Do you have vegetarian food?',
    a: `Yes, ${allItems.filter((i) => i.v).length} of our ${allItems.length} dishes are vegetarian, including dosa, idly, paneer rolls, veg chow and pav bhaji. Use the Veg only filter on the menu to see them all.`,
  },
  {
    q: 'Can I sit and eat at the dhaba?',
    a: 'Yes. We have indoor tables and outdoor seating at the shop on Nilgunj Road.',
  },
  {
    q: 'Can I cancel an order?',
    a: 'You can cancel within the first five to ten minutes after ordering, before we start cooking. Call or WhatsApp us as soon as possible.',
  },
  {
    q: 'Where exactly are you?',
    a: site.addressFull + '. Tap Get directions on this page to open Google Maps.',
  },
];
