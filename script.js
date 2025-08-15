 // == MENÚ LATERAL ==
function toggleMenu() {
  const sidebar = document.getElementById("sidebar") || document.getElementById("mobileMenu");
  sidebar.classList.toggle("active");
}
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('show');
}
// == CARRUSEL ==
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
if (slides.length > 0) {
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) slide.classList.add("active");
        });
    }
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}
// == SUBMENÚ ==
function openSubMenu(id) {
  document.querySelectorAll(".submenu, .subsubmenu").forEach(el => {
    el.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
function goBack() {
  document.querySelectorAll(".submenu, .subsubmenu").forEach(el => {
    el.style.display = "none";
  });
  document.getElementById("repairs").style.display = "block";
}
function goBackTo(id) {
  document.querySelectorAll(".submenu, .subsubmenu").forEach(el => {
    el.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
// == ACORDEÓN ==
document.querySelectorAll('.acordeon-boton').forEach((boton) => {
  boton.addEventListener('click', function () {
    const item = this.parentElement;
    const estaActivo = item.classList.contains('activo');
    document.querySelectorAll('.acordeon-item').forEach((i) => i.classList.remove('activo'));
    if (!estaActivo) item.classList.add('activo');
  });
});
// == CAMBIO DE IDIOMA ==
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.es').forEach((el) => el.style.display = 'none');
  document.querySelectorAll('.en').forEach((el) => el.style.display = 'inline');
});
function toggleLang() {
  const isSpanish = document.querySelector('.es').style.display !== 'none';
  document.querySelectorAll('.es').forEach((el) => {
    el.style.display = isSpanish ? 'none' : 'inline';
  });
  document.querySelectorAll('.en').forEach((el) => {
    el.style.display = isSpanish ? 'inline' : 'none';
  });
}
// == EFECTO SCROLL MOBILE ==
function mostrarBloquesScroll() {
  const bloques = document.querySelectorAll('.servicio-bloque');
  const trigger = window.innerHeight * 0.85;
  bloques.forEach((bloque) => {
    const top = bloque.getBoundingClientRect().top;
    if (top < trigger) bloque.classList.add('visible');
  });
}
window.addEventListener('scroll', mostrarBloquesScroll);
window.addEventListener('load', mostrarBloquesScroll);
// == EFECTO ENTRADA SLIDE ==
document.addEventListener("DOMContentLoaded", function () {
  const slideSections = document.querySelectorAll(".slide-in-section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.isIntersecting
        ? entry.target.classList.add("visible")
        : entry.target.classList.remove("visible");
    });
  }, { threshold: 0.2 });
  slideSections.forEach(section => observer.observe(section));
});
// == EFECTO DE CUADROS ENTRANDO ==
document.addEventListener("DOMContentLoaded", function () {
  const featureBoxes = document.querySelectorAll(".feature-box");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.isIntersecting
        ? entry.target.classList.add("visible")
        : entry.target.classList.remove("visible");
    });
  }, { threshold: 0.2 });
  featureBoxes.forEach(box => observer.observe(box));
});
// == IMAGEN SERVICIO ==
function mostrarImagen(imagen) {
  document.getElementById("imagen-servicio").src = imagen;
}
// == REDIRECCIÓN BOTONES AGENDAR ==
document.querySelectorAll('.btn-agendar').forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'agenda.html';
  });
});
// == CAMBIO DE SECCIÓN EN AGENDA (AHORA OBSOLETO, PERO LO DEJAMOS POR SI ACASO) ==
function showSection(sectionId) {
  ['proyecto', 'reparacion', 'completo'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
  });
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) sectionElement.style.display = 'block';
}
// == CANVAS DE PUNTITOS ==
const canvas = document.getElementById("backgroundCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray = [];
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = "#183471ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function initParticles() {
      particlesArray = [];
      for (let i = 0; i < 120; i++) {
        particlesArray.push(new Particle());
      }
    }
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    });
    initParticles();
    animateParticles();
}


// ==========================================================
// == NUEVO CÓDIGO PARA ENVIAR EL FORMULARIO A TU BACKEND ==
// ==========================================================

// Buscamos el formulario solo si existe en la página actual
const serviceForm = document.getElementById('service-form');

if (serviceForm) {
    serviceForm.addEventListener('submit', function (event) {
        // 1. Evitamos que la página se recargue
        event.preventDefault();

        // 2. Recoger los datos del formulario usando los IDs que pusimos
        const ticketData = {
            clientName: document.getElementById('clientName').value,
            clientEmail: document.getElementById('clientEmail').value,
            clientPhone: document.getElementById('clientPhone').value,
            serviceType: document.getElementById('serviceType').value,
            description: document.getElementById('description').value
        };

        // 3. Definir la URL de tu API (¡Asegúrate de que el backend esté ejecutándose!)
        // El puerto (ej: 7081) debe ser el mismo que aparece cuando ejecutas tu proyecto en Visual Studio
        const apiUrl = 'https://cimaconnect-cmd9hpf6abcrcngq.westcentralus-01.azurewebsites.net/api/Tickets'; 

        // 4. Mostrar un mensaje de "Enviando..." al usuario
        const submitButton = serviceForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // 5. Enviar los datos al backend
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })
        .then(response => {
            if (!response.ok) {
                // Si el backend responde con un error (ej: 500)
                throw new Error('Respuesta del servidor no fue exitosa.');
            }
            return response.json();
        })
        .then(data => {
            // ¡Éxito! El backend respondió correctamente.
            alert('¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.');
            serviceForm.reset(); // Limpiar el formulario
            submitButton.disabled = false;
            submitButton.textContent = 'Submit request'; // O 'Enviar solicitud' si quieres manejar el idioma
        })
        .catch(error => {
            // Si algo salió mal (ej: el backend no está encendido o hay un error de red)
            console.error('Error al enviar el ticket:', error);
            alert('Hubo un problema al enviar tu solicitud. Por favor, revisa tu conexión e inténtalo de nuevo.');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit request';
        });
    });
}
