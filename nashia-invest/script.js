document.addEventListener('DOMContentLoaded', function () {

  // ── Fade-in animations ──
  var fadeEls = document.querySelectorAll('.fade-in');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(el);
  });

  // ── Password gate (portfolio page) ──
  var gate = document.getElementById('password-gate');
  if (gate) {
    // <!-- CHANGE PASSWORD HERE -->
    var PASSWORD = 'investinart';

    var input = gate.querySelector('input[type="password"]');
    var btn = gate.querySelector('button');
    var errorMsg = gate.querySelector('.password-error');
    var protectedContent = document.getElementById('protected-content');

    function attemptUnlock() {
      if (input.value === PASSWORD) {
        gate.style.display = 'none';
        protectedContent.classList.add('unlocked');
        var innerFades = protectedContent.querySelectorAll('.fade-in');
        innerFades.forEach(function (el, i) {
          el.style.transitionDelay = (i * 0.12) + 's';
          observer.observe(el);
        });
      } else {
        errorMsg.classList.add('show');
        input.value = '';
        setTimeout(function () {
          errorMsg.classList.remove('show');
        }, 2000);
      }
    }

    btn.addEventListener('click', attemptUnlock);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') attemptUnlock();
    });
  }

  // ── Inquiries popup ──
  var trigger = document.getElementById('inquiries-open');
  var overlay = document.getElementById('inquiries-overlay');
  var popup = document.getElementById('inquiries-popup');
  var closeBtn = document.getElementById('inquiries-close');

  if (trigger && popup) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.classList.add('open');
      popup.classList.add('open');
    });

    closeBtn.addEventListener('click', function () {
      overlay.classList.remove('open');
      popup.classList.remove('open');
    });

    overlay.addEventListener('click', function () {
      overlay.classList.remove('open');
      popup.classList.remove('open');
    });
  }

});
