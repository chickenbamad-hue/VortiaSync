document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 600);
    }, 800);

    // 2. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if(window.innerWidth > 768 && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, input[type="submit"], .cursor-hover').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 3. Theme Toggle (Optional, defaults to dark)
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));

    // 5. Pricing Toggle
    const priceToggle = document.getElementById('price-toggle');
    if(priceToggle) {
        const prices = document.querySelectorAll('.price-amount');
        const periods = document.querySelectorAll('.price-period');
        priceToggle.addEventListener('change', (e) => {
            const isYearly = e.target.checked;
            prices.forEach(el => {
                const basePrice = parseInt(el.getAttribute('data-base'));
                el.innerText = isYearly ? '£' + Math.floor(basePrice * 0.8) : '£' + basePrice;
            });
            periods.forEach(el => el.innerText = isYearly ? '/mo (billed annually)' : '/mo');
        });
    }

    // 6. Chatbot Logic
    const chatBtn = document.getElementById('chatbot-btn');
    const chatWindow = document.getElementById('chatbot-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    if(chatBtn) {
        chatBtn.addEventListener('click', () => chatWindow.style.display = 'flex');
        closeChat.addEventListener('click', () => chatWindow.style.display = 'none');
        
        const botReply = (msg) => {
            let reply = "I'm the VortiaSync AI assistant. To get precise details, please use our contact form or reach out directly!";
            const lowerMsg = msg.toLowerCase();
            
            if(lowerMsg.includes('price') || lowerMsg.includes('cost')) reply = "Our pricing scales with your needs. Websites start around £500, but check our Pricing page for full details.";
            if(lowerMsg.includes('service') || lowerMsg.includes('do')) reply = "We specialize in custom Website Creation and Business Automation to streamline your operations.";
            if(lowerMsg.includes('macauly')) reply = "Macauly Parsons is our founder! He's dedicated to building tech foundations for modern businesses.";
            if(lowerMsg.includes('time') || lowerMsg.includes('how long')) reply = "Standard web builds take 2-4 weeks depending on complexity. Automations vary by scope.";
            
            setTimeout(() => {
                chatBody.innerHTML += `<div class="message msg-bot">${reply}</div>`;
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 600);
        };

        const handleSend = () => {
            const val = chatInput.value.trim();
            if(!val) return;
            chatBody.innerHTML += `<div class="message msg-user">${val}</div>`;
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
            botReply(val);
        };

        chatSend.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSend(); });
    }
});
