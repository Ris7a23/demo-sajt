const header = document.querySelector('.header');
const hamburger = document.getElementById('hamburger');
const meniMobile = document.getElementById('meniMobile');
const meniMobileLinks = document.querySelectorAll('.meni-mobile a');

// Scroll event sa throttle-om za bolje performanse
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        scrollTimeout = null;
    }, 10);
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    meniMobile.classList.toggle('active');
});

// Zatvori mobilni meni kada korisnik klikne na link
meniMobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        meniMobile.classList.remove('active');
    });
});

// Zatvori mobilni meni kada korisnik klikne van menija
document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
        hamburger.classList.remove('active');
        meniMobile.classList.remove('active');
    }
});

// GLOBALNI Scroll animacije - Intersection Observer za sve sekcije
const globalObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const globalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Dodaj klasu 'animate' koja će pokrenuti animacije
            entry.target.classList.add('animate');
            globalObserver.unobserve(entry.target);
        }
    });
}, globalObserverOptions);

// Primeni observer na sve sekcije sa 'scroll-section' klasom
const sections = document.querySelectorAll('.hero, .usluge-div, .cenovnik, .hero2, .lokacija, .galerija, .footer');
sections.forEach(section => {
    globalObserver.observe(section);
});

// Galerija - učitavanje više slika
const galerijaLoadBtn = document.getElementById('galerija-load-btn');
const galerijaImages = document.querySelectorAll('.slika-galerija');

if (galerijaLoadBtn) {
    let imagesLoaded = false;
    
    galerijaLoadBtn.addEventListener('click', () => {
        if (!imagesLoaded) {
            // Prikaži sve skrivene slike
            galerijaImages.forEach((img, index) => {
                if (img.classList.contains('hidden')) {
                    img.classList.remove('hidden');
                    img.classList.add('visible');
                    // Animiraj nove slike sa delay-om
                    img.style.animation = `fadeInScale 0.6s ease-out ${0.1 + (index - 4) * 0.1}s forwards`;
                }
            });
            
            // Promeni tekst i strelicu
            galerijaLoadBtn.innerHTML = 'Sakrij radove<span class="galerija-strelica">↑</span>';
            imagesLoaded = true;
        } else {
            // Sakrij dodatne slike
            galerijaImages.forEach((img, index) => {
                if (index >= 4) {
                    img.classList.add('hidden');
                    img.classList.remove('visible');
                    img.style.animation = 'none';
                }
            });
            
            // Promeni tekst i strelicu
            galerijaLoadBtn.innerHTML = 'Učitaj više radova<span class="galerija-strelica">↓</span>';
            imagesLoaded = false;
        }
    });
}

// Footer animacije - Intersection Observer
const footerObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const footer = entry.target;
            // Animacije će se pokrenuti automatski kroz CSS jer imaju opacity: 0 i animation property
            // Ovo jednostavno označava da je footer vidljiv
            footer.classList.add('visible');
            footerObserver.unobserve(footer);
        }
    });
}, footerObserverOptions);

// Primeni observer na footer
const footerSection = document.querySelector('.footer');
if (footerSection) {
    footerObserver.observe(footerSection);
}

// ===== MOBILNE TAP ANIMACIJE =====
// Detektuj mobilni uređaj
const isMobileView = () => window.innerWidth <= 768;

// Dodaj tap animacije na sve dugmići
if (isMobileView()) {
    // Dugmići
    const allButtons = document.querySelectorAll('button, .dugme-lokacija1, .dugme-lokacija2, .galerija-dugme');
    allButtons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.classList.add('tap-active');
        });
        btn.addEventListener('touchend', function() {
            setTimeout(() => this.classList.remove('tap-active'), 300);
        });
        btn.addEventListener('click', function(e) {
            if (e.pointerType !== 'touch') {
                this.classList.add('tap-active');
                setTimeout(() => this.classList.remove('tap-active'), 300);
            }
        });
    });
    
    // Slike
    const images = document.querySelectorAll('.slika-galerija, .kartica');
    images.forEach(img => {
        img.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        img.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // Linkovi
    const links = document.querySelectorAll('a:not([href^="mailto:"]):not([href^="tel:"])');
    links.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}
