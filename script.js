// Features data with all requested features
const features = [
    {
        id: 'life-map-timeline',
        icon: 'clock',
        title: 'Life Map Timeline',
        description: 'Your contract becomes a visual story of your life with key events, penalties, and bonuses mapped across time. Upload documents to get started.',
        color: 'timeline',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'dual-view',
        icon: 'eye',
        title: 'Dual-View Analysis',
        description: 'See each clause from 3 perspectives: yours, theirs, and what the law actually says.',
        color: 'legal',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'red-flag-mode',
        icon: 'shield',
        title: 'Red Flag Mode',
        description: 'Instant heatmap of contract risks with color-coded safety levels for every clause.',
        color: 'danger',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'what-if-sandbox',
        icon: 'edit',
        title: 'What-If Sandbox',
        description: 'Edit contracts in plain English and get AI-powered legal rewrites instantly.',
        color: 'analysis',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'negotiation-arena',
        icon: 'message-square',
        title: 'Negotiation Arena',
        description: 'Practice contract negotiations with AI role-playing as the other party.',
        color: 'negotiation',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'conflict-radar',
        icon: 'radar',
        title: 'Conflict Radar',
        description: 'Upload multiple contracts and discover hidden conflicts between them.',
        color: 'warning',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'legal-digital-twin',
        icon: 'bot',
        title: 'Legal Digital Twin',
        description: 'Your personal AI lawyer that knows your contracts inside out and answers what-if questions.',
        color: 'coach',
        status: 'live',
        type: 'interactive'
    },
    {
        id: 'social-mirror',
        icon: 'users',
        title: 'Social Mirror',
        description: 'Compare your contract terms with others in your city, industry, or situation.',
        color: 'legal',
        status: 'coming-soon',
        type: 'coming-soon'
    },
    {
        id: 'life-event-simulator',
        icon: 'calendar',
        title: 'Life Event Simulator',
        description: 'Test how major life changes affect your contracts before they happen.',
        color: 'analysis',
        status: 'coming-soon',
        type: 'coming-soon'
    },
    {
        id: 'voice-coach',
        icon: 'mic',
        title: 'Voice Contract Coach',
        description: 'Talk naturally to understand your contracts - no legal jargon needed.',
        color: 'coach',
        status: 'coming-soon',
        type: 'coming-soon'
    },
    {
        id: 'future-proof-scanner',
        icon: 'trending-up',
        title: 'Future-Proof Scanner',
        description: 'Get alerts about upcoming law changes that could affect your contracts.',
        color: 'negotiation',
        status: 'coming-soon',
        type: 'coming-soon'
    }
];

// Icon SVG paths
const iconPaths = {
    clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>',
    'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
    radar: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
    bot: '<path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line>',
    'trending-up': '<polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline><polyline points="16,7 22,7 22,13"></polyline>'
};

