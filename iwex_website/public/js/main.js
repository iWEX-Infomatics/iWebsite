// iWEX Website Main JavaScript

// API Base URL
const API_BASE = '/api/method/iwex_website.api.website';

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Initialize all components
    initNavigation();
    initScrollEffects();
    loadWebsiteSettings();
    initVueComponents();
    initPWA();
});

// Navigation Functions
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
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
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll to top button
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Load Website Settings from API
async function loadWebsiteSettings() {
    try {
        const response = await fetch(`${API_BASE}.get_website_settings`);
        const result = await response.json();
        
        if (result.message && result.message.success) {
            const data = result.message.data;
            updateBranding(data.branding);
            updateHeroSection(data.hero);
            updateAboutSection(data.about);
            updateContactSection(data.contact);
            updateSocialLinks(data.social);
            updateSEO(data.seo);
        }
    } catch (error) {
        console.error('Error loading website settings:', error);
    }
}

// Update Branding (Logo, Favicon, Company Name)
function updateBranding(branding) {
    // Update favicon
    if (branding.favicon) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = branding.favicon;
        } else {
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.type = 'image/x-icon';
            newFavicon.href = branding.favicon;
            document.head.appendChild(newFavicon);
        }
    }
    
    // Update company logo in navbar
    const navbarLogo = document.querySelector('nav a[href="/"]');
    if (navbarLogo && branding.logo) {
        navbarLogo.innerHTML = `<img src="${branding.logo}" alt="${branding.company_name}" class="h-10 w-auto">`;
    } else if (navbarLogo && branding.company_name) {
        // If no logo, update text
        navbarLogo.innerHTML = `<span class="text-blue-600">i</span><span class="text-gray-800">WEX</span>`;
        if (branding.tagline) {
            navbarLogo.innerHTML += `<span class="text-xs text-gray-500 ml-2">${branding.tagline}</span>`;
        }
    }
    
    // Update footer logo
    const footerLogo = document.querySelector('footer h3');
    if (footerLogo && branding.logo_dark) {
        footerLogo.innerHTML = `<img src="${branding.logo_dark}" alt="${branding.company_name}" class="h-8 w-auto">`;
    }
    
    // Update page title
    if (branding.company_name) {
        const titleParts = document.title.split(' - ');
        if (titleParts.length > 1) {
            document.title = `${titleParts[0]} - ${branding.company_name}`;
        }
    }
}

// Update Hero Section
function updateHeroSection(hero) {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCTAPrimary = document.getElementById('hero-cta-primary');
    const heroCTASecondary = document.getElementById('hero-cta-secondary');
    const heroImage = document.getElementById('hero-image');
    
    if (heroTitle && hero.title) heroTitle.textContent = hero.title;
    if (heroSubtitle && hero.subtitle) heroSubtitle.textContent = hero.subtitle;
    if (heroCTAPrimary && hero.cta_text) heroCTAPrimary.textContent = hero.cta_text;
    if (heroCTAPrimary && hero.cta_link) heroCTAPrimary.href = hero.cta_link;
    if (heroCTASecondary && hero.secondary_cta_text) heroCTASecondary.textContent = hero.secondary_cta_text;
    if (heroCTASecondary && hero.secondary_cta_link) heroCTASecondary.href = hero.secondary_cta_link;
    if (heroImage && hero.image) heroImage.src = hero.image;
}

// Update About Section
function updateAboutSection(about) {
    const aboutTitle = document.getElementById('about-title');
    const aboutDescription = document.getElementById('about-description');
    const aboutMission = document.getElementById('about-mission');
    const aboutVision = document.getElementById('about-vision');
    const aboutImage = document.getElementById('about-image');
    
    if (aboutTitle && about.title) aboutTitle.textContent = about.title;
    if (aboutDescription && about.description) aboutDescription.innerHTML = about.description;
    if (aboutMission && about.mission) aboutMission.innerHTML = about.mission;
    if (aboutVision && about.vision) aboutVision.innerHTML = about.vision;
    if (aboutImage && about.image) aboutImage.src = about.image;
}

// Update Contact Section
function updateContactSection(contact) {
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const contactAddress = document.getElementById('contact-address');
    
    if (contactEmail && contact.email) contactEmail.textContent = contact.email;
    if (contactPhone && contact.phone) contactPhone.textContent = contact.phone;
    if (contactAddress && contact.address) contactAddress.textContent = contact.address;
}

