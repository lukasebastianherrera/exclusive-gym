'use strict';
const config = window.GYM_CONFIG;
const money = value => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value).replace(/\s/g, '');
const prices = { general: config.generalPrice, promo: config.promoPrice, ...config.additionalPrices };
document.querySelectorAll('[data-price]').forEach(el => el.textContent = money(prices[el.dataset.price]));
document.querySelectorAll('[data-period]').forEach(el => el.textContent = config.pricePeriod ? ` / ${config.pricePeriod}` : '');
document.querySelectorAll('[data-hours]').forEach(el => el.textContent = config.hours[el.dataset.hours]);
document.querySelectorAll('[data-address]').forEach(el => el.textContent = config.address);
document.querySelectorAll('[data-locality]').forEach(el => el.textContent = config.locality);
document.querySelector('#year').textContent = new Date().getFullYear();
const destination = `${config.address}, ${config.locality}, Argentina`;
document.querySelector('#directions').href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
document.querySelector('#gym-map').src = `https://maps.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`;
const messages = {
  general: 'Hola, ¿cómo están? Quería consultar por Exclusive Gym y conocer más información.',
  hero: 'Hola, me gustaría empezar a entrenar en Exclusive Gym. ¿Me brindan información?',
  tarifa: `Hola, quería consultar por la cuota mensual de ${money(config.generalPrice)} de Exclusive Gym.`,
  promo: `Hola, quería consultar por la promoción para nuevos socios de ${money(config.promoPrice)} por persona inscribiéndose de a dos en Exclusive Gym.`,
  horario: `Hola, quería consultar por la promo de 11 a 15 hs de ${money(prices.horario)} de Exclusive Gym.`,
  diario: `Hola, quería consultar por el pase diario de ${money(prices.diario)} de Exclusive Gym.`,
  trimestral: `Hola, quería consultar por el plan de 3 meses de ${money(prices.trimestral)} de Exclusive Gym.`,
  semestral: `Hola, quería consultar por el plan de 6 meses de ${money(prices.semestral)} de Exclusive Gym.`,
  anual: `Hola, quería consultar por el plan de 12 meses de ${money(prices.anual)} de Exclusive Gym.`
};
const demo = document.querySelector('#demo-contact');
const validNumber = /^\d{10,15}$/.test(config.whatsapp);
document.querySelectorAll('[data-wa]').forEach(link => {
  if (validNumber) link.href = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(messages[link.dataset.wa])}`;
  if (config.whatsappIsPlaceholder || !validNumber) {
    link.addEventListener('click', event => { event.preventDefault(); demo.showModal(); });
  } else { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
});
document.querySelector('#demo-ok').addEventListener('click', () => demo.close());
document.querySelector('.demo-close').addEventListener('click', () => demo.close());
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const headerObserver = new IntersectionObserver(([entry]) => document.querySelector('.site-header').classList.toggle('scrolled', !entry.isIntersecting));
headerObserver.observe(document.querySelector('.header-sentinel'));
const sectionObserver = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(link => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-20% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
const lightbox = document.querySelector('#lightbox');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + config.images.length) % config.images.length;
  const photo = config.images[currentPhoto];
  const image = document.querySelector('#lightbox-image');
  image.src = photo.src; image.alt = photo.alt;
  document.querySelector('#lightbox-caption').textContent = photo.label;
  document.querySelector('#photo-count').textContent = `${currentPhoto + 1} / ${config.images.length}`;
}
config.images.forEach((photo, index) => {
  const button = document.createElement('button'); button.className = 'gallery-item'; button.setAttribute('aria-label', `Ampliar foto: ${photo.label}`);
  const image = document.createElement('img'); image.src = photo.src; image.alt = photo.alt; image.loading = 'lazy'; image.width = 1080; image.height = index === 0 || index === 2 ? 1080 : 1440;
  button.append(image); button.addEventListener('click', () => { showPhoto(index); lightbox.showModal(); });
  document.querySelector('#gallery').append(button);
});
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('keydown', event => { if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); } if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); } });
[demo, lightbox].forEach(dialog => dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); }));
const socialIcons = { instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>' };
config.socialLinks.forEach(social => { if (!/^https:\/\//.test(social.url)) return; const a = document.createElement('a'); a.className = 'contact-icon'; a.setAttribute('aria-label', social.label); a.title = social.label; a.href = social.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.innerHTML = `${socialIcons[social.icon] || ''}<span class="sr-only">${social.label}</span>`; document.querySelector('#social-links').append(a); });
const footerWhatsApp = document.querySelector('.footer-main [data-wa="general"]');
if (footerWhatsApp) { footerWhatsApp.className = 'contact-icon'; footerWhatsApp.setAttribute('aria-label', 'Escribir por WhatsApp'); footerWhatsApp.title = 'WhatsApp'; footerWhatsApp.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 1 1 8.3 4.6Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-2.6-1.3-3.5-2.3-4.1-3.4-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"></path></svg><span class="sr-only">WhatsApp</span>'; document.querySelector('#social-links').prepend(footerWhatsApp); }
const schema = { '@context': 'https://schema.org', '@type': 'ExerciseGym', name: 'Exclusive Gym', address: { '@type': 'PostalAddress', streetAddress: config.address, addressLocality: 'Villa de Mayo', addressRegion: 'Buenos Aires', addressCountry: 'AR' } };
const structured = document.createElement('script'); structured.type = 'application/ld+json'; structured.textContent = JSON.stringify(schema); document.head.append(structured);
