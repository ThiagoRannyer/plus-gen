/**
 * PLUS RN ENERGIA SOLAR — LANDING PAGE JS
 * Funcionalidades: partículas, contadores, simulador, formulário, navbar, scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================
     1. PARTICLES GENERATOR
  =================================================== */
  function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 18 : 36;

    for (let i = 0; i < count; i++) {
      createParticle(container);
    }
  }

  function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 1.5;
    const posX = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 12;
    const opacity = Math.random() * 0.5 + 0.2;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${posX}%;
      bottom: -10px;
      opacity: 0;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 3}px rgba(10,238,86,${opacity});
    `;

    container.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove();
      createParticle(container);
    });
  }

  /* ===================================================
     2. NAVBAR: scroll effect + mobile toggle
  =================================================== */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile toggle
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);

        // Animate hamburger to X
        const spans = toggle.querySelectorAll('span');
        if (isOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity = '';
          spans[2].style.transform = '';
        }
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          toggle.querySelectorAll('span').forEach(span => { span.style = ''; });
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggle.querySelectorAll('span').forEach(span => { span.style = ''; });
        }
      });
    }
  }

  /* ===================================================
     3. HERO SAVINGS COUNTER (animated R$ counter on load)
  =================================================== */
  function initHeroSavingsCounter() {
    const counter = document.getElementById('savingsCounter');
    if (!counter) return;

    // Simulates counting up to a typical savings value
    const target = 380; // R$ 380,00 (based on ~R$400 bill)
    const duration = 2800;
    const start = Date.now();

    function updateCounter() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      counter.textContent = `R$ ${current.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mês`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    // Start after a small delay so the hero animation settles
    setTimeout(() => requestAnimationFrame(updateCounter), 1200);
  }

  /* ===================================================
     4. SCROLL REVEAL (Intersection Observer)
  =================================================== */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered animation for grid children
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let staggerIndex = 0;
          siblings.forEach((sib, i) => {
            if (sib === entry.target) staggerIndex = i;
          });

          const delay = Math.min(staggerIndex * 80, 400);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* ===================================================
     5. ANIMATED STAT COUNTERS (stats strip)
  =================================================== */
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = Date.now();
    const startValue = 0;

    function update() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + eased * (target - startValue));
      el.textContent = current.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
      }
    }

    requestAnimationFrame(update);
  }

  /* ===================================================
     6. SAVINGS SIMULATOR
  =================================================== */
  function initSimulator() {
    const billInput = document.getElementById('billValue');
    const billSlider = document.getElementById('billSlider');
    const monthlyEl = document.getElementById('monthlyEconomy');
    const annualEl = document.getElementById('annualEconomy');
    const totalEl = document.getElementById('totalEconomy');
    const monthlyBar = document.getElementById('monthlyBar');
    const annualBar = document.getElementById('annualBar');
    const simWhatsApp = document.getElementById('simWhatsApp');

    if (!billInput || !billSlider) return;

    function calculateSavings(billValue) {
      const saving = Math.round(billValue * 0.80); // 80% economy
      const annual = saving * 12;
      const total25 = annual * 25;
      return { monthly: saving, annual, total25, billValue };
    }

    function formatCurrency(value) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function updateDisplay(billValue) {
      const { monthly, annual, total25 } = calculateSavings(billValue);

      // Animate values
      animateValue(monthlyEl, monthly, formatCurrency);
      animateValue(annualEl, annual, formatCurrency);
      animateValue(totalEl, total25, formatCurrency);

      // Update bars (max based on R$5000 bill = R$4000/month savings)
      const maxMonthly = 4000;
      const maxAnnual = 48000;
      const monthlyPct = Math.min((monthly / maxMonthly) * 100, 100);
      const annualPct = Math.min((annual / maxAnnual) * 100, 100);

      if (monthlyBar) monthlyBar.style.width = monthlyPct + '%';
      if (annualBar) annualBar.style.width = annualPct + '%';

      // Update WhatsApp link
      if (simWhatsApp) {
        const msg = encodeURIComponent(
          `Olá! Gostaria de um orçamento gratuito de energia solar!\n\n` +
          `💡 Minha conta de luz: ${formatCurrency(billValue)}/mês\n` +
          `💰 Economia estimada: ${formatCurrency(monthly)}/mês\n` +
          `📅 Economia anual: ${formatCurrency(annual)}`
        );
        simWhatsApp.href = `https://wa.me/5584996808516?text=${msg}`;
      }
    }

    function animateValue(el, target, formatter) {
      if (!el) return;
      const current = parseFloat((el.dataset.current || '0').replace(',', '.')) || 0;
      const start = Date.now();
      const duration = 500;

      function update() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 2);
        const value = current + eased * (target - current);
        el.textContent = formatter(Math.round(value));
        if (progress < 1) requestAnimationFrame(update);
        else el.dataset.current = target;
      }

      requestAnimationFrame(update);
    }

    // Sync input and slider
    billInput.addEventListener('input', () => {
      const val = Math.max(100, Math.min(parseInt(billInput.value) || 100, 10000));
      billSlider.value = Math.min(val, 5000);
      updateDisplay(val);
    });

    billSlider.addEventListener('input', () => {
      const val = parseInt(billSlider.value);
      billInput.value = val;
      updateDisplay(val);
    });

    // Initialize with default value
    updateDisplay(300);
    billInput.value = 300;
    billSlider.value = 300;
  }

  /* ===================================================
     7. LEAD FORM (submit → WhatsApp)
  =================================================== */
  function initLeadForm() {
    const form = document.getElementById('leadForm');
    if (!form) return;

    // Phone mask
    const phoneInput = document.getElementById('leadPhone');
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        let v = phoneInput.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length >= 11) {
          v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (v.length >= 7) {
          v = v.replace(/^(\d{2})(\d{4,5})(\d{0,4})$/, '($1) $2-$3');
        } else if (v.length >= 3) {
          v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        }
        phoneInput.value = v;
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('leadName')?.value.trim() || '';
      const phone = document.getElementById('leadPhone')?.value.trim() || '';
      const email = document.getElementById('leadEmail')?.value.trim() || '';
      const bill = document.getElementById('leadBill')?.value.trim() || '';
      const city = document.getElementById('leadCity')?.value.trim() || '';
      const type = document.getElementById('leadType')?.value || '';

      if (!name || !phone || !bill || !city) {
        showFormFeedback(form, 'error', 'Por favor, preencha todos os campos obrigatórios (*).');
        return;
      }

      const typeLabels = { residencial: 'Residencial', comercial: 'Comercial', industrial: 'Industrial', rural: 'Rural' };
      const typeLabel = typeLabels[type] || type;
      const billFormatted = parseFloat(bill).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const message = encodeURIComponent(
        `🌞 *Solicitação de Orçamento - Plus RN*\n\n` +
        `👤 *Nome:* ${name}\n` +
        `📱 *WhatsApp:* ${phone}\n` +
        `📧 *Email:* ${email || 'Não informado'}\n` +
        `💡 *Conta de luz:* ${billFormatted}/mês\n` +
        `📍 *Cidade:* ${city}\n` +
        `🏠 *Tipo:* ${typeLabel}\n\n` +
        `Gostaria de um orçamento gratuito de energia solar!`
      );

      // Show success feedback
      showFormFeedback(form, 'success', '✅ Ótimo! Redirecionando para o WhatsApp...');

      setTimeout(() => {
        window.open(`https://wa.me/5584996808516?text=${message}`, '_blank');
        form.reset();
        clearFormFeedback(form);
      }, 1200);
    });
  }

  function showFormFeedback(form, type, message) {
    let feedback = form.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      form.insertBefore(feedback, form.querySelector('.btn-submit'));
    }
    feedback.textContent = message;
    feedback.style.cssText = `
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 12px;
      font-size: 0.88rem;
      font-weight: 600;
      text-align: center;
      background: ${type === 'success' ? 'rgba(10,238,86,0.12)' : 'rgba(255,80,80,0.1)'};
      border: 1px solid ${type === 'success' ? 'rgba(10,238,86,0.35)' : 'rgba(255,80,80,0.35)'};
      color: ${type === 'success' ? '#0aee56' : '#ff6666'};
    `;
  }

  function clearFormFeedback(form) {
    const feedback = form.querySelector('.form-feedback');
    if (feedback) feedback.remove();
  }

  /* ===================================================
     8. SMOOTH SCROLL for anchor links
  =================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
          const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      });
    });
  }

  /* ===================================================
     9. ACTIVE NAV LINK on scroll
  =================================================== */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));
  }

  /* ===================================================
     10. HOVER NEON TILT on benefit cards
  =================================================== */
  function initCardTilt() {
    const cards = document.querySelectorAll('.benefit-card, .testimonial-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const tiltX = ((y - cy) / cy) * 5;
        const tiltY = ((cx - x) / cx) * 5;
        card.style.transform = `translateY(-8px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ===================================================
     11. PARALLAX EFFECT on hero
  =================================================== */
  function initParallax() {
    const heroGrid = document.querySelector('.hero-grid');
    if (!heroGrid) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  /* ===================================================
     INITIALIZE ALL
  =================================================== */
  initParticles();
  initNavbar();
  initHeroSavingsCounter();
  initScrollReveal();
  initStatCounters();
  initSimulator();
  initLeadForm();
  initSmoothScroll();
  initActiveNav();
  initCardTilt();
  initParallax();

  // Add active nav style
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active { color: var(--green) !important; }
    .nav-links a.active::after { width: 100% !important; }
  `;
  document.head.appendChild(style);

  console.log('🌞 Plus RN Energia Solar — Landing page carregada com sucesso!');
});