// Feature modal content templates
const featureModals = {
    'life-map-timeline': {
        title: 'Life Map Timeline',
        subtitle: 'Visualize your contract as a life story',
        content: `
            <div class="upload-area" onclick="handleFileUpload()" ondrop="handleFileDrop(event)" ondragover="allowDrop(event)">
                <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
                <h3>Upload Your Contract</h3>
                <p>Drag & drop your contract here or click to browse</p>
                <p style="font-size: 0.8rem; color: hsl(215, 20.2%, 65.1%);">Supports PDF, DOC, DOCX files</p>
            </div>
            <div class="timeline-container">
                <h3>Sample Timeline View</h3>
                <div class="timeline-item">
                    <div class="timeline-month">Month 0</div>
                    <div class="timeline-event">📄 Contract signed - Security deposit ₹20,000</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-month">Month 6</div>
                    <div class="timeline-event">📈 Rent increases by 10% - New amount ₹22,000</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-month">Month 12</div>
                    <div class="timeline-event">🚨 Early termination penalty - 3 months rent (₹66,000)</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-month">Month 18</div>
                    <div class="timeline-event">💰 Long-term bonus - Security deposit refund + ₹5,000</div>
                </div>
            </div>
        `
    },
    'dual-view': {
        title: 'Dual-View Analysis',
        subtitle: 'See contracts from every perspective',
        content: `
            <div class="dual-view-container">
                <div class="perspective-card you">
                    <h3 class="perspective-title">📱 Your Perspective</h3>
                    <p>"This clause increases my cost significantly and limits my flexibility to move."</p>
                </div>
                <div class="perspective-card them">
                    <h3 class="perspective-title">🏢 Their Perspective</h3>
                    <p>"Landlord wants security against tenant default and property damage risks."</p>
                </div>
                <div class="perspective-card law">
                    <h3 class="perspective-title">⚖️ Legal Perspective</h3>
                    <p>"Legally enforceable only if tenant is notified 30 days before rent increase takes effect."</p>
                </div>
            </div>
            <div style="margin-top: 2rem; padding: 1rem; background: hsla(217.2, 32.6%, 17.5%, 0.3); border-radius: 0.5rem;">
                <h4>Sample Clause Analysis:</h4>
                <p style="font-style: italic; margin: 1rem 0;">"Rent shall increase by 15% every 12 months without prior notice."</p>
                <p><strong>Analysis:</strong> This clause may be legally questionable in many jurisdictions that require advance notice for rent increases.</p>
            </div>
        `
    },
    'red-flag-mode': {
        title: 'Red Flag Mode',
        subtitle: 'Instant risk assessment heatmap',
        content: `
            <div class="risk-heatmap">
                <div class="risk-item safe">
                    <span>🟢 "Rent due on 1st of each month" - <strong>Safe</strong></span>
                </div>
                <div class="risk-item moderate">
                    <span>🟡 "Late fee ₹500/day after 5 days" - <strong>Moderate Risk</strong></span>
                </div>
                <div class="risk-item dangerous">
                    <span>🔴 "No refund of security deposit under any circumstances" - <strong>High Risk</strong></span>
                </div>
                <div class="risk-item moderate">
                    <span>🟡 "Landlord may increase rent without notice" - <strong>Moderate Risk</strong></span>
                </div>
                <div class="risk-item dangerous">
                    <span>🔴 "Tenant liable for all repairs regardless of cause" - <strong>High Risk</strong></span>
                </div>
            </div>
            <div style="margin-top: 2rem; padding: 1rem; background: hsla(217.2, 32.6%, 17.5%, 0.3); border-radius: 0.5rem;">
                <h4>Risk Assessment Summary:</h4>
                <p><strong>High Risk Items:</strong> 2 clauses need immediate attention</p>
                <p><strong>Moderate Risk Items:</strong> 2 clauses should be negotiated</p>
                <p><strong>Safe Items:</strong> 1 clause is standard and acceptable</p>
            </div>
        `
    },
    'what-if-sandbox': {
        title: 'What-If Sandbox',
        subtitle: 'Edit contracts in plain English',
        content: `
            <div class="sandbox-editor">
                <div class="editor-panel">
                    <h3>✏️ Plain English Input</h3>
                    <textarea class="editor-textarea" placeholder="Type your changes in plain English...

Example: 'I want 7 days grace period for rent payment without any penalty'"></textarea>
                    <button class="btn btn-primary" onclick="processPlainEnglish()" style="margin-top: 1rem;">Transform to Legal Text</button>
                </div>
                <div class="editor-panel">
                    <h3>⚖️ Legal Output</h3>
                    <div style="background: hsla(217.2, 32.6%, 17.5%, 0.5); padding: 1rem; border-radius: 0.5rem; min-height: 200px; color: hsl(210, 40%, 98%);">
                        <p><strong>Generated Legal Clause:</strong></p>
                        <p style="font-family: 'Times New Roman', serif; margin-top: 1rem; font-style: italic;">
                        "Tenant shall have a grace period of seven (7) days following the due date for rental payment without incurrence of late fees, penalties, or other charges. This grace period shall apply to each monthly rental payment throughout the term of this agreement."
                        </p>
                        <div style="margin-top: 1rem; padding: 0.5rem; background: hsla(142, 76%, 36%, 0.2); border-radius: 0.25rem;">
                            <small>✅ This clause provides clear protection for the tenant while maintaining landlord's rights after the grace period.</small>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    'negotiation-arena': {
        title: 'Negotiation Arena',
        subtitle: 'Practice with AI role-playing',
        content: `
            <div class="chat-container">
                <div class="chat-messages" id="negotiationChat">
                    <div class="chat-message ai">
                        <strong>🏢 AI Landlord:</strong> I'm proposing a rent increase of 15% for the next year. This is due to rising property maintenance costs and market rates.
                    </div>
                    <div class="chat-message user">
                        <strong>👤 You:</strong> I understand costs are rising, but 15% seems quite high. I've been a reliable tenant. Could we discuss 7%?
                    </div>
                    <div class="chat-message ai">
                        <strong>🏢 AI Landlord:</strong> I appreciate you being a good tenant. However, 7% won't cover my increased expenses. What about 12%?
                    </div>
                    <div class="chat-message ai" style="background: hsla(142, 76%, 36%, 0.2); border-left: 3px solid hsl(142, 76%, 36%);">
                        <strong>🤖 AI Coach:</strong> Good negotiation! Try countering with 10% and ask for something in return, like covering maintenance or utilities.
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your response..." id="negotiationInput" onkeypress="handleNegotiationEnter(event)">
                    <button class="btn btn-primary" onclick="sendNegotiation()">Send</button>
                </div>
            </div>
        `
    },
    'conflict-radar': {
        title: 'Conflict Radar',
        subtitle: 'Detect conflicts between contracts',
        content: `
            <div class="upload-area" onclick="handleMultiFileUpload()">
                <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <h3>Upload Multiple Contracts</h3>
                <p>Upload your job contract, rental agreement, freelance contracts, etc.</p>
                <p style="font-size: 0.8rem; color: hsl(215, 20.2%, 65.1%);">We'll scan for conflicts between them</p>
            </div>
            <div style="margin-top: 2rem;">
                <h3>🚨 Sample Conflict Detection</h3>
                <div style="background: hsla(0, 84%, 60%, 0.2); border-left: 4px solid hsl(0, 84%, 60%); padding: 1rem; margin: 1rem 0; border-radius: 0.5rem;">
                    <h4>⚠️ Conflict Found:</h4>
                    <p><strong>Employment Contract:</strong> "Employee shall not engage in any freelance work or side business during employment."</p>
                    <p><strong>Rental Agreement:</strong> "Property may be used for home-based freelance work with prior notice."</p>
                    <p><strong>Issue:</strong> Your job contract prohibits freelance work, but your rental agreement assumes you might freelance from home.</p>
                </div>
                <div style="background: hsla(142, 76%, 36%, 0.2); border-left: 4px solid hsl(142, 76%, 36%); padding: 1rem; border-radius: 0.5rem;">
                    <h4>💡 Suggested Resolution:</h4>
                    <p>Negotiate with your employer for written permission to do specific types of freelance work, or modify your rental agreement to exclude business use.</p>
                </div>
            </div>
        `
    },
    'legal-digital-twin': {
        title: 'Legal Digital Twin',
        subtitle: 'Your personal AI lawyer',
        content: `
            <div class="chat-container">
                <div class="chat-messages" id="digitalTwinChat">
                    <div class="chat-message ai">
                        <strong>🤖 Digital Twin:</strong> Hello! I'm your legal digital twin. I've analyzed all your contracts and I'm ready to answer questions about them.
                    </div>
                    <div class="chat-message user">
                        <strong>👤 You:</strong> What happens if I miss my rent payment next month?
                    </div>
                    <div class="chat-message ai">
                        <strong>🤖 Digital Twin:</strong> Based on your rental agreement (Clause 4.2), if you miss rent payment:
                        <br>• Day 1-5: No penalty
                        <br>• Day 6-15: ₹500/day late fee
                        <br>• Day 16+: Landlord may issue legal notice
                        <br>• Day 30+: Eviction proceedings may begin
                        <br><br>Your total penalty for a 10-day delay would be ₹2,500.
                    </div>
                    <div class="chat-message user">
                        <strong>👤 You:</strong> Can I sublet my apartment?
                    </div>
                    <div class="chat-message ai">
                        <strong>🤖 Digital Twin:</strong> According to Section 7 of your rental agreement, subletting requires written permission from your landlord. Unauthorized subletting can result in immediate termination of your lease.
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Ask about your contracts..." id="digitalTwinInput" onkeypress="handleDigitalTwinEnter(event)">
                    <button class="btn btn-primary" onclick="sendDigitalTwin()">Ask</button>
                </div>
            </div>
        `
    }
};

// Create feature cards
function createFeatureCards() {
    const featuresGrid = document.getElementById('featuresGrid');
    
    features.forEach(feature => {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.onclick = () => openFeatureModal(feature.id);
        
        const iconSvg = iconPaths[feature.icon] || iconPaths['clock'];
        const badgeClass = feature.status === 'coming-soon' ? 'feature-badge coming-soon' : 'feature-badge';
        
        card.innerHTML = `
            <div class="feature-header">
                <div class="feature-icon-wrapper ${feature.color}">
                    <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconSvg}
                    </svg>
                </div>
                <span class="${badgeClass}">${feature.status === 'coming-soon' ? 'Coming Soon' : 'Live'}</span>
            </div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
        `;
        
        featuresGrid.appendChild(card);
    });
}

// Modal functions
function openFeatureModal(featureId) {
    const modal = document.getElementById('featureModal');
    const modalBody = document.getElementById('modalBody');
    
    const feature = features.find(f => f.id === featureId);
    const modalContent = featureModals[featureId];
    
    if (!modalContent) {
        modalBody.innerHTML = `
            <div class="feature-modal-header">
                <h2 class="feature-modal-title">${feature.title}</h2>
                <p class="feature-modal-subtitle">Coming Soon</p>
            </div>
            <div style="text-align: center; padding: 2rem;">
                <p>This feature is currently in development and will be available soon!</p>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="feature-modal-header">
                <h2 class="feature-modal-title">${modalContent.title}</h2>
                <p class="feature-modal-subtitle">${modalContent.subtitle}</p>
            </div>
            ${modalContent.content}
        `;
    }
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('featureModal');
    modal.style.display = 'none';
}

// File handling functions
function handleFileUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            simulateFileProcessing(file.name);
        }
    };
    input.click();
}

function handleFileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        simulateFileProcessing(files[0].name);
    }
}

function allowDrop(e) {
    e.preventDefault();
    e.target.closest('.upload-area').classList.add('dragover');
}

function simulateFileProcessing(fileName) {
    alert(`Processing "${fileName}"... In a real implementation, this would analyze your contract and generate the timeline view.`);
}

// Chat functions
function handleNegotiationEnter(e) {
    if (e.key === 'Enter') {
        sendNegotiation();
    }
}

function sendNegotiation() {
    const input = document.getElementById('negotiationInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatContainer = document.getElementById('negotiationChat');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<strong>👤 You:</strong> ${message}`;
    chatContainer.appendChild(userMessage);
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = document.createElement('div');
        aiResponse.className = 'chat-message ai';
        aiResponse.innerHTML = `<strong>🏢 AI Landlord:</strong> That's a reasonable counter-offer. Let me consider 10% with you covering utilities. What do you think?`;
        chatContainer.appendChild(aiResponse);
        
        // Add coach tip
        setTimeout(() => {
            const coachTip = document.createElement('div');
            coachTip.className = 'chat-message ai';
            coachTip.style.background = 'hsla(142, 76%, 36%, 0.2)';
            coachTip.style.borderLeft = '3px solid hsl(142, 76%, 36%)';
            coachTip.innerHTML = `<strong>🤖 AI Coach:</strong> Great progress! This is a win-win. Accept this deal - 10% increase with utilities covered saves you money overall.`;
            chatContainer.appendChild(coachTip);
        }, 1500);
    }, 1000);
    
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleDigitalTwinEnter(e) {
    if (e.key === 'Enter') {
        sendDigitalTwin();
    }
}

