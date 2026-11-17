// Applies the saved or system colour theme before the page paints, to avoid a flash.
(function () {
  try {
    var t = localStorage.getItem('ydd-theme');
    if (t !== 'light' && t !== 'dark') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'dark' ? '#1c120b' : '#ffffff');
  } catch (e) {}
})();
