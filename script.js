// Minimal JS: mobile nav toggle, smooth scroll, simple form submission placeholder, lightweight reveals

document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navMenu.style.display = expanded ? 'none' : 'flex';
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        if(window.innerWidth < 720 && navMenu){
          navMenu.style.display = 'none';
          navToggle && navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Simple reveal on scroll (very light)
  const items = document.querySelectorAll('.card, .value, .why-item, .profile-card, .contact-details, .illus');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.style.opacity = 1;
        en.target.style.transform = 'translateY(0)';
        io.unobserve(en.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(it=>{
    it.style.opacity = 0;
    it.style.transform = 'translateY(10px)';
    it.style.transition = 'opacity 420ms ease, transform 420ms ease';
    io.observe(it);
  });

  // Contact form: send JSON to placeholder endpoint
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      msg.textContent = '';
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      if(!payload.name || !payload.email){
        msg.textContent = 'يرجى إدخال اسمك والبريد الإلكتروني.';
        return;
      }

      try {
        // TODO: استبدل هذا المسار بنقطة النهاية الفعلية (مثلاً: https://api.yoursite.com/contact)
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        if(res.ok){
          msg.textContent = 'تم استلام رسالتك. سنوافيكم بالرد قريباً.';
          form.reset();
        } else {
          msg.textContent = 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.';
        }
      } catch (err) {
        console.error(err);
        msg.textContent = 'تعذر الاتصال بالخادم. تحقق من الاتصال أو حاول لاحقًا.';
      }
    });
  }
});
