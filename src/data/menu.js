// Official Yaara Da Dhaba menu. Prices in INR.
// v = vegetarian, pop = best seller, note = portion size, sub = sub-heading inside a category.

const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Shown on the menu page. Update whenever prices change.
export const MENU_UPDATED = '17 November 2026';

export const dishImg = (name, size = 480) => `/img/dishes/${name}-${size}.webp`;

const raw = [
  {
    category: 'Rolls',
    image: 'chicken-roll',
    blurb: 'Flaky paratha rolled around egg, chicken or paneer, wrapped to eat on the go.',
    items: [
      { name: 'Egg Roll', price: 45, v: false },
      { name: 'Egg Cheese Roll', price: 75, v: false },
      { name: 'Chicken Roll', price: 70, v: false, pop: true },
      { name: 'Chicken Cheese Roll', price: 95, v: false },
      { name: 'Egg Chicken Roll', price: 80, v: false },
      { name: 'Paneer Roll', price: 70, v: true },
      { name: 'Paneer Cheese Roll', price: 95, v: true },
    ],
  },
  {
    category: 'Chinese',
    image: 'chicken-chowmein',
    blurb: 'Kolkata-style chow and fried rice, tossed hot on the big tawa.',
    items: [
      { name: 'Veg Chow', price: 60, v: true, sub: 'Chowmein' },
      { name: 'Egg Chow', price: 70, v: false, sub: 'Chowmein' },
      { name: 'Chicken Chow', price: 90, v: false, pop: true, sub: 'Chowmein' },
      { name: 'Mix Chow', price: 100, v: false, sub: 'Chowmein' },
      { name: 'Schezwan Veg Chow', price: 70, v: true, sub: 'Chowmein' },
      { name: 'Schezwan Egg Chow', price: 80, v: false, sub: 'Chowmein' },
      { name: 'Schezwan Chicken Chow', price: 100, v: false, sub: 'Chowmein' },
      { name: 'Schezwan Egg Chicken Chow', price: 110, v: false, sub: 'Chowmein' },
      { name: 'Chilli Garlic Veg Chow', price: 80, v: true, sub: 'Chowmein' },
      { name: 'Chilli Garlic Egg Chow', price: 90, v: false, sub: 'Chowmein' },
      { name: 'Chilli Garlic Chicken Chow', price: 110, v: false, sub: 'Chowmein' },
      { name: 'Chilli Garlic Egg Chicken Chow', price: 120, v: false, sub: 'Chowmein' },
      { name: 'Veg Fried Rice', price: 80, v: true, sub: 'Fried Rice' },
      { name: 'Egg Fried Rice', price: 90, v: false, sub: 'Fried Rice' },
      { name: 'Chicken Fried Rice', price: 110, v: false, pop: true, sub: 'Fried Rice' },
      { name: 'Mix Fried Rice', price: 120, v: false, sub: 'Fried Rice' },
      { name: 'Schezwan Veg Fried Rice', price: 90, v: true, sub: 'Fried Rice' },
      { name: 'Schezwan Egg Fried Rice', price: 100, v: false, sub: 'Fried Rice' },
      { name: 'Schezwan Chicken Fried Rice', price: 120, v: false, sub: 'Fried Rice' },
      { name: 'Schezwan Egg Chicken Fried Rice', price: 130, v: false, sub: 'Fried Rice' },
    ],
  },
  {
    category: 'Biryani',
    image: 'chicken-biryani',
    blurb: 'Long-grain rice layered with spices, slow-cooked in the handi.',
    items: [
      { name: 'Aloo Biryani', price: 70, v: true },
      { name: 'Egg Biryani', price: 80, v: false },
      { name: 'Chicken Biryani', price: 110, v: false, pop: true },
      { name: 'Special Chicken Biryani', price: 160, v: false, pop: true },
    ],
  },
  {
    category: 'Rice Meals',
    image: 'indian-thali-meals',
    blurb: 'Simple, filling rice plates for lunch or dinner.',
    items: [
      { name: 'Veg Meal', price: 50, v: true },
      { name: 'Egg Meal', price: 70, v: false },
      { name: 'Fish Meal', price: 80, v: false },
      { name: 'Chicken Meal', price: 90, v: false },
      { name: 'Extra Rice', price: 5, v: true, addon: true },
    ],
  },
  {
    category: 'Combos',
    image: 'chicken-fried-rice',
    blurb: 'Noodles, rice or paratha paired with a side, at one price.',
    items: [
      { name: 'Veg Chow + Chilli Chicken + Cold Drink', price: 110, v: false, sub: 'Noodles combo' },
      { name: 'Egg Chow + Chilli Chicken + Cold Drink', price: 120, v: false, sub: 'Noodles combo' },
      { name: 'Chicken Chow + Chilli Chicken + Cold Drink', price: 130, v: false, sub: 'Noodles combo' },
      { name: 'Butter Garlic Veg Fried Rice + Chilli Chicken', price: 100, v: false, sub: 'Fried rice combo' },
      { name: 'Butter Garlic Egg Fried Rice + Chilli Chicken', price: 110, v: false, sub: 'Fried rice combo' },
      { name: 'Chicken Fried Rice + Chilli Chicken', price: 130, v: false, sub: 'Fried rice combo' },
      { name: '2 Lachha Paratha + 2 Chilli Paneer', price: 70, v: true, sub: 'Paratha combo' },
      { name: '2 Lachha Paratha + 2 Chilli Chicken', price: 80, v: false, sub: 'Paratha combo' },
      { name: '2 Lachha Paratha + Chicken Kasa', price: 110, v: false, sub: 'Paratha combo' },
    ],
  },
  {
    category: 'Paratha & Main Course',
    image: 'chicken-kasa',
    blurb: 'Rich gravies and dry chilli dishes, best with lachha paratha.',
    items: [
      { name: 'Lachha Paratha', price: 15, v: true, addon: true },
      { name: 'Chicken Kasa', note: '4 pcs', price: 160, v: false, pop: true },
      { name: 'Paneer Butter Masala', price: 140, v: true },
      { name: 'Chicken Butter Masala', note: '6 pcs', price: 140, v: false },
      { name: 'Chilli Paneer', note: '6 pcs', price: 120, v: true },
      { name: 'Chilli Chicken', note: '6 pcs', price: 150, v: false },
    ],
  },
  {
    category: 'Momo',
    image: 'steamed-momo',
    blurb: 'Hand-folded dumplings with red chutney.',
    items: [
      { name: 'Veg Momo', note: '5 pcs', price: 60, v: true },
      { name: 'Chicken Momo', note: '5 pcs', price: 70, v: false },
      { name: 'Fried Momo', note: '5 pcs', price: 90, v: true },
    ],
  },
  {
    category: 'Pav',
    image: 'pav-bhaji',
    blurb: 'Buttery pav with spiced bhaji or a crisp vada.',
    items: [
      { name: 'Pav Bhaji', price: 80, v: true },
      { name: 'Cheese Pav Bhaji', price: 105, v: true },
      { name: 'Vada Pav', price: 30, v: true },
    ],
  },
  {
    category: 'South Indian',
    image: 'masala-dosa',
    blurb: 'Dosa straight off the tawa, soft idli and vada with sambar.',
    items: [
      { name: 'Idly', note: '3 pcs', price: 40, v: true, sub: 'Idly and vada' },
      { name: 'Sambar Vada', note: '2 pcs', price: 50, v: true, sub: 'Idly and vada' },
      { name: 'Idly Fry', note: '3 pcs', price: 70, v: true, sub: 'Idly and vada' },
      { name: 'Butter Idly Fry', note: '3 pcs', price: 90, v: true, sub: 'Idly and vada' },
      { name: 'Dahi Vada', note: '2 pcs', price: 60, v: true, sub: 'Idly and vada' },
      { name: 'Plain Dosa', price: 50, v: true, sub: 'Plain dosa' },
      { name: 'Onion Dosa', price: 60, v: true, sub: 'Plain dosa' },
      { name: 'Butter Plain Dosa', price: 70, v: true, sub: 'Plain dosa' },
      { name: 'Cheese Plain Dosa', price: 70, v: true, sub: 'Plain dosa' },
      { name: 'Masala Dosa', price: 70, v: true, pop: true, sub: 'Masala dosa' },
      { name: 'Onion Masala Dosa', price: 75, v: true, sub: 'Masala dosa' },
      { name: 'Butter Masala Dosa', price: 90, v: true, sub: 'Masala dosa' },
      { name: 'Cheese Masala Dosa', price: 90, v: true, sub: 'Masala dosa' },
      { name: 'Onion Butter Cheese Masala Dosa', price: 115, v: true, sub: 'Masala dosa' },
      { name: 'Paneer Bhujia Dosa', price: 130, v: true, sub: 'Masala dosa' },
    ],
  },
];

