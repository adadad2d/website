// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const inviteButton = document.getElementById('invite-button');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const heroCard = document.querySelector('.hero-card');
const featureCards = document.querySelectorAll('.feature-card');
const steps = document.querySelectorAll('.step');
const sectionHeaders = document.querySelectorAll('.section-header');

// Configuration
const CONFIG = {
  botId: 'YOUR_BOT_ID_HERE', // Replace with your actual bot ID
  permissions: '182272', // Basic permissions: Send Messages, Read Message History, Use Slash Commands, Embed Links
  inviteUrl: 'https://discord.com/api/oauth2/authorize'
};

// Enhanced Loading Screen
function initializeLoadingScreen() {
  const loading = document.createElement('div');
  loading.className = 'loading';
  loading.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loading);
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => loading.remove(), 500);
    }, 1000);
  });
}

// Custom Cursor
function initializeCustomCursor() {
  if (window.innerWidth <= 768) return; // Skip on mobile
  
  const cursorDot = document.createElement('div');
  const cursorOutline = document.createElement('div');
  
  cursorDot.className = 'cursor-dot';
  cursorOutline.className = 'cursor-outline';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.1;
    outlineY += (mouseY - outlineY) * 0.1;
    
    cursorOutline.style.left = outlineX - 20 + 'px';
    cursorOutline.style.top = outlineY - 20 + 'px';
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .btn, .command-name, .example-command');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'scale(2)';
      cursorOutline.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'scale(1)';
      cursorOutline.style.transform = 'scale(1)';
    });
  });
}

// Particle Background
function initializeParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 10000);
  }
  
  // Create initial particles
  for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 200);
  }
  
  // Continue creating particles
  setInterval(createParticle, 500);
}

// Scroll Progress Indicator
function initializeScrollIndicator() {
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  document.body.appendChild(scrollIndicator);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
  });
}

// Back to Top Button
function initializeBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Tab Functionality
function initializeTabs() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
      
      // Add animation class
      const activeContent = document.getElementById(targetTab);
      activeContent.style.opacity = '0';
      activeContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        activeContent.style.opacity = '1';
        activeContent.style.transform = 'translateY(0)';
      }, 10);
    });
  });
}

// Smooth Scrolling for Navigation
function initializeSmoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle internal links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without triggering scroll
          history.pushState(null, null, href);
        }
      }
    });
  });
}

// Discord Invite Functionality
function initializeInviteButton() {
  if (inviteButton) {
    inviteButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Construct the Discord invite URL
      const inviteUrl = `${CONFIG.inviteUrl}?client_id=${CONFIG.botId}&permissions=${CONFIG.permissions}&scope=bot%20applications.commands`;
      
      // Add loading state
      const originalText = inviteButton.innerHTML;
      inviteButton.innerHTML = '<span class="btn-icon">⏳</span>Opening Discord...';
      inviteButton.style.pointerEvents = 'none';
      inviteButton.style.transform = 'scale(0.95)';
      
      // Open Discord authorization page
      window.open(inviteUrl, '_blank', 'width=500,height=700,scrollbars=yes,resizable=yes');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        inviteButton.innerHTML = originalText;
        inviteButton.style.pointerEvents = 'auto';
        inviteButton.style.transform = '';
      }, 3000);
    });
  }
}

// Navbar Scroll Effect
function initializeNavbarScrollEffect() {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', utils.debounce(() => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class for styling
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll (optional)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  }, 10));
}

// Intersection Observer for Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('section-header')) {
          entry.target.classList.add('animate');
        } else if (entry.target.classList.contains('feature-card')) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, Array.from(featureCards).indexOf(entry.target) * 100);
        } else if (entry.target.classList.contains('step')) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, Array.from(steps).indexOf(entry.target) * 200);
        } else {
          entry.target.classList.add('animate-on-scroll');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all feature cards, command cards, and other animated elements
  const animatedElements = document.querySelectorAll(
    '.feature-card, .command-card, .step, .invite-card, .section-header'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Prayer Time Animation (Hero Card)
function initializePrayerTimeAnimation() {
  const prayerTimes = document.querySelectorAll('.prayer-time');
  if (!prayerTimes.length) return;
  
  let currentActive = 0;
  
  function updateActivePrayer() {
    // Remove active class from all
    prayerTimes.forEach(time => time.classList.remove('active'));
    
    // Add active class to current
    if (prayerTimes[currentActive]) {
      prayerTimes[currentActive].classList.add('active');
    }
    
    // Move to next prayer time
    currentActive = (currentActive + 1) % prayerTimes.length;
  }
  
  // Update every 3 seconds
  setInterval(updateActivePrayer, 3000);
}

// Copy Command Functionality
function initializeCommandCopy() {
  const commands = document.querySelectorAll('.command-name, .example-command');
  
  commands.forEach(command => {
    command.addEventListener('click', async () => {
      const text = command.textContent.trim();
      
      try {
        await navigator.clipboard.writeText(text);
        
        // Show feedback
        const originalText = command.textContent;
        const originalBg = command.style.background;
        command.textContent = 'Copied!';
        command.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        command.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
          command.textContent = originalText;
          command.style.background = originalBg;
          command.style.transform = '';
        }, 1000);
        
      } catch (err) {
        console.log('Failed to copy command:', err);
        
        // Fallback: select text
        const range = document.createRange();
        range.selectNodeContents(command);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
    
    // Add cursor pointer
    command.style.cursor = 'pointer';
    command.setAttribute('title', 'Click to copy');
  });
}

// Typewriter Effect for Hero Title
function initializeTypewriterEffect() {
  const titleMain = document.querySelector('.title-main');
  if (!titleMain) return;
  
  const text = titleMain.textContent;
  titleMain.textContent = '';
  titleMain.style.borderRight = '3px solid var(--primary-color)';
  
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      titleMain.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        titleMain.style.borderRight = 'none';
      }, 1000);
    }
  }
  
  // Start typing after a delay
  setTimeout(typeWriter, 500);
}