// Update Social Links
function updateSocialLinks(social) {
    const socialLinks = document.getElementById('social-links');
    if (!socialLinks) return;
    
    const links = [];
    const icons = {
        facebook: 'facebook',
        twitter: 'twitter',
        linkedin: 'linkedin',
        instagram: 'instagram',
        youtube: 'youtube',
        github: 'github'
    };
    
    Object.keys(icons).forEach(key => {
        if (social[key]) {
            links.push(`
                <a href="${social[key]}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-blue-600 transition-colors">
                    <i data-lucide="${icons[key]}" class="w-6 h-6"></i>
                </a>
            `);
        }
    });
    
    if (links.length > 0) {
        socialLinks.innerHTML = links.join('');
        lucide.createIcons();
    }
}

// Update SEO Meta Tags
function updateSEO(seo) {
    if (seo.meta_title) {
        document.title = seo.meta_title;
        document.getElementById('page-title').textContent = seo.meta_title;
        document.getElementById('og-title').setAttribute('content', seo.meta_title);
        document.getElementById('twitter-title').setAttribute('content', seo.meta_title);
    }
    
    if (seo.meta_description) {
        document.getElementById('meta-description').setAttribute('content', seo.meta_description);
        document.getElementById('og-description').setAttribute('content', seo.meta_description);
        document.getElementById('twitter-description').setAttribute('content', seo.meta_description);
    }
    
    if (seo.meta_keywords) {
        document.getElementById('meta-keywords').setAttribute('content', seo.meta_keywords);
    }
    
    if (seo.og_image) {
        document.getElementById('og-image').setAttribute('content', seo.og_image);
    }
    
    // Add Google Analytics if ID is provided
    if (seo.google_analytics_id) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${seo.google_analytics_id}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', seo.google_analytics_id);
    }
}

// Initialize Vue Components
function initVueComponents() {
    // Services Component
    if (document.getElementById('services-app')) {
        initServicesComponent();
    }
    
    // FAQ Component
    if (document.getElementById('faq-app')) {
        initFAQComponent();
    }
    
    // Testimonials Component
    if (document.getElementById('testimonials-app')) {
        initTestimonialsComponent();
    }
    
    // Contact Form Component
    if (document.getElementById('contact-form-app')) {
        initContactFormComponent();
    }
}

// Services Vue Component
function initServicesComponent() {
    const { createApp } = Vue;
    
    createApp({
        data() {
            return {
                services: [],
                loading: true
            }
        },
        async mounted() {
            await this.loadServices();
        },
        methods: {
            async loadServices() {
                try {
                    const response = await fetch(`${API_BASE}.get_services`);
                    const result = await response.json();
                    if (result.message && result.message.success) {
                        this.services = result.message.data;
                    }
                } catch (error) {
                    console.error('Error loading services:', error);
                } finally {
                    this.loading = false;
                }
            }
        },
        template: `
            <div v-if="loading" class="grid md:grid-cols-3 gap-8">
                <div v-for="i in 6" :key="i" class="skeleton h-64 rounded-lg"></div>
            </div>
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="service in services" :key="service.name" 
                     class="service-card card" data-aos="fade-up">
                    <div class="service-icon" v-if="service.icon_class">
                        <i :data-lucide="service.icon_class" class="w-8 h-8 text-white"></i>
                    </div>
                    <div class="service-icon" v-else-if="service.icon">
                        <img :src="service.icon" :alt="service.service_name" class="w-8 h-8">
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.service_name }}</h3>
                    <p class="text-gray-600 mb-4">{{ service.short_description }}</p>
                    <div v-if="service.features && service.features.length > 0" class="mt-4">
                        <ul class="space-y-2">
                            <li v-for="feature in service.features" :key="feature.feature_title" 
                                class="flex items-start text-sm text-gray-600">
                                <i data-lucide="check" class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                <span>{{ feature.feature_title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }).mount('#services-app');
    
    // Re-initialize Lucide icons after Vue renders
    setTimeout(() => lucide.createIcons(), 100);
}

// FAQ Vue Component
function initFAQComponent() {
    const { createApp } = Vue;
    
    createApp({
        data() {
            return {
                faqs: [],
                categories: [],
                selectedCategory: 'All',
                activeIndex: null,
                loading: true,
                searchQuery: ''
            }
        },
        async mounted() {
            await this.loadFAQs();
        },
        computed: {
            filteredFAQs() {
                let filtered = this.faqs;
                
                // Filter by category
                if (this.selectedCategory !== 'All') {
                    filtered = filtered.filter(faq => faq.category === this.selectedCategory);
                }
                
                // Filter by search query
                if (this.searchQuery) {
                    const query = this.searchQuery.toLowerCase();
                    filtered = filtered.filter(faq => 
                        faq.question.toLowerCase().includes(query) || 
                        faq.answer.toLowerCase().includes(query)
                    );
                }
                
                return filtered;
            }
        },
        methods: {
            async loadFAQs() {
                try {
                    const response = await fetch(`${API_BASE}.get_faqs`);
                    const result = await response.json();
                    if (result.message && result.message.success) {
                        this.faqs = result.message.data.faqs;
                        this.categories = ['All', ...result.message.data.categories];
                    }
                } catch (error) {
                    console.error('Error loading FAQs:', error);
                } finally {
                    this.loading = false;
                }
            },
            toggleFAQ(index) {
                this.activeIndex = this.activeIndex === index ? null : index;
            }
        },
        template: `
            <div>
                <!-- Search and Filter -->
                <div class="mb-8 space-y-4">
                    <input 
                        v-model="searchQuery"
                        type="text" 
                        placeholder="Search FAQs..." 
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                    >
                    <div class="flex flex-wrap gap-2">
                        <button 
                            v-for="category in categories" 
                            :key="category"
                            @click="selectedCategory = category"
                            :class="[
                                'px-4 py-2 rounded-lg font-medium transition-colors',
                                selectedCategory === category 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            ]"
                        >
                            {{ category }}
                        </button>
                    </div>
                </div>
                
                <!-- FAQs List -->
                <div v-if="loading" class="space-y-4">
                    <div v-for="i in 5" :key="i" class="skeleton h-20 rounded-lg"></div>
                </div>
                <div v-else-if="filteredFAQs.length === 0" class="text-center py-12">
                    <p class="text-gray-500 text-lg">No FAQs found</p>
                </div>
                <div v-else class="space-y-4">
                    <div v-for="(faq, index) in filteredFAQs" :key="faq.name" class="faq-item">
                        <div class="faq-question" @click="toggleFAQ(index)">
                            <span>{{ faq.question }}</span>
                            <i data-lucide="chevron-down" 
                               :class="['faq-icon w-5 h-5', { 'active': activeIndex === index }]"></i>
                        </div>
                        <div :class="['faq-answer', { 'active': activeIndex === index }]">
                            <div v-html="faq.answer" class="text-gray-600"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).mount('#faq-app');
    
    setTimeout(() => lucide.createIcons(), 100);
}

