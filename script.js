/**
 * 💖 Ultimate Romantic Proposal Website
 * @version 2.0.0
 * @author Love Developer
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
    // Get name from URL parameter or use default
    name: new URLSearchParams(window.location.search).get('name') || 'My Love',
    
    // Heart emojis for effects
    hearts: ['💖', '💕', '💗', '💓', '💝', '💘', '❤️', '🩷', '💜', '🩵'],
    
    // Celebration emojis
    celebrationEmojis: ['💖', '💕', '✨', '🌟', '💫', '🎉', '🦋', '🌸', '💐', '🌹', '🎊', '💝'],
    
    // Escape button texts
    escapeTexts: [
        '💔 Missed!',
        '💔 Too slow!',
        '💔 Try again!',
        '💔 Nope! 😜',
        '💔 Can\'t catch me!',
        '💔 Almost!',
        '💔 Nice try!',
        '💔 Hehe! 😝',
        '💔 Not today!',
        '💔 Keep trying!'
    ],
    
    // Particle settings
    particles: {
        count: 40,
        colors: ['#ff2d75', '#ff6b9d', '#ffc2d1', '#ff85a2']
    },
    
    // Lottie animations
    animations: [
        { id: 'sticker-1', url: 'https://assets2.lottiefiles.com/packages/lf20_t9gkkhz4.json' },
        { id: 'sticker-2', url: 'https://assets5.lottiefiles.com/packages/lf20_qp1spzqv.json' },
        { id: 'sticker-3', url: 'https://assets9.lottiefiles.com/packages/lf20_uwR49r.json' },
        { id: 'sticker-4', url: 'https://assets1.lottiefiles.com/packages/lf20_dpohsucu.json' },
        { id: 'sticker-5', url: 'https://assets4.lottiefiles.com/packages/lf20_u4yrau.json' }
    ],
    
    // Sound effects enabled
    soundEnabled: true,
    
    // Auto-rotate reasons interval (ms)
    reasonsInterval: 3500
};

// ==================== STATE ====================
const state = {
    currentScreen: 1,
    isMusicPlaying: false,
    currentReason: 0,
    currentTheme: 'default'
};

// ==================== DOM ELEMENTS ====================
const elements = {};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', init);

function init() {
    cacheElements();
    setPersonName();
    initPreloader();
    initParticles();
    initFloatingHearts();
    initLottieAnimations();
    initMusicPlayer();
    initEscapeButton();
    initReasonsCarousel();
    initLoveMeters();
    initCursorGlow();
    initQuickActions();
    initStoryDate();
    initMobileOptimizations();
    addEventListeners();
}

function cacheElements() {
    elements.preloader = document.getElementById('preloader');
    elements.mainCard = document.getElementById('main-card');
    elements.screens = document.querySelectorAll('.screen');
    elements.escapeBtn = document.getElementById('escape-btn');
    elements.musicBtn = document.getElementById('music-btn');
    elements.bgMusic = document.getElementById('bg-music');
    elements.musicVisualizer = document.getElementById('music-visualizer');
    elements.musicPlayer = document.getElementById('music-player');
    elements.cursorGlow = document.getElementById('cursor-glow');
    elements.particlesCanvas = document.getElementById('particles-canvas');
    elements.floatingHearts = document.getElementById('floating-hearts');
}

function setPersonName() {
    document.querySelectorAll('.person-name').forEach(el => {
        el.textContent = CONFIG.name;
    });
    
    // Update page title
    document.title = `💖 ${CONFIG.name}, I Have Something Special For You 💖`;
}

// ==================== PRELOADER ====================
function initPreloader() {
    // Hide preloader after animations load
    setTimeout(() => {
        elements.preloader.classList.add('hidden');
        
        // Show music tooltip briefly
        setTimeout(() => {
            elements.musicPlayer.classList.add('show-tooltip');
            setTimeout(() => {
                elements.musicPlayer.classList.remove('show-tooltip');
            }, 3000);
        }, 500);
    }, 2500);
}

// ==================== PARTICLE SYSTEM ====================
function initParticles() {
    const canvas = elements.particlesCanvas;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 250));
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = CONFIG.particles.colors[
                Math.floor(Math.random() * CONFIG.particles.colors.length)
            ];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    for (let i = 0; i < CONFIG.particles.count; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ==================== FLOATING HEARTS ====================
function initFloatingHearts() {
    const container = elements.floatingHearts;
    
    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = CONFIG.hearts[Math.floor(Math.random() * CONFIG.hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${15 + Math.random() * 20}px`;
        heart.style.animationDuration = `${8 + Math.random() * 7}s`;
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Create initial hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 400);
    }
    
    // Continue creating hearts
    setInterval(createHeart, 1500);
}

// ==================== LOTTIE ANIMATIONS ====================
function initLottieAnimations() {
    CONFIG.animations.forEach(anim => {
        const container = document.getElementById(anim.id);
        if (container && typeof lottie !== 'undefined') {
            try {
                lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: anim.url
                });
            } catch (e) {
                // Fallback to emoji
                container.innerHTML = '<div style="font-size:80px;display:flex;justify-content:center;align-items:center;height:100%;">💖</div>';
            }
        }
    });
}

// ==================== NAVIGATION ====================
function navigateTo(screenId) {
    // Play sound
    playSound('pop');
    
    // Create emoji burst
    createEmojiBurst();
    
    // Hide all screens
    elements.screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetId = screenId === 'final' ? 'screen-final' : `screen-${screenId}`;
    const targetScreen = document.getElementById(targetId);
    
    if (targetScreen) {
        targetScreen.classList.add('active');
        state.currentScreen = screenId;
        
        // Animate love meter
        animateLoveMeter(targetScreen);
        
        // Special handling for final screen
        if (screenId === 'final') {
            triggerCelebration();
        }
        
        // Scroll to top on mobile
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Shake card effect
    elements.mainCard.classList.add('shake');
    setTimeout(() => {
        elements.mainCard.classList.remove('shake');
    }, 500);
}

// Make navigateTo globally accessible
window.navigateTo = navigateTo;

// ==================== LOVE METER ANIMATION ====================
function initLoveMeters() {
    // Animate initial love meter
    setTimeout(() => {
        const initialScreen = document.getElementById('screen-1');
        animateLoveMeter(initialScreen);
    }, 500);
}

function animateLoveMeter(screen) {
    const fills = screen.querySelectorAll('.love-meter-fill');
    fills.forEach(fill => {
        const value = fill.dataset.value || 0;
        setTimeout(() => {
            fill.style.width = `${value}%`;
        }, 300);
    });
}

// ==================== CELEBRATION ====================
function triggerCelebration() {
    // Play success sound
    playSound('success');
    
    // Change background
    document.body.style.background = 'linear-gradient(135deg, #fff0f5 0%, #ffe4f0 50%, #ffd6e8 100%)';
    
    // Confetti burst
    const duration = 6000;
    const end = Date.now() + duration;
    const colors = ['#ff2d75', '#ff6b9d', '#ffc2d1', '#ff85a2', '#ffd700'];
    
    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
    
    // Big burst
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: colors
        });
    }, 300);
    
    // Heart rain
    createHeartRain();
}

function createHeartRain() {
    const hearts = CONFIG.hearts;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = '-50px';
            heart.style.fontSize = `${20 + Math.random() * 25}px`;
            heart.style.animationDuration = `${2 + Math.random() * 2}s`;
            
            elements.floatingHearts.appendChild(heart);
            
            setTimeout(() => heart.remove(), 4000);
        }, i * 100);
    }
}

function createEmojiBurst() {
    const emojis = CONFIG.celebrationEmojis;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const emoji = document.createElement('span');
            emoji.className = 'emoji-burst';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = `${35 + Math.random() * 30}%`;
            emoji.style.top = `${40 + Math.random() * 20}%`;
            
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 1500);
        }, i * 60);
    }
}

// ==================== ESCAPE BUTTON ====================
function initEscapeButton() {
    const btn = elements.escapeBtn;
    if (!btn) return;
    
    const moveButton = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const btnRect = btn.getBoundingClientRect();
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;
        
        let newX, newY;
        let attempts = 0;
        
        do {
            newX = Math.random() * maxX + 10;
            newY = Math.random() * maxY + 10;
            attempts++;
        } while (
            attempts < 10 &&
            Math.abs(newX - btnRect.left) < 150 &&
            Math.abs(newY - btnRect.top) < 150
        );
        
        btn.style.position = 'fixed';
        btn.style.left = `${newX}px`;
        btn.style.top = `${newY}px`;
        btn.style.zIndex = '2000';
        btn.style.margin = '0';
        
        // Change button text
        const textSpan = btn.querySelector('.btn-text');
        if (textSpan) {
            textSpan.textContent = CONFIG.escapeTexts[
                Math.floor(Math.random() * CONFIG.escapeTexts.length)
            ];
        }
        
        // Create mini burst
        createEmojiBurst();
        
        // Play sound
        playSound('pop');
    };
    
    // Desktop events
    btn.addEventListener('mouseenter', moveButton);
    btn.addEventListener('click', moveButton);
    
    // Mobile events
    btn.addEventListener('touchstart', moveButton, { passive: false });
    btn.addEventListener('touchmove', (e) => {
        e.preventDefault();
        moveButton(e);
    }, { passive: false });
}

// ==================== REASONS CAROUSEL ====================
function initReasonsCarousel() {
    const dots = document.querySelectorAll('.reason-dot');
    const reasons = document.querySelectorAll('.reason');
    
    if (!dots.length || !reasons.length) return;
    
    function showReason(index) {
        reasons.forEach((r, i) => {
            r.classList.toggle('active', i === index);
        });
        
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        
        state.currentReason = index;
    }
    
    // Click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showReason(index));
    });
    
    // Auto-rotate
    setInterval(() => {
        const nextIndex = (state.currentReason + 1) % reasons.length;
        showReason(nextIndex);
    }, CONFIG.reasonsInterval);
}

// ==================== MUSIC PLAYER ====================
function initMusicPlayer() {
    const btn = elements.musicBtn;
    const audio = elements.bgMusic;
    const visualizer = elements.musicVisualizer;
    
    if (!btn || !audio) return;
    
    btn.addEventListener('click', () => {
        if (state.isMusicPlaying) {
            audio.pause();
            btn.querySelector('.music-icon').textContent = '🎵';
            btn.classList.remove('playing');
            visualizer.classList.remove('active');
        } else {
            audio.play().catch(e => {
                console.log('Audio autoplay blocked:', e);
            });
            btn.querySelector('.music-icon').textContent = '🔊';
            btn.classList.add('playing');
            visualizer.classList.add('active');
        }
        
        state.isMusicPlaying = !state.isMusicPlaying;
    });
    
    // Handle audio errors
    audio.addEventListener('error', () => {
        console.log('Audio failed to load');
    });
}

// ==================== CURSOR GLOW ====================
function initCursorGlow() {
    const glow = elements.cursorGlow;
    if (!glow || isTouchDevice()) return;
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
}

// ==================== QUICK ACTIONS ====================
function initQuickActions() {
    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(e => {});
            } else {
                document.exitFullscreen();
            }
        });
    }
    
    // Theme button
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        const themes = ['default', 'purple', 'blue', 'golden'];
        
        themeBtn.addEventListener('click', () => {
            const currentIndex = themes.indexOf(state.currentTheme);
            const nextIndex = (currentIndex + 1) % themes.length;
            const nextTheme = themes[nextIndex];
            
            // Remove current theme
            document.body.classList.remove(`theme-${state.currentTheme}`);
            
            // Add new theme
            if (nextTheme !== 'default') {
                document.body.classList.add(`theme-${nextTheme}`);
            }
            
            state.currentTheme = nextTheme;
            
            // Visual feedback
            createEmojiBurst();
        });
    }
}

// ==================== STORY DATE ====================
function initStoryDate() {
    const dateEl = document.getElementById('story-date');
    if (dateEl) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
}

// ==================== MOBILE OPTIMIZATIONS ====================
function initMobileOptimizations() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    // Fix iOS height
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', debounce(setVH, 100));
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(setVH, 100);
    });
}

// ==================== EVENT LISTENERS ====================
function addEventListeners() {
    // GSAP animations for decorations
    if (typeof gsap !== 'undefined') {
        gsap.to('.decoration', {
            y: -12,
            duration: 2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            stagger: 0.2
        });
    }
    
    // Easter egg - click card multiple times
    let clickCount = 0;
    elements.mainCard.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
        
        clickCount++;
        if (clickCount >= 8) {
            clickCount = 0;
            triggerSecretEffect();
        }
    });
}

function triggerSecretEffect() {
    // Secret heart explosion
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 8,
                spread: 360,
                startVelocity: 15,
                origin: { x: 0.5, y: 0.5 },
                colors: CONFIG.particles.colors
            });
        }, i * 40);
    }
}

// ==================== SOUND EFFECTS ====================
function playSound(type) {
    if (!CONFIG.soundEnabled) return;
    
    const soundId = type === 'pop' ? 'sound-pop' : 'sound-success';
    const audio = document.getElementById(soundId);
    
    if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }
}

// ==================== SHARE FUNCTIONALITY ====================
function shareExperience() {
    if (navigator.share) {
        navigator.share({
            title: '💖 I Said Yes!',
            text: `${CONFIG.name} and I are now together! 💕`,
            url: window.location.href
        }).catch(() => {});
    } else {
        // Fallback - copy URL
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied! Share this moment with everyone! 💖');
        }).catch(() => {
            alert('Share this beautiful moment! 💖');
        });
    }
}

window.shareExperience = shareExperience;

// ==================== UTILITY FUNCTIONS ====================
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

function isTouchDevice() {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// ==================== CSS SHAKE ANIMATION ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
    .shake {
        animation: shake 0.5s ease;
    }
`;
document.head.appendChild(style);

// ==================== CONSOLE EASTER EGG ====================
console.log('%c💖 Made with Love 💖', 
    'font-size: 24px; color: #ff2d75; font-weight: bold;');
console.log('%cThis proposal was crafted with care for ' + CONFIG.name, 
    'font-size: 14px; color: #ff6b9d;');
