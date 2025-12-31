// Hover / focus-based nav open/close
const menu = document.getElementById('navMenu');
const menuIcon = document.querySelector('.menu-icon');

function openMenu() {
    if (!menu.classList.contains('open')) {
        menu.classList.add('open');
        menuIcon.setAttribute('aria-expanded', 'true');
    }
}

function closeMenu() {
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
}

let leaveTimer;
function handleLeave() {
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => {
        const iconHovered = menuIcon.matches(':hover');
        const menuHovered = menu.matches(':hover');
        const menuFocused = menu.contains(document.activeElement);
        const iconFocused = (document.activeElement === menuIcon);

        if (!iconHovered && !menuHovered && !menuFocused && !iconFocused) {
            closeMenu();
        }
    }, 80); // small delay to avoid flicker
}

// Keep menu open when hovering icon or nav
menuIcon.addEventListener('mouseenter', openMenu);
menu.addEventListener('mouseenter', openMenu);

// Close when leaving both
menuIcon.addEventListener('mouseleave', handleLeave);
menu.addEventListener('mouseleave', handleLeave);

// Accessibility: open on focus, close on blur/out
menuIcon.addEventListener('focus', openMenu);
menuIcon.addEventListener('blur', handleLeave);
menu.addEventListener('focusin', openMenu);
menu.addEventListener('focusout', handleLeave);

// Click outside to close
document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        closeMenu();
    }
});

// Scroll animation for character (unchanged)
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const characterContainer = document.getElementById('characterContainer');
    const characterImg = document.getElementById('characterImg');

    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.min(scrollTop / window.innerHeight, 1);

    // Animate character based on scroll
    if (scrollProgress > 0.3) {
        characterContainer.classList.add('scrolled');
        // Change to full body image
        characterImg.src = 'Images/character-full.jpg';
    } else {
        characterContainer.classList.remove('scrolled');
        // Change back to upper body image
        characterImg.src = 'Images/character-upper.png';
    }

    lastScrollTop = scrollTop;
});