// Dynamic Stats Counter
function initializeStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const isNumber = !isNaN(finalValue.replace(/[^0-9]/g, ''));
        
        if (isNumber) {
          const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
          const suffix = finalValue.replace(/[0-9]/g, '');
          
          let current = 0;
          const increment = numericValue / 50;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              target.textContent = finalValue;
              clearInterval(counter);
            } else {
              target.textContent = Math.floor(current) + suffix;
            }
          }, 50);
        }
        
        observer.unobserve(target);
      }
    });
  });
  
  stats.forEach(stat => observer.observe(stat));
}

// Enhanced Mobile Menu
function initializeMobileMenu() {
  if (window.innerWidth > 768) return;
  
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.createElement('button');
  menuToggle.className = 'mobile-menu-toggle';
  menuToggle.innerHTML = '☰';
  menuToggle.setAttribute('aria-label', 'Toggle menu');
  
  const navContainer = document.querySelector('.nav-container');
  navContainer.appendChild(menuToggle);
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    menuToggle.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuToggle.innerHTML = '☰';
    });
  });
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    // Tab navigation for invite button
    if (e.key === 'Enter' && document.activeElement === inviteButton) {
      inviteButton.click();
    }
    
    // Tab switching with arrow keys
    if (document.activeElement.classList.contains('tab-btn')) {
      const currentIndex = Array.from(tabButtons).indexOf(document.activeElement);
      let newIndex;
      
      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
      } else if (e.key === 'ArrowRight') {
        newIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
      }
      
      if (newIndex !== undefined) {
        e.preventDefault();
        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
      }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
      const navLinks = document.querySelector('.nav-links');
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      if (navLinks && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        if (menuToggle) menuToggle.innerHTML = '☰';
      }
    }
  });
}

// Error Handling
function initializeErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error reporting service
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // In production, you might want to send this to an error reporting service
  });
}

// Theme Detection (for future dark mode support)
function initializeThemeDetection() {
  // Check for user's preferred color scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode
    document.body.classList.add('dark-mode-preferred');
  }
  
  // Listen for changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
      document.body.classList.add('dark-mode-preferred');
    } else {
      document.body.classList.remove('dark-mode-preferred');
    }
  });
}

// Performance Monitoring
function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals (optional)
  if ('web-vital' in window) {
    // This would require the web-vitals library
    // getCLS(console.log);
    // getFID(console.log);
    // getFCP(console.log);
    // getLCP(console.log);
    // getTTFB(console.log);
  }
  
  // Log performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('🚀 Performance Metrics:', {
        'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart) + 'ms',
        'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart) + 'ms',
        'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms'
      });
    }, 0);
  });
}

// Utility Functions
const utils = {
  // Debounce function for scroll events
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Format numbers with commas
  formatNumber: (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  
  // Animate element
  animateElement: (element, animation, duration = 1000) => {
    element.style.animation = `${animation} ${duration}ms ease-out`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  },
  
  // Random number between min and max
  random: (min, max) => {
    return Math.random() * (max - min) + min;
  }
};

// Easter Egg - Konami Code
function initializeEasterEgg() {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  let userInput = [];
  
  document.addEventListener('keydown', (e) => {
    userInput.push(e.code);
    userInput = userInput.slice(-konamiCode.length);
    
    if (userInput.join('') === konamiCode.join('')) {
      // Easter egg activated!
      document.body.style.animation = 'rainbow 2s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 10000);
      
      // Add rainbow animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
      
      console.log('🌈 Easter egg activated! Enjoy the rainbow!');
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🕌 Islamic Prayer Bot Website Loaded');
  
  // Initialize loading screen first
  initializeLoadingScreen();
  
  // Initialize all functionality
  initializeTabs();
  initializeSmoothScrolling();
  initializeInviteButton();
  initializeNavbarScrollEffect();
  initializeScrollAnimations();
  initializePrayerTimeAnimation();
  initializeCommandCopy();
  initializeCustomCursor();
  initializeParticles();
  initializeScrollIndicator();
  initializeBackToTop();
  initializeTypewriterEffect();
  initializeStatsCounter();
  initializeMobileMenu();
  initializeKeyboardNavigation();
  initializeErrorHandling();
  initializeThemeDetection();
  initializePerformanceMonitoring();
  initializeEasterEgg();
  
  // Add loading complete class
  document.body.classList.add('loaded');
  
  console.log('✅ All features initialized successfully');
});

// Service Worker Registration (for PWA features in future)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered:', registration))
    //   .catch(error => console.log('SW registration failed:', error));
  });
}

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CONFIG,
    utils,
    initializeTabs,
    initializeSmoothScrolling,
    initializeInviteButton
  };
}
