// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to system preference
const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Initially hide animate-in elements and observe them
document.querySelectorAll('.animate-in').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Custom cursor (desktop only)
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// Check if device supports hover (desktop)
if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for interactive elements
    document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card, .social-link, .btn-download').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.background = 'rgba(99, 102, 241, 0.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = '#6366f1';
        });
    });
}

// Smooth scrolling for CTA buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Enhanced scroll animations with stagger effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add stagger effect to grid items
            const gridItems = entry.target.querySelectorAll('.skill-card, .project-card, .stat-card');
            gridItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Apply stagger animation to grids
document.querySelectorAll('.skills-grid, .projects-grid, .stats-grid').forEach(grid => {
    // Initially hide grid items
    grid.querySelectorAll('.skill-card, .project-card, .stat-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    staggerObserver.observe(grid);
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background');
    const gridOverlay = document.querySelector('.grid-overlay');
    
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (gridOverlay) {
        gridOverlay.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
    }
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 30);
        }, 1000);
    }
});

// Form submission with EmailJS
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Initialize EmailJS (replace with your actual keys)
    emailjs.init("ArtTFrrDKQB-bBfd-");
    
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Update button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Send email using EmailJS
    emailjs.sendForm('service_uotxnfd', 'template_m3phuum', event.target)
        .then(() => {
            // Success state
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))';
            
            // Reset form
            event.target.reset();
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)';
            }, 3000);
        })
        .catch((error) => {
            // Error state
            console.error('EmailJS error:', error);
            submitBtn.textContent = '✗ Failed to Send';
            submitBtn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            
            // Show error message
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)';
            }, 3000);
        });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'rgba(99, 102, 241, 0.95)' : 'rgba(236, 72, 153, 0.95)',
        color: '#ffffff',
        padding: '16px 24px',
        borderRadius: '12px',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '10000',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${type === 'success' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`,
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add smooth reveal animation to page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any modals or reset focus
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    
    // Press 'Tab' for better focus visibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
    const scrolled = window.pageYOffset;
    
    // Update navbar opacity based on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const opacity = Math.min(scrolled / 100, 1);
        navbar.style.background = `rgba(255, 255, 255, ${0.03 + opacity * 0.07})`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading indicator if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Initialize any other components
    console.log('Portfolio loaded successfully!');
});