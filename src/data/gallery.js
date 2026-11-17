// Real photos of the dhaba. Captions describe what is actually in each photo.
// w/h are the original aspect ratio, used to reserve space and avoid layout shift.
export const galleryImg = (file, size = 640) => `/img/gallery/${file}-${size}.webp`;

export const gallery = [
  { file: 'signboard', title: 'Our signboard on Nilgunj Road', category: 'The dhaba', w: 1360, h: 950 },
  { file: 'noodles-on-tawa', title: 'Chow tossed on the big tawa', category: 'Kitchen', w: 574, h: 1020 },
  { file: 'egg-chow', title: 'Egg chow with onion and cucumber', category: 'Food', w: 765, h: 1020 },
  { file: 'chicken-pakora', title: 'Chicken pakora, fresh out of the kadhai', category: 'Food', w: 1360, h: 765 },
  { file: 'dosa-on-tawa', title: 'Dosa being spread on the tawa', category: 'Kitchen', w: 574, h: 1020 },
  { file: 'outdoor-seating', title: 'Outdoor seating under the tarp', category: 'The dhaba', w: 1360, h: 765 },
  { file: 'pakora-and-gravy', title: 'Pakora trays and chilli chicken gravy', category: 'Food', w: 574, h: 1020 },
  { file: 'evening-counter', title: 'The evening counter, ready to serve', category: 'Kitchen', w: 1360, h: 1020 },
  { file: 'indoor-tables', title: 'Indoor tables by the green wall', category: 'The dhaba', w: 765, h: 1020 },
  { file: 'fried-cutlets', title: 'Crumb-fried cutlets', category: 'Food', w: 574, h: 1020 },
  { file: 'fresh-fritters', title: 'A fresh batch of fritters', category: 'Kitchen', w: 1360, h: 765 },
  { file: 'regulars-outside', title: 'Regulars stopping by after school', category: 'The dhaba', w: 1360, h: 765 },
  { file: 'counter-eggs-chow', title: 'Eggs, sauces and chow at the counter', category: 'Kitchen', w: 765, h: 1020 },
  { file: 'display-counter', title: 'The glass display counter', category: 'Kitchen', w: 1360, h: 1020 },
  { file: 'green-wall-seating', title: 'Counter seating along the green wall', category: 'The dhaba', w: 765, h: 1020 },
  { file: 'storefront-counter', title: 'The front counter', category: 'The dhaba', w: 1360, h: 765 },
  { file: 'boiled-noodles', title: 'Fresh-boiled noodles cooling', category: 'Kitchen', w: 574, h: 1020 },
];

export const galleryFilters = ['All', 'Food', 'Kitchen', 'The dhaba'];
