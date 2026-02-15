// Pricing Plans Data
const plans = {
    starter: { name: 'Starter', price: 299, yearlyPrice: 2874 },
    basic: { name: 'Basic', price: 499, yearlyPrice: 4790 },
    pro: { name: 'Pro', price: 899, yearlyPrice: 8630 },
    enterprise: { name: 'Enterprise', price: 1799, yearlyPrice: 17270 }
};

// Selected plan state
let selectedPlan = 'starter';

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const billingToggle = document.getElementById('billing-toggle');
const pricingAmounts = document.querySelectorAll('.pricing-price .amount');
const selectedPlanName = document.getElementById('selected-plan-name');
const selectedPlanPrice = document.getElementById('selected-plan-price');
const qrImage = document.getElementById('qr-image');
const contactForm = document.getElementById('contact-form');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Pricing Toggle (Monthly/Yearly)
billingToggle.addEventListener('change', () => {
    const isYearly = billingToggle.checked;
    pricingAmounts.forEach(amount => {
        if (isYearly) {
            // Show yearly price (monthly * 12 * 0.8 for 20% discount)
            amount.textContent = Math.round(parseInt(amount.dataset.monthly) * 12 * 0.8);
        } else {
            amount.textContent = amount.dataset.monthly;
        }
    });
});

// Store original monthly prices
document.querySelectorAll('.pricing-price .amount').forEach(amount => {
    amount.dataset.monthly = amount.textContent;
});

// Select Plan Function
function selectPlan(planKey) {
    selectedPlan = planKey;
    const plan = plans[planKey];
    
    // Update payment section
    selectedPlanName.textContent = plan.name;
    selectedPlanPrice.textContent = plan.price;
    
    // Update QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UPI://cheapvps@upi?am=${plan.price}`;
    qrImage.src = qrUrl;
    
    // Scroll to payment section
    setTimeout(() => {
        document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Show success message (in real scenario, this would send data to server)
    alert(`Thank you, ${data.name}! Your message has been sent. We will contact you soon at ${data.email}.`);
    
    // Reset form
    contactForm.reset();
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Animation on Scroll - Fade In Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .pricing-card, .about-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add fade-in class dynamically
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Stagger animation for pricing cards
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Navbar Active Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .navbar ul li a.active {
        color: var(--primary-color);
    }
    .navbar ul li a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Console message for developers
console.log('%c🚀 Cheap VPS Website', 'font-size: 24px; font-weight: bold; color: #4f46e5;');
console.log('%cWelcome to Cheap VPS! If you need any help, feel free to contact us.', 'color: #6b7280;');
