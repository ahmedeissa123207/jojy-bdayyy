// Celebrate function with confetti animation
function celebrate() {
    createConfetti();
    playSound();
}

// Enter another world: celebrate then redirect
function enterWorld() {
    celebrate();
    setTimeout(() => {
        window.location.href = 'world.html';
    }, 600);
}

// Create confetti pieces
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#b19cd9', '#f093fb'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
            confetti.remove();
        }, 4500);
    }
}

// Simple sound effect (using Web Audio API)
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Countdown to next birthday (March 30)
function updateCountdown() {
    // Set birthday to March 30
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), 2, 30); // March 30 (month is 0-indexed, so 2 = March)
    
    // If March 30 has already passed this year, set it for next year
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, 2, 30);
    }
    
    setInterval(() => {
        const now = new Date();
        const timeDifference = nextBirthday - now;
        
        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            document.getElementById('timer').textContent = 
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            document.getElementById('timer').textContent = 'Happy Birthday! 🎉';
        }
    }, 1000);
}

// Initialize countdown when page loads
window.addEventListener('load', updateCountdown);
