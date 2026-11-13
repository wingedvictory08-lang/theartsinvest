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
  fadeEls.forEach(function (el, i) { el.style.transitionDelay = (i * 0.1) + 's'; observer.observe(el); });

  // ── About magazine pages ──
  var magazine = document.getElementById('about-book');
  if (magazine) {
    var pages = Array.prototype.slice.call(magazine.querySelectorAll('[data-book-page]'));
    var previous = document.querySelector('[data-book-prev]');
    var next = document.querySelector('[data-book-next]');
    var pageButtons = Array.prototype.slice.call(document.querySelectorAll('[data-book-jump]'));
    var status = document.querySelector('[data-book-status]');
    var pageNames = ['Cover', 'The approach', 'The practice', 'Background'];
    var currentPage = 0;
    function showMagazinePage(index) {
      var target = Math.max(0, Math.min(pages.length - 1, index));
      if (target === currentPage || !pages[target]) return;
      var direction = target > currentPage ? 1 : -1;
      pages[currentPage].hidden = true;
      pages[target].hidden = false;
      if (pages[target].animate) pages[target].animate([{opacity:.45,transform:'perspective(1200px) rotateY('+(-4*direction)+'deg) translateX('+(10*direction)+'px)'},{opacity:1,transform:'perspective(1200px) rotateY(0deg) translateX(0)'}],{duration:360,easing:'cubic-bezier(0.2,0.7,0.25,1)'});
      currentPage = target;
      if (previous) previous.disabled = target === 0;
      if (next) next.disabled = target === pages.length - 1;
      pageButtons.forEach(function(button, buttonIndex){if(buttonIndex===target)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
      if(status)status.textContent='Page '+(target+1)+' of '+pages.length+': '+pageNames[target];
    }
    if(previous)previous.addEventListener('click',function(){showMagazinePage(currentPage-1);});
    if(next)next.addEventListener('click',function(){showMagazinePage(currentPage+1);});
    pageButtons.forEach(function(button){button.addEventListener('click',function(){showMagazinePage(Number(button.getAttribute('data-book-jump')));});});
    magazine.addEventListener('keydown',function(event){if(event.key==='ArrowRight')showMagazinePage(currentPage+1);if(event.key==='ArrowLeft')showMagazinePage(currentPage-1);});
  }

  // ── Password gate (portfolio page) ──
  var gate = document.getElementById('password-gate');
  if (gate) {
    var PASSWORD = 'investinart';
    var input = gate.querySelector('input[type="password"]');
    var btn = gate.querySelector('button');
    var errorMsg = gate.querySelector('.password-error');
    var protectedContent = document.getElementById('protected-content');
    function attemptUnlock() {
      if (input.value === PASSWORD) {
        gate.style.display='none'; protectedContent.classList.add('unlocked');
        protectedContent.querySelectorAll('.fade-in').forEach(function(el,i){el.style.transitionDelay=(i*.12)+'s';observer.observe(el);});
      } else { errorMsg.classList.add('show'); input.value=''; setTimeout(function(){errorMsg.classList.remove('show');},2000); }
    }
    btn.addEventListener('click',attemptUnlock);
    input.addEventListener('keydown',function(e){if(e.key==='Enter')attemptUnlock();});
  }

  // ── Inquiries popup ──
  var trigger=document.getElementById('inquiries-open'),overlay=document.getElementById('inquiries-overlay'),popup=document.getElementById('inquiries-popup'),closeBtn=document.getElementById('inquiries-close');
  if(trigger&&popup){trigger.addEventListener('click',function(e){e.preventDefault();overlay.classList.add('open');popup.classList.add('open');});closeBtn.addEventListener('click',function(){overlay.classList.remove('open');popup.classList.remove('open');});overlay.addEventListener('click',function(){overlay.classList.remove('open');popup.classList.remove('open');});}
});
