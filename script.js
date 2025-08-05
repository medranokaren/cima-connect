 // ========== MENÚ LATERAL ==========
function toggleMenu() {
  const sidebar = document.getElementById("sidebar") || document.getElementById("mobileMenu");
  sidebar.classList.toggle("active");
}


function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('show');
}




// ========== CARRUSEL ==========
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

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

// ========== SUBMENÚ ==========
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

// ========== ACORDEÓN ==========
document.querySelectorAll('.acordeon-boton').forEach((boton) => {
  boton.addEventListener('click', function () {
    const item = this.parentElement;
    const estaActivo = item.classList.contains('activo');
    document.querySelectorAll('.acordeon-item').forEach((i) => i.classList.remove('activo'));
    if (!estaActivo) item.classList.add('activo');
  });
});

// ========== CAMBIO DE IDIOMA ==========
// 1. Mostrar inglés por defecto al cargar
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.es').forEach((el) => el.style.display = 'none');
  document.querySelectorAll('.en').forEach((el) => el.style.display = 'inline');
});

// 2. Función para alternar idioma manualmente
function toggleLang() {
  const isSpanish = document.querySelector('.es').style.display !== 'none';
  document.querySelectorAll('.es').forEach((el) => {
    el.style.display = isSpanish ? 'none' : 'inline';
  });
  document.querySelectorAll('.en').forEach((el) => {
    el.style.display = isSpanish ? 'inline' : 'none';
  });
}

// ========== EFECTO SCROLL MOBILE ==========
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

// ========== EFECTO ENTRADA SLIDE ==========
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

// ========== EFECTO DE CUADROS ENTRANDO ==========
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

// ========== IMAGEN SERVICIO ==========
function mostrarImagen(imagen) {
  document.getElementById("imagen-servicio").src = imagen;
}

// ========== REDIRECCIÓN BOTONES AGENDAR ==========
document.querySelectorAll('.btn-agendar').forEach(button => {
  button.addEventListener('click', () => {
    window.location.href = 'agenda.html';
  });
});

// ========== CAMBIO DE SECCIÓN EN AGENDA ==========
function showSection(sectionId) {
  ['proyecto', 'reparacion', 'completo'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// ========== CANVAS DE PUNTITOS ==========
const canvas = document.getElementById("backgroundCanvas");
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
