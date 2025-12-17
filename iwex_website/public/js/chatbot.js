// Interactive Chatbot Widget for iWEX Website

(function() {
    'use strict';
    
    let chatbotConfig = null;
    let founderData = null;
    
    // Initialize chatbot
    async function initChatbot() {
        try {
            // Fetch chatbot config from settings
            const response = await fetch('/api/method/iwex_website.api.website.get_website_settings');
            const result = await response.json();
            
            if (result.message && result.message.success) {
                chatbotConfig = result.message.data.chatbot;
                founderData = result.message.data.founder;
                
                if (chatbotConfig.enabled) {
                    createChatbotWidget();
                }
            }
        } catch (error) {
            console.error('Error initializing chatbot:', error);
        }
    }
    
    // Create chatbot widget
    function createChatbotWidget() {
        const chatbotHTML = `
            <div id="chatbot-widget" class="fixed bottom-6 right-6 z-50">
                <!-- Chat Window -->
                <div id="chat-window" class="hidden mb-4 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700">
                    <!-- Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <img src="${founderData.image || '/assets/iwex_website/images/avatar.png'}" alt="${founderData.name}" class="w-12 h-12 rounded-full border-2 border-white object-cover" />
                                <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div class="text-white">
                                <h3 class="font-semibold">iWEX Support</h3>
                                <p class="text-xs text-blue-100">Typically replies instantly</p>
                            </div>
                        </div>
                        <button id="close-chat" class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Messages -->
                    <div id="chat-messages" class="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
                        <div class="flex justify-start">
                            <div class="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 max-w-[80%] px-4 py-3 rounded-2xl shadow-sm">
                                <p class="text-sm whitespace-pre-wrap">${chatbotConfig.greeting}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div id="quick-actions" class="p-4 border-t border-gray-200 dark:border-slate-700 space-y-2">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">How can we help you today?</p>
                        <button data-action="manufacturing" class="quick-action-btn w-full text-left px-4 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span class="mr-2">🏭</span> Manufacturing ERP Solutions
                        </button>
                        <button data-action="hr" class="quick-action-btn w-full text-left px-4 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span class="mr-2">👥</span> HR & Payroll Management
                        </button>
                        <button data-action="pricing" class="quick-action-btn w-full text-left px-4 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span class="mr-2">💰</span> Pricing & Packages
                        </button>
                        <button data-action="demo" class="quick-action-btn w-full text-left px-4 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                            <span class="mr-2">📅</span> Schedule a Demo
                        </button>
                    </div>
                    
                    <!-- Contact Options (initially hidden) -->
                    <div id="contact-options" class="hidden p-4 border-t border-gray-200 dark:border-slate-700 space-y-2">
                        <button id="whatsapp-btn" class="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Continue on WhatsApp
                        </button>
                        <button id="telegram-btn" class="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all hover:scale-105">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                            </svg>
                            Continue on Telegram
                        </button>
                    </div>
                </div>
                
                <!-- Chat Button -->
                <button id="chat-toggle" class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 relative">
                    <svg class="chat-icon w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    <svg class="close-icon w-8 h-8 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    <span id="unread-badge" class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center hidden">1</span>
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        attachChatbotEvents();
        
        // Show notification after 3 seconds
        setTimeout(() => {
            const badge = document.getElementById('unread-badge');
            if (badge) {
                badge.classList.remove('hidden');
            }
        }, 3000);
    }
    
    // Attach event listeners
    function attachChatbotEvents() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const quickActions = document.querySelectorAll('.quick-action-btn');
        const whatsappBtn = document.getElementById('whatsapp-btn');
        const telegramBtn = document.getElementById('telegram-btn');
        const unreadBadge = document.getElementById('unread-badge');
        
        // Toggle chat window
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('hidden');
            const chatIcon = chatToggle.querySelector('.chat-icon');
            const closeIcon = chatToggle.querySelector('.close-icon');
            chatIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            unreadBadge.classList.add('hidden');
        });
        
        // Close chat
        closeChat.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
            const chatIcon = chatToggle.querySelector('.chat-icon');
            const closeIcon = chatToggle.querySelector('.close-icon');
            chatIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
        
        // Quick actions
        quickActions.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                handleQuickAction(action, this.textContent.trim());
            });
        });
        
        // WhatsApp button
        whatsappBtn.addEventListener('click', () => {
            const message = encodeURIComponent('Hi! I found you on iwex.in website. I would like to know more about your ERPNext solutions.');
            window.open(`https://wa.me/${chatbotConfig.whatsapp_business.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
        });
        
        // Telegram button
        telegramBtn.addEventListener('click', () => {
            window.open(`https://t.me/${chatbotConfig.telegram_username.replace('@', '')}`, '_blank');
        });
    }
    
    // Handle quick action clicks
    function handleQuickAction(action, text) {
        const responses = {
            'manufacturing': 'Great choice! We specialize in ERPNext Manufacturing with 150+ successful implementations.\n\nLet me connect you with our expert team.',
            'hr': 'Excellent! As Frappe Certified Consultants for HR & Payroll, we ensure 100% Indian compliance.\n\nLet\'s discuss your requirements.',
            'pricing': 'We offer flexible pricing based on your business needs and modules required.\n\nLet\'s connect to discuss a custom quote.',
            'demo': 'Wonderful! Our live demos showcase real-world ERPNext implementations.\n\nChoose your preferred platform to continue.'
        };
        
        // Add user message
        addMessage('user', text);
        
        // Simulate typing
        setTimeout(() => {
            // Add bot response
            addMessage('bot', responses[action] || 'Thank you for your interest! Let me connect you with our team.');
            
            // Show contact options
            setTimeout(() => {
                document.getElementById('quick-actions').classList.add('hidden');
                document.getElementById('contact-options').classList.remove('hidden');
            }, 500);
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(from, text) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageHTML = `
            <div class="flex ${from === 'bot' ? 'justify-start' : 'justify-end'}">
                <div class="${from === 'bot' ? 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200' : 'bg-blue-600 text-white'} max-w-[80%] px-4 py-3 rounded-2xl shadow-sm">
                    <p class="text-sm whitespace-pre-wrap">${text}</p>
                    <span class="text-xs opacity-70 mt-1 block">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();