export const menu = raw.map((cat) => ({
  ...cat,
  id: slug(cat.category),
  items: cat.items.map((item) => ({ ...item, id: slug(item.name), category: cat.category, categoryId: slug(cat.category) })),
}));

export const allItems = menu.flatMap((c) => c.items);
export const itemById = Object.fromEntries(allItems.map((i) => [i.id, i]));

// Dishes featured on the home page, with their photo.
export const favourites = [
  { id: 'chicken-biryani', image: 'chicken-biryani' },
  { id: 'chicken-roll', image: 'chicken-roll' },
  { id: 'chicken-chow', image: 'chicken-chowmein' },
  { id: 'masala-dosa', image: 'masala-dosa' },
  { id: 'chicken-fried-rice', image: 'chicken-fried-rice' },
  { id: 'chicken-kasa', image: 'chicken-kasa' },
].map((f) => ({ ...itemById[f.id], image: f.image }));

// Short list for the scrolling price board.
export const tickerItems = [
  'egg-roll', 'chicken-biryani', 'veg-chow', 'masala-dosa', 'chicken-roll', 'veg-momo',
  'chicken-kasa', 'vada-pav', 'chicken-fried-rice', 'pav-bhaji', 'aloo-biryani', 'chilli-chicken',
].map((id) => itemById[id]);

// Lowest price in a section, ignoring add-ons like Extra Rice.
export const startingPrice = (category) =>
  Math.min(...menu.find((c) => c.category === category).items.filter((i) => !i.addon).map((i) => i.price));
