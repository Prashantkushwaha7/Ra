// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Surprise functionality
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const surpriseBox = document.getElementById('surprise-box');
    const wishesModal = document.getElementById('wishes-modal');
    const closeModal = document.getElementById('close-modal');

    // Show surprise overlay on page load
    surpriseOverlay.style.display = 'flex';

    // Handle surprise box click
    surpriseBox.addEventListener('click', function() {
        surpriseOverlay.classList.add('hidden');
        wishesModal.style.display = 'flex';
        
        // Add some sparkle effect
        createSparkles();
    });

    // Handle close modal
    closeModal.addEventListener('click', function() {
        wishesModal.style.display = 'none';
        surpriseOverlay.classList.remove('hidden');
    });

    // Handle gift button
    const giftBtn = document.getElementById('gift-btn');
    giftBtn.addEventListener('click', function() {
        wishesModal.style.display = 'none';
        surpriseOverlay.style.display = 'none';
        
        // Smooth scroll to gallery section
        const gallerySection = document.getElementById('gallery');
        if (gallerySection) {
            const offsetTop = gallerySection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });



    // Close modal when clicking outside
    wishesModal.addEventListener('click', function(e) {
        if (e.target === wishesModal) {
            wishesModal.style.display = 'none';
            surpriseOverlay.classList.remove('hidden');
        }
    });

    // Create sparkle effect function
    function createSparkles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'fixed';
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = Math.random() * window.innerHeight + 'px';
                sparkle.style.fontSize = '2rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '10001';
                sparkle.style.animation = 'sparkle 2s ease-in-out forwards';
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 2000);
            }, i * 100);
        }
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add animation on scroll for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to floating elements
    const floatingElements = document.querySelectorAll('.floating-rakhi');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // Add confetti effect when surprise is clicked
    function createConfetti() {
        const colors = ['#e91e63', '#ff6b9d', '#ffd700', '#667eea', '#764ba2'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '10001';
                confetti.style.animation = 'confettiFall 3s linear forwards';
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }

    // Add confetti animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Trigger confetti when surprise is clicked
    surpriseBox.addEventListener('click', createConfetti);

    // Audio functionality for photos
    const photoItems = document.querySelectorAll('.photo-item');
    let currentlyPlaying = null;

    photoItems.forEach(photoItem => {
        const audio = photoItem.querySelector('.photo-audio');
        
        photoItem.addEventListener('mouseenter', function() {
            // Stop any currently playing audio
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }
            
            // Play the audio for this photo
            audio.play();
            currentlyPlaying = audio;
        });
        
        photoItem.addEventListener('mouseleave', function() {
            // Pause the audio when mouse leaves
            audio.pause();
            audio.currentTime = 0;
            currentlyPlaying = null;
        });
    });

    // Add click functionality to photos for mobile devices
    photoItems.forEach(photoItem => {
        const audio = photoItem.querySelector('.photo-audio');
        
        photoItem.addEventListener('click', function() {
            if (audio.paused) {
                // Stop any currently playing audio
                if (currentlyPlaying && currentlyPlaying !== audio) {
                    currentlyPlaying.pause();
                    currentlyPlaying.currentTime = 0;
                }
                
                audio.play();
                currentlyPlaying = audio;
                
                // Add visual feedback
                photoItem.style.transform = 'translateY(-10px) scale(1.05)';
                setTimeout(() => {
                    photoItem.style.transform = '';
                }, 200);
            } else {
                audio.pause();
                audio.currentTime = 0;
                currentlyPlaying = null;
            }
        });
    });
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (name && email && message) {
        // Show success message
        showNotification('Thank you for your wishes! ❤️', 'success');
        this.reset();
    } else {
        showNotification('Please fill in all fields!', 'error');
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4CAF50, #45a049)' : 'linear-gradient(45deg, #f44336, #da190b)'};
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
    
    // Initialize floating elements
    animateFloatingElements();
    
    // WhatsApp functionality for Send Wishes button
    const sendWishesBtn = document.getElementById('send-wishes-btn');
    if (sendWishesBtn) {
        sendWishesBtn.addEventListener('click', function() {
            const whatsappUrl = 'https://wa.me/message/37536FYITCL7E1?src=qr';
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add some interactive hover effects
document.querySelectorAll('.gallery-card, .wish-card, .feature').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Countdown timer for Raksha Bandhan (example date)
function updateCountdown() {
    const now = new Date();
    const rakshaBandhan = new Date('2024-08-19'); // Example date
    const timeLeft = rakshaBandhan - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // You can add a countdown display element to show this
        console.log(`${days}d ${hours}h ${minutes}m ${seconds}s until Raksha Bandhan!`);
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add some sparkle effects
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: sparkle-fall 3s linear forwards;
    `;
    
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = '-20px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create sparkles periodically
setInterval(createSparkle, 2000);

// Add some music or sound effects (optional)
function playBackgroundMusic() {
    // This would require an audio file
    // const audio = new Audio('path/to/background-music.mp3');
    // audio.loop = true;
    // audio.volume = 0.3;
    // audio.play();
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    console.log('🎀 Raksha Bandhan Website Loaded Successfully! 🎀');
    
    // Add some final touches
    document.body.style.overflowX = 'hidden';
    
    // Add a subtle pulse to the main title
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.style.animation = 'pulse 3s ease-in-out infinite';
    }
}); 