// Testimonials Vue Component
function initTestimonialsComponent() {
    const { createApp } = Vue;
    
    createApp({
        data() {
            return {
                testimonials: [],
                currentIndex: 0,
                loading: true,
                autoplayInterval: null
            }
        },
        async mounted() {
            await this.loadTestimonials();
            this.startAutoplay();
        },
        beforeUnmount() {
            this.stopAutoplay();
        },
        methods: {
            async loadTestimonials() {
                try {
                    const response = await fetch(`${API_BASE}.get_testimonials`);
                    const result = await response.json();
                    if (result.message && result.message.success) {
                        this.testimonials = result.message.data;
                    }
                } catch (error) {
                    console.error('Error loading testimonials:', error);
                } finally {
                    this.loading = false;
                }
            },
            nextTestimonial() {
                this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
            },
            prevTestimonial() {
                this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
            },
            goToTestimonial(index) {
                this.currentIndex = index;
            },
            startAutoplay() {
                this.autoplayInterval = setInterval(() => {
                    this.nextTestimonial();
                }, 5000);
            },
            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                }
            },
            getStars(rating) {
                return Array(5).fill(0).map((_, i) => i < parseInt(rating));
            }
        },
        template: `
            <div v-if="loading" class="skeleton h-64 rounded-lg"></div>
            <div v-else-if="testimonials.length === 0" class="text-center py-12">
                <p class="text-gray-500">No testimonials available</p>
            </div>
            <div v-else class="relative">
                <div class="testimonial-card max-w-3xl mx-auto" data-aos="fade-up">
                    <div class="testimonial-rating">
                        <i v-for="(filled, index) in getStars(testimonials[currentIndex].rating)" 
                           :key="index"
                           data-lucide="star" 
                           :class="['star w-5 h-5', filled ? 'fill-current' : '']"></i>
                    </div>
                    <p class="text-lg text-gray-700 mb-6 relative z-10">
                        {{ testimonials[currentIndex].testimonial_text }}
                    </p>
                    <div class="testimonial-author">
                        <img v-if="testimonials[currentIndex].client_image" 
                             :src="testimonials[currentIndex].client_image" 
                             :alt="testimonials[currentIndex].client_name"
                             class="author-image">
                        <div v-else class="author-image bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                            {{ testimonials[currentIndex].client_name.charAt(0) }}
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">{{ testimonials[currentIndex].client_name }}</h4>
                            <p class="text-sm text-gray-600">
                                {{ testimonials[currentIndex].designation }}
                                <span v-if="testimonials[currentIndex].company"> at {{ testimonials[currentIndex].company }}</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation -->
                <div class="flex items-center justify-center mt-8 gap-4">
                    <button @click="prevTestimonial" 
                            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <i data-lucide="chevron-left" class="w-6 h-6"></i>
                    </button>
                    <div class="flex gap-2">
                        <button v-for="(testimonial, index) in testimonials" 
                                :key="index"
                                @click="goToTestimonial(index)"
                                :class="[
                                    'w-2 h-2 rounded-full transition-all',
                                    currentIndex === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                                ]"></button>
                    </div>
                    <button @click="nextTestimonial" 
                            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <i data-lucide="chevron-right" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
        `
    }).mount('#testimonials-app');
    
    setTimeout(() => lucide.createIcons(), 100);
}

