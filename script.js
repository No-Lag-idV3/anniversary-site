// Get elements
const openLetterBtn = document.getElementById('openLetter');
const letterSection = document.getElementById('letterSection');
const bgMusic = document.getElementById('bgMusic');

// Set initial volume
bgMusic.volume = 0;

// Flag to prevent multiple plays
let letterOpened = false;

// Open letter section and play music with fade-in
openLetterBtn.addEventListener('click', () => {
    if (!letterOpened) {
        letterOpened = true;
        letterSection.classList.remove('hidden');
        letterSection.scrollIntoView({ behavior: 'smooth' });
        bgMusic.play();
        fadeInMusic();
        openLetterBtn.style.display = 'none'; // Hide button after opening
    }
});

// Function to fade in music
function fadeInMusic() {
    let volume = 0;
    const targetVolume = 0.4;
    const fadeInterval = setInterval(() => {
        if (volume < targetVolume) {
            volume += 0.01;
            bgMusic.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 50);
}

// Trigger heartbeat animation when letter opens
function triggerHeartbeat() {
    const heart = document.querySelector('.heartbeat-heart');
    heart.style.animation = 'none';
    setTimeout(() => {
        heart.style.animation = 'heartbeat 1s ease-in-out 3';
    }, 10);
}

// Scroll reveal for hidden message and ending flow
function handleScroll() {
    const letterContent = document.querySelector('.letter-content');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const finalWords = document.getElementById('finalWords');
    const lastLine = document.querySelector('.last-line');
    const rect = letterContent.getBoundingClientRect();
    const bottom = rect.bottom;
    const top = rect.top;

    // Letter ending slowdown
    if (bottom <= window.innerHeight * 1.5) {
        document.querySelector('.letter-frame').classList.add('slowdown');
        document.querySelectorAll('.photo').forEach(photo => photo.classList.add('settle'));
    }

    // Hidden message reveal
    if (bottom <= window.innerHeight && !hiddenMessage.classList.contains('revealed')) {
        hiddenMessage.classList.add('revealed');
        // Soften music
        bgMusic.volume = 0.2;
        // Reveal final words after delay
        setTimeout(() => {
            finalWords.classList.add('revealed');
            setTimeout(() => {
                lastLine.classList.add('revealed');
                // Final stillness
                document.querySelectorAll('.photo').forEach(photo => photo.style.animation = 'none');
                document.querySelector('.letter-frame').style.animation = 'frameGlow 10s ease-in-out infinite';
            }, 1000);
        }, 1500);
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Update open letter function to trigger heartbeat
openLetterBtn.addEventListener('click', () => {
    if (!letterOpened) {
        letterOpened = true;
        letterSection.classList.remove('hidden');
        letterSection.scrollIntoView({ behavior: 'smooth' });
        bgMusic.play();
        fadeInMusic();
        triggerHeartbeat();
        openLetterBtn.style.display = 'none'; // Hide button after opening
    }
});
