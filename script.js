// ==== MENU RESPONSIVE ====

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav_link');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

// === NAVBAR FIJO ===

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');    
    }
});

// ==== CONTADOR ANIMADO ====
const counters = document.querySelectorAll('.count');
const speed = 150; // velocidad de animación

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText;
            const increment = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

let animated = false;
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    const sectionTop = statsSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;
    if (!animated && sectionTop < triggerPoint) {
        animateCounters();
        animated = true;
    }
});