// Contact Form Vue Component
function initContactFormComponent() {
    const { createApp } = Vue;
    
    createApp({
        data() {
            return {
                formData: {
                    full_name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                },
                errors: {},
                loading: false,
                success: false,
                errorMessage: ''
            }
        },
        methods: {
            validateForm() {
                this.errors = {};
                
                if (!this.formData.full_name) {
                    this.errors.full_name = 'Name is required';
                }
                
                if (!this.formData.email) {
                    this.errors.email = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
                    this.errors.email = 'Invalid email address';
                }
                
                if (!this.formData.message) {
                    this.errors.message = 'Message is required';
                }
                
                return Object.keys(this.errors).length === 0;
            },
            async submitForm() {
                if (!this.validateForm()) {
                    return;
                }
                
                this.loading = true;
                this.success = false;
                this.errorMessage = '';
                
                try {
                    const response = await fetch(`${API_BASE}.submit_contact_form`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(this.formData)
                    });
                    
                    const result = await response.json();
                    
                    if (result.message && result.message.success) {
                        this.success = true;
                        this.formData = {
                            full_name: '',
                            email: '',
                            phone: '',
                            subject: '',
                            message: ''
                        };
                    } else {
                        this.errorMessage = result.message.message || 'An error occurred';
                    }
                } catch (error) {
                    console.error('Error submitting form:', error);
                    this.errorMessage = 'An error occurred. Please try again later.';
                } finally {
                    this.loading = false;
                }
            }
        },
        template: `
            <form @submit.prevent="submitForm" class="space-y-6">
                <div v-if="success" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p class="text-green-800">Thank you! We'll get back to you soon.</p>
                </div>
                
                <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-red-800">{{ errorMessage }}</p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Name *</label>
                    <input v-model="formData.full_name" 
                           type="text" 
                           class="form-input"
                           :class="{ 'border-red-500': errors.full_name }"
                           placeholder="Your name">
                    <p v-if="errors.full_name" class="form-error">{{ errors.full_name }}</p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email *</label>
                    <input v-model="formData.email" 
                           type="email" 
                           class="form-input"
                           :class="{ 'border-red-500': errors.email }"
                           placeholder="your@email.com">
                    <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input v-model="formData.phone" 
                           type="tel" 
                           class="form-input"
                           placeholder="+1 (555) 123-4567">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Subject</label>
                    <input v-model="formData.subject" 
                           type="text" 
                           class="form-input"
                           placeholder="What can we help you with?">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message *</label>
                    <textarea v-model="formData.message" 
                              class="form-textarea"
                              :class="{ 'border-red-500': errors.message }"
                              placeholder="Tell us more about your project..."></textarea>
                    <p v-if="errors.message" class="form-error">{{ errors.message }}</p>
                </div>
                
                <button type="submit" 
                        :disabled="loading"
                        class="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <span v-if="loading" class="spinner"></span>
                    <span>{{ loading ? 'Sending...' : 'Send Message' }}</span>
                </button>
            </form>
        `
    }).mount('#contact-form-app');
}

// PWA Functions
function initPWA() {
    let deferredPrompt;
    const installPrompt = document.getElementById('pwa-install-prompt');
    const installBtn = document.getElementById('pwa-install-btn');
    const dismissBtn = document.getElementById('pwa-dismiss-btn');
    const closeBtn = document.getElementById('pwa-close-btn');
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt after 5 seconds
        setTimeout(() => {
            if (!localStorage.getItem('pwa-dismissed')) {
                installPrompt.classList.remove('hidden');
            }
        }, 5000);
    });
    
    // Install button click
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installPrompt.classList.add('hidden');
            }
        });
    }
    
    // Dismiss button click
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            installPrompt.classList.add('hidden');
            localStorage.setItem('pwa-dismissed', 'true');
        });
    }
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            installPrompt.classList.add('hidden');
        });
    }
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/assets/iwex_website/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

