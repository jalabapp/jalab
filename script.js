// Enhanced JS: logo animation trigger, animated SVG paths, improved form handling with honeypot and configurable endpoint

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

  // Logo entrance animation (CSS class)
  const logo = document.getElementById('siteLogo');
  if(logo){
    setTimeout(()=>{ logo.classList.add('logo-entrance'); }, 260);
  }

  // Animate SVG paths (simple dash offset animation)
  document.querySelectorAll('.anim-path').forEach(path=>{
    const len = path.getTotalLength ? path.getTotalLength() : 120;
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    path.style.transition = 'stroke-dashoffset 900ms ease-out';
    setTimeout(()=>{ path.style.strokeDashoffset = '0'; }, 420);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        if(window.innerWidth < 720 && navMenu){
          navMenu.style.display = 'none';
          navToggle && navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Simple reveal on scroll
  const items = document.querySelectorAll('.card, .value, .why-item, .profile-card, .contact-details, .illus, .hero-copy');
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

  // Contact form handling
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  const formEndpointMeta = document.querySelector('meta[name="form-endpoint"]');
  const FORM_ENDPOINT = formEndpointMeta ? formEndpointMeta.getAttribute('content') : '/api/contact';

  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      msg.textContent = '';
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Honeypot check
      if(data.website){
        msg.textContent = 'تم اكتشاف محتوى مُشتبه. إذا كنت إنسانًا، أعد المحاولة.';
        return;
      }

      if(!data.name || !data.email){
        msg.textContent = 'يرجى إدخال الاسم والبريد الإلكتروني.';
        return;
      }

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        if(res.ok){
          msg.textContent = 'تم استلام رسالتك. سنوافيكم بالرد قريبًا.';
          form.reset();
        } else {
          // Some form services return 200 even on error — handle generically
          msg.textContent = 'تم إرسال الطلب، لكن حدثت استجابة غير متوقعة من الخادم.';
        }
      } catch(err){
        console.error('Form submit error', err);
        msg.textContent = 'تعذر الاتصال بخدمة الإرسال. يمكنك إرسال بريد إلى contact@example.com';
      }
    });
  }

});
