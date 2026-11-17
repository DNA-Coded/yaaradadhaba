// Single source of truth for business details used across the site.
export const SITE_URL = 'https://yaaradadhaba.vercel.app';

export const site = {
  name: 'Yaara Da Dhaba',
  phonePrimary: '+919903005932',
  phonePrimaryLabel: '+91 99030 05932',
  phoneSecondary: '+919875521685',
  phoneSecondaryLabel: '+91 98755 21685',
  whatsapp: '919903005932',
  addressLines: ['81, Nilgunj Road, Panjavila', 'Jagarata Pally, Deshpriya Nagar', 'Agarpara, Kolkata 700109'],
  addressFull:
    '81, Nilgunj Road, Panjavila, Jagarata Pally, Deshpriya Nagar, Agarpara, Kolkata, West Bengal 700109',
  hoursLabel: '10 AM to 10 PM, every day',
  openHour: 10,
  closeHour: 22,
  rating: 4.3,
  geo: { lat: 22.691456, lng: 88.378412 },
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.355106192837!2d88.37583767523912!3d22.691456179427613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d4600000001%3A0x6b84089e5746b198!2sYaara%20Da%20Dhaba!5e0!3m2!1sen!2sin!4v1719744578923!5m2!1sen!2sin',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Yaara+Da+Dhaba+Nilgunj+Road+Agarpara+Kolkata',
  directionsLink:
    'https://www.google.com/maps/dir/?api=1&destination=Yaara+Da+Dhaba+Nilgunj+Road+Agarpara+Kolkata',
};

export const whatsappLink = (text) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const GREETING = 'Hello Yaara Da Dhaba, I would like to place an order.';
