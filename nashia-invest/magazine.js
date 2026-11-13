/* Accessible page turns for the About magazine; FAQ stays a full readable list. */
document.addEventListener('DOMContentLoaded', function () {
  var magazine = document.querySelector('.magazine-pages');
  if (!magazine) return;
  var pages = Array.prototype.slice.call(magazine.querySelectorAll('[data-magazine-page]'));
  var controls = document.querySelector('.magazine-controls');
  var current = 0;
  function showPage(next) {
    current = Math.max(0, Math.min(pages.length - 1, next));
    pages.forEach(function (page, index) { page.hidden = index !== current; });
    if (!controls) return;
    controls.querySelector('[data-page-prev]').disabled = current === 0;
    controls.querySelector('[data-page-next]').disabled = current === pages.length - 1;
    controls.querySelectorAll('[data-page]').forEach(function (button, index) {
      if (index === current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }
  if (controls) {
    controls.querySelector('[data-page-prev]').addEventListener('click', function () { showPage(current - 1); });
    controls.querySelector('[data-page-next]').addEventListener('click', function () { showPage(current + 1); });
    controls.querySelectorAll('[data-page]').forEach(function (button) {
      button.addEventListener('click', function () { showPage(Number(button.getAttribute('data-page')) - 1); });
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === 'ArrowRight') showPage(current + 1);
    if (event.key === 'ArrowLeft') showPage(current - 1);
  });
  showPage(0);
});