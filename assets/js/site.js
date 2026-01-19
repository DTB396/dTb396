/**
 * xTx396.info — Premium Site JavaScript
 * High-end interactions and animations
 * 2026
 */

(() => {
  'use strict';

  // ==========================================================================
  // Configuration
  // ==========================================================================
  const CONFIG = {
    animationOffset: 100,
    headerHideThreshold: 80,
    scrollDebounce: 10,
    animationDuration: 400
  };

  // ==========================================================================
  // Utility Functions
  // ==========================================================================
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= 0
    );
  };

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================
  const initMobileNav = () => {
    const btn = document.querySelector('.navbtn');
    const drawer = document.querySelector('.navdrawer');
    
    if (!btn || !drawer) return;

    const open = () => {
      drawer.hidden = false;
      requestAnimationFrame(() => {
        drawer.classList.add('is-open');
      });
      btn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      drawer.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
      document.body.style.overflow = '';
      setTimeout(() => {
        drawer.hidden = true;
      }, CONFIG.animationDuration);
    };

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      expanded ? close() : open();
    });

    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.hidden) close();
    });
  };

  // ==========================================================================
  // Header Scroll Effects
  // ==========================================================================
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentY = window.scrollY;
      
      // Add/remove scrolled class for styling
      if (currentY > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Hide/show header on scroll direction
      if (currentY > lastScrollY && currentY > CONFIG.headerHideThreshold) {
        header.classList.add('header--hide');
      } else {
        header.classList.remove('header--hide');
      }

      lastScrollY = currentY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  };

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate], [data-animate-stagger]');
    
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Add staggered animation to children
          if (entry.target.hasAttribute('data-animate-stagger')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              child.style.transitionDelay = `${index * 75}ms`;
              child.style.transition = `opacity 0.4s ease, transform 0.4s ease`;
            });
          }
          
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el) => observer.observe(el));
  };

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, null, targetId);
      });
    });
  };

  // ==========================================================================
  // Project Card Hover Effects
  // ==========================================================================
  const initCardEffects = () => {
    const cards = document.querySelectorAll('.project-card, .credential-card, .contact-card');
    
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('is-hovered');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-hovered');
      });
    });
  };

  // ==========================================================================
  // Button Ripple Effect
  // ==========================================================================
  const initButtonRipples = () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach((btn) => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation styles
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ==========================================================================
  // Page Load Animation
  // ==========================================================================
  const initPageLoad = () => {
    const markLoaded = () => {
      document.body.classList.add('is-loaded');
      
      // Hide loader if present
      const loader = document.querySelector('.page-loader');
      if (loader) {
        loader.hidden = true;
      }
    };

    if (document.readyState === 'complete') {
      markLoaded();
    } else {
      window.addEventListener('load', markLoaded);
    }
  };

  // ==========================================================================
  // Keyboard Navigation Enhancements
  // ==========================================================================
  const initKeyboardNav = () => {
    // Add visible focus indicators only when using keyboard
    document.body.addEventListener('mousedown', () => {
      document.body.classList.add('using-mouse');
    });

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
      }
    });
  };

  // ==========================================================================
  // External Link Handler
  // ==========================================================================
  const initExternalLinks = () => {
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  };

  // ==========================================================================
  // Tile Builder (if present)
  // ==========================================================================
  const initTileBuilder = () => {
    const tileBuilder = document.getElementById('tile-builder');
    if (tileBuilder && window.Sortable) {
      new Sortable(tileBuilder, {
        animation: 150,
        ghostClass: 'sortable-ghost',
      });
    }
  };

  // ==========================================================================
  // Initialize Everything
  // ==========================================================================
  const init = () => {
    initMobileNav();
    initHeaderScroll();
    initScrollAnimations();
    initSmoothScroll();
    initCardEffects();
    initButtonRipples();
    initPageLoad();
    initKeyboardNav();
    initExternalLinks();
    initTileBuilder();
    
    console.log('🚀 xTx396.info initialized');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
  });
}
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.classList.add('visible');
    }
  });
});
