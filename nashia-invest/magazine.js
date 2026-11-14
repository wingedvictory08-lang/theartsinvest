/* About magazine: pages fold over like a printed magazine. Going forward the
   current page turns over its left edge (the spine) to reveal the next one;
   going back, the previous page folds back down over it. */
document.addEventListener('DOMContentLoaded', function () {
  var magazine = document.querySelector('.magazine-pages');
  if (!magazine) return;
  var pages = Array.prototype.slice.call(magazine.querySelectorAll('[data-magazine-page]'));
  var controls = document.querySelector('.magazine-controls');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;
  var turning = false;

  function updateControls() {
    if (!controls) return;
    controls.querySelector('[data-page-prev]').disabled = current === 0;
    controls.querySelector('[data-page-next]').disabled = current === pages.length - 1;
    controls.querySelectorAll('[data-page]').forEach(function (button, index) {
      if (index === current) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  function showPage(next) {
    next = Math.max(0, Math.min(pages.length - 1, next));
    if (next === current || turning) return;
    var outgoing = pages[current];
    var incoming = pages[next];
    var forward = next > current;
    current = next;
    updateControls();

    if (reduceMotion) {
      outgoing.hidden = true;
      incoming.hidden = false;
      return;
    }

    // hold both pages in place while one folds over the other
    turning = true;
    incoming.hidden = false;
    magazine.style.height = Math.max(outgoing.offsetHeight, incoming.offsetHeight) + 'px';
    magazine.classList.add('is-turning');
    var folding = forward ? outgoing : incoming;
    var under = forward ? incoming : outgoing;
    under.classList.add('page-under');
    folding.classList.add(forward ? 'page-fold-over' : 'page-fold-back');

    folding.addEventListener('animationend', function done() {
      folding.removeEventListener('animationend', done);
      outgoing.hidden = true;
      folding.classList.remove('page-fold-over', 'page-fold-back');
      under.classList.remove('page-under');
      magazine.classList.remove('is-turning');
      magazine.style.height = '';
      turning = false;
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

  pages.forEach(function (page, index) { page.hidden = index !== 0; });
  updateControls();
});
