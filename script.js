// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const inviteButton = document.getElementById('invite-button');
const navLinks = document.querySelectorAll('.nav-link');

// Configuration
const CONFIG = {
  botId: 'YOUR_BOT_ID_HERE', // Replace with your actual bot ID
  permissions: '2048', // Basic permissions: Send Messages, Read Message History, Use Slash Commands, Embed Links
  inviteUrl: 'https://discord.com/api/oauth2/authorize'
};

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
      activeContent.style.animation = 'none';
      setTimeout(() => {
        activeContent.style.animation = 'slideUp 0.5s ease-out';
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
          const navHeight = document.querySelector('.navbar').offsetHeight;
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
      
      // Open Discord authorization page
      window.open(inviteUrl, '_blank', 'width=500,height=700,scrollbars=yes,resizable=yes');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        inviteButton.innerHTML = originalText;
        inviteButton.style.pointerEvents = 'auto';
      }, 3000);
    });
  }
}

// Navbar Scroll Effect
function initializeNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
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
  });
}

// Intersection Observer for Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all feature cards, command cards, and other animated elements
  const animatedElements = document.querySelectorAll(
    '.feature-card, .command-card, .step, .invite-card'
  );
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Prayer Time Animation (Hero Card)
function initializePrayerTimeAnimation() {
  const prayerTimes = document.querySelectorAll('.prayer-time');
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
        command.textContent = 'Copied!';
        command.style.background = '#4CAF50';
        
        setTimeout(() => {
          command.textContent = originalText;
          command.style.background = '';
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
  });
}

// Mobile Menu (if needed in future)
function initializeMobileMenu() {
  // Mobile menu functionality can be added here if needed
  // For now, the responsive design handles mobile navigation
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
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🕌 Islamic Prayer Bot Website Loaded');
  
  // Initialize all functionality
  initializeTabs();
  initializeSmoothScrolling();
  initializeInviteButton();
  initializeNavbarScrollEffect();
  initializeScrollAnimations();
  initializePrayerTimeAnimation();
  initializeCommandCopy();
  initializeKeyboardNavigation();
  initializeErrorHandling();
  initializeThemeDetection();
  initializePerformanceMonitoring();
  
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