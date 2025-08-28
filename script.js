// Features data
const features = [
    {
        icon: 'clock',
        title: 'Life Map Timeline',
        description: 'Your contract becomes a visual story of your life with key events, penalties, and bonuses mapped across time.',
        color: 'timeline',
        status: 'live'
    },
    {
        icon: 'eye',
        title: 'Dual-View Analysis',
        description: 'See each clause from 3 perspectives: yours, theirs, and what the law actually says.',
        color: 'legal',
        status: 'live'
    },
    {
        icon: 'shield',
        title: 'Red Flag Mode',
        description: 'Instant heatmap of contract risks with color-coded safety levels for every clause.',
        color: 'danger',
        status: 'live'
    },
    {
        icon: 'file-text',
        title: 'What-If Sandbox',
        description: 'Edit contracts in plain English and get AI-powered legal rewrites instantly.',
        color: 'analysis',
        status: 'live'
    },
    {
        icon: 'message-square',
        title: 'Negotiation Arena',
        description: 'Practice contract negotiations with AI role-playing as the other party.',
        color: 'negotiation',
        status: 'live'
    },
    {
        icon: 'radar',
        title: 'Conflict Radar',
        description: 'Upload multiple contracts and discover hidden conflicts between them.',
        color: 'warning',
        status: 'live'
    },
    {
        icon: 'bot',
        title: 'Legal Digital Twin',
        description: 'Your personal AI lawyer that knows your contracts inside out and answers what-if questions.',
        color: 'coach',
        status: 'live'
    },
    {
        icon: 'users',
        title: 'Social Mirror',
        description: 'Compare your contract terms with others in your city, industry, or situation.',
        color: 'legal',
        status: 'live'
    },
    {
        icon: 'calendar',
        title: 'Life Event Simulator',
        description: 'Test how major life changes affect your contracts before they happen.',
        color: 'analysis',
        status: 'live'
    },
    {
        icon: 'message-circle',
        title: 'Voice Contract Coach',
        description: 'Talk naturally to understand your contracts - no legal jargon needed.',
        color: 'coach',
        status: 'live'
    },
    {
        icon: 'trending-up',
        title: 'Future-Proof Scanner',
        description: 'Get alerts about upcoming law changes that could affect your contracts.',
        color: 'negotiation',
        status: 'live'
    }
];

// Icon SVG paths
const iconPaths = {
    clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
    radar: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
    bot: '<path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>',
    'trending-up': '<polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline><polyline points="16,7 22,7 22,13"></polyline>'
};

// Create feature cards
function createFeatureCards() {
    const featuresGrid = document.getElementById('featuresGrid');
    
    features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        
        const iconSvg = iconPaths[feature.icon] || iconPaths['file-text'];
        
        card.innerHTML = `
            <div class="feature-header">
                <div class="feature-icon-wrapper ${feature.color}">
                    <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconSvg}
                    </svg>
                </div>
                <span class="feature-badge">${feature.status}</span>
            </div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
        `;
        
        featuresGrid.appendChild(card);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add hover effects to buttons
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

// Add scroll effect to navbar
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'hsla(222.2, 84%, 4.9%, 0.95)';
        } else {
            navbar.style.background = 'hsla(222.2, 84%, 4.9%, 0.3)';
        }
    });
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    setTimeout(() => {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createFeatureCards();
    initSmoothScrolling();
    initButtonEffects();
    initNavbarScroll();
    initScrollAnimations();
});

// Add some interactive feedback for demo buttons
document.addEventListener('DOMContentLoaded', () => {
    const demoButtons = document.querySelectorAll('.btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
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
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);