// Smooth Scroll para enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar menú móvil si está abierto
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Ejecutar al cargar la página

// Acordeón de Servicios
const serviceToggles = document.querySelectorAll('.service-toggle');

serviceToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const serviceCard = toggle.closest('.service-card');
        const serviceDetails = serviceCard.querySelector('.service-details');
        
        // Toggle active class
        toggle.classList.toggle('active');
        serviceDetails.classList.toggle('active');
    });
});

// Counter Animation para estadísticas
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observer para activar contadores cuando sean visibles
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// Carrusel de Testimonios
const testimonialTrack = document.getElementById('testimonialTrack');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

const showSlide = (index) => {
    // Asegurar que el índice esté en rango
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Ocultar todos los slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Mostrar slide actual
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
};

const nextSlide = () => {
    showSlide(currentSlide + 1);
};

const prevSlide = () => {
    showSlide(currentSlide - 1);
};

// Event listeners para botones
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Event listeners para dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play del carrusel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play al hacer hover
const carousel = document.querySelector('.testimonial-carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// Validación del Formulario
const contactForm = document.getElementById('contactForm');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const telefonoInput = document.getElementById('telefono');
const servicioInput = document.getElementById('servicio');
const mensajeInput = document.getElementById('mensaje');
const formSuccess = document.getElementById('formSuccess');

// Funciones de validación
const validateNombre = () => {
    const nombre = nombreInput.value.trim();
    const errorElement = document.getElementById('nombreError');
    
    if (nombre === '') {
        errorElement.textContent = 'El nombre es requerido';
        nombreInput.style.borderColor = '#e74c3c';
        return false;
    } else if (nombre.length < 3) {
        errorElement.textContent = 'El nombre debe tener al menos 3 caracteres';
        nombreInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.textContent = '';
        nombreInput.style.borderColor = '#2ecc71';
        return true;
    }
};

const validateEmail = () => {
    const email = emailInput.value.trim();
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        errorElement.textContent = 'El email es requerido';
        emailInput.style.borderColor = '#e74c3c';
        return false;
    } else if (!emailRegex.test(email)) {
        errorElement.textContent = 'Ingresa un email válido';
        emailInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.textContent = '';
        emailInput.style.borderColor = '#2ecc71';
        return true;
    }
};

const validateTelefono = () => {
    const telefono = telefonoInput.value.trim();
    const errorElement = document.getElementById('telefonoError');
    const telefonoRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (telefono === '') {
        errorElement.textContent = 'El teléfono es requerido';
        telefonoInput.style.borderColor = '#e74c3c';
        return false;
    } else if (!telefonoRegex.test(telefono) || telefono.length < 10) {
        errorElement.textContent = 'Ingresa un teléfono válido';
        telefonoInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.textContent = '';
        telefonoInput.style.borderColor = '#2ecc71';
        return true;
    }
};

const validateServicio = () => {
    const servicio = servicioInput.value;
    const errorElement = document.getElementById('servicioError');
    
    if (servicio === '') {
        errorElement.textContent = 'Selecciona un servicio';
        servicioInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.textContent = '';
        servicioInput.style.borderColor = '#2ecc71';
        return true;
    }
};

const validateMensaje = () => {
    const mensaje = mensajeInput.value.trim();
    const errorElement = document.getElementById('mensajeError');
    
    if (mensaje === '') {
        errorElement.textContent = 'El mensaje es requerido';
        mensajeInput.style.borderColor = '#e74c3c';
        return false;
    } else if (mensaje.length < 10) {
        errorElement.textContent = 'El mensaje debe tener al menos 10 caracteres';
        mensajeInput.style.borderColor = '#e74c3c';
        return false;
    } else {
        errorElement.textContent = '';
        mensajeInput.style.borderColor = '#2ecc71';
        return true;
    }
};

// Event listeners para validación en tiempo real
nombreInput.addEventListener('blur', validateNombre);
nombreInput.addEventListener('input', () => {
    if (nombreInput.value.trim() !== '') {
        validateNombre();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() !== '') {
        validateEmail();
    }
});

telefonoInput.addEventListener('blur', validateTelefono);
telefonoInput.addEventListener('input', () => {
    if (telefonoInput.value.trim() !== '') {
        validateTelefono();
    }
});

servicioInput.addEventListener('change', validateServicio);
mensajeInput.addEventListener('blur', validateMensaje);
mensajeInput.addEventListener('input', () => {
    if (mensajeInput.value.trim() !== '') {
        validateMensaje();
    }
});

// Manejo del envío del formulario
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar todos los campos
    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isTelefonoValid = validateTelefono();
    const isServicioValid = validateServicio();
    const isMensajeValid = validateMensaje();
    
    if (isNombreValid && isEmailValid && isTelefonoValid && isServicioValid && isMensajeValid) {
        // Simular envío exitoso
        formSuccess.textContent = '¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.';
        formSuccess.classList.add('show');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Limpiar estilos de validación
        [nombreInput, emailInput, telefonoInput, servicioInput, mensajeInput].forEach(input => {
            input.style.borderColor = '';
        });
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
        
        // Scroll suave al mensaje de éxito
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // Scroll al primer campo con error
        const firstError = contactForm.querySelector('.error-message:not(:empty)');
        if (firstError) {
            firstError.previousElementSibling.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.previousElementSibling.focus();
        }
    }
});

// Efecto parallax suave en hero (opcional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que el primer slide esté visible
    showSlide(0);
    
    // Activar animaciones iniciales
    revealOnScroll();
});