function sendDigitalTwin() {
    const input = document.getElementById('digitalTwinInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatContainer = document.getElementById('digitalTwinChat');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.innerHTML = `<strong>👤 You:</strong> ${message}`;
    chatContainer.appendChild(userMessage);
    
    // Simulate AI response based on common questions
    setTimeout(() => {
        let response = "I'd be happy to help with that. Could you please be more specific about which contract or clause you're referring to?";
        
        if (message.toLowerCase().includes('break') && message.toLowerCase().includes('lease')) {
            response = "To break your lease early, according to Clause 8.1, you need to: <br>• Give 60 days written notice<br>• Pay 2 months rent as penalty<br>• Ensure property is in good condition<br>• Schedule final inspection with landlord";
        } else if (message.toLowerCase().includes('pet')) {
            response = "Your current lease (Section 6.3) prohibits pets without written landlord consent. I recommend requesting a pet addendum with a pet deposit of ₹10,000-15,000.";
        } else if (message.toLowerCase().includes('repair')) {
            response = "For repairs, your lease states: <br>• Landlord handles structural repairs<br>• Tenant handles minor maintenance under ₹2,000<br>• Emergency repairs: Contact landlord within 24 hours<br>• You can deduct emergency repair costs from rent with receipts";
        }
        
        const aiResponse = document.createElement('div');
        aiResponse.className = 'chat-message ai';
        aiResponse.innerHTML = `<strong>🤖 Digital Twin:</strong> ${response}`;
        chatContainer.appendChild(aiResponse);
    }, 1000);
    
    input.value = '';
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function processPlainEnglish() {
    alert('In a real implementation, this would use AI to transform your plain English request into proper legal language.');
}

function handleMultiFileUpload() {
    alert('This would allow you to upload multiple contracts to scan for conflicts between them.');
}

// Navigation functions
function showFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

function showDemo() {
    // Open the first available live feature
    const liveFeature = features.find(f => f.status === 'live');
    if (liveFeature) {
        openFeatureModal(liveFeature.id);
    }
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

// Add scroll effect to navbar
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'hsla(222.2, 84%, 4.9%, 0.98)';
        } else {
            navbar.style.background = 'hsla(222.2, 84%, 4.9%, 0.95)';
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
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }, 100);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('featureModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createFeatureCards();
    initSmoothScrolling();
    initNavbarScroll();
    initScrollAnimations();
});