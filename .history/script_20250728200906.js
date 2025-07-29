 // Mostrar/Ocultar menú lateral
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

// Cambiar idioma ES/EN
function toggleLang() {
  const spanishElements = document.querySelectorAll(".es");
  const englishElements = document.querySelectorAll(".en");

  spanishElements.forEach(el => {
    el.style.display = (el.style.display === "none") ? "inline" : "none";
  });

  englishElements.forEach(el => {
    el.style.display = (el.style.display === "none") ? "inline" : "none";
  });
}

// Mostrar submenú
function openSubMenu(id) {
  document.querySelectorAll(".submenu, .subsubmenu").forEach(el => {
    el.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// Volver al submenú anterior
function goBack() {
  document.querySelectorAll(".submenu, .subsubmenu").forEach(el => {
    el.style.display = "none";
  });
  document.getElementById("repairs").style.display = "block";
}

// Volver a menú específico
function goBackTo(id) {
  document.querySelectorAll(".submenu, .subsubmenu").forEach(el => {
    el.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("active");
}











 



function mostrarImagen(imagen) {
  document.getElementById("imagen-servicio").src = imagen;
}
// Funcionalidad de acordeón
document.querySelectorAll('.acordeon-boton').forEach((boton) => {
  boton.addEventListener('click', function () {
    const item = this.parentElement;
    const estaActivo = item.classList.contains('activo');

    // Cierra todos los items
    document.querySelectorAll('.acordeon-item').forEach((i) => {
      i.classList.remove('activo');
    });

    // Abre solo el que se clickeó (si no estaba abierto)
    if (!estaActivo) {
      item.classList.add('activo');
    }
  });
});

// Cambio de imagen
function mostrarImagen(src) {
  document.getElementById('imagen-servicio').src = src;
}






// ========== CAMBIO DE IDIOMA ========== //
function toggleLang() {
  const isSpanish = document.querySelector('.es').style.display !== 'none';

  document.querySelectorAll('.es').forEach((el) => {
    el.style.display = isSpanish ? 'none' : 'inline';
  });

  document.querySelectorAll('.en').forEach((el) => {
    el.style.display = isSpanish ? 'inline' : 'none';
  });
}

// ========== EFECTO SCROLL EN MÓVIL ========== //
function mostrarBloquesScroll() {
  const bloques = document.querySelectorAll('.servicio-bloque');
  const trigger = window.innerHeight * 0.85;

  bloques.forEach((bloque) => {
    const top = bloque.getBoundingClientRect().top;
    if (top < trigger) {
      bloque.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', mostrarBloquesScroll);
window.addEventListener('load', mostrarBloquesScroll);

// Funcionalidad de acordeón
document.querySelectorAll('.acordeon-boton').forEach((boton) => {
  boton.addEventListener('click', function () {
    const item = this.parentElement;
    const estaActivo = item.classList.contains('activo');

    // Cierra todos los items
    document.querySelectorAll('.acordeon-item').forEach((i) => {
      i.classList.remove('activo');
    });

    // Abre solo el que se clickeó (si no estaba abierto)
    if (!estaActivo) {
      item.classList.add('activo');
    }
  });
});

// Cambio de idioma (opcional, si tienes botón de idioma con id="langToggle")
const langToggle = document.getElementById('langToggle');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const isSpanish = document.querySelector('.es').style.display !== 'none';

    document.querySelectorAll('.es').forEach((el) => {
      el.style.display = isSpanish ? 'none' : 'inline';
    });

    document.querySelectorAll('.en').forEach((el) => {
      el.style.display = isSpanish ? 'inline' : 'none';
    });
  });
}




































// ========== ACORDEÓN (pagina reparaciones) ========== //
document.querySelectorAll('.acordeon-boton').forEach((boton) => {
  boton.addEventListener('click', function () {
    const item = this.parentElement;
    const estaActivo = item.classList.contains('activo');

    // Cierra todos los items
    document.querySelectorAll('.acordeon-item').forEach((i) => {
      i.classList.remove('activo');
    });

    // Abre solo el que se clickeó (si no estaba abierto)
    if (!estaActivo) {
      item.classList.add('activo');
    }
  });
});

// ========== CAMBIO DE IDIOMA ========== //
function toggleLang() {
  const isSpanish = document.querySelector('.es').style.display !== 'none';

  document.querySelectorAll('.es').forEach((el) => {
    el.style.display = isSpanish ? 'none' : 'inline';
  });

  document.querySelectorAll('.en').forEach((el) => {
    el.style.display = isSpanish ? 'inline' : 'none';
  });
}

// ========== EFECTO SCROLL EN MÓVIL ========== //
function mostrarBloquesScroll() {
  const bloques = document.querySelectorAll('.servicio-bloque');
  const trigger = window.innerHeight * 0.85;

  bloques.forEach((bloque) => {
    const top = bloque.getBoundingClientRect().top;
    if (top < trigger) {
      bloque.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', mostrarBloquesScroll);
window.addEventListener('load', mostrarBloquesScroll);


// ========== seccion tarjetas=======//

// Cambiar idioma (ES / EN)
document.querySelectorAll('.lang-switch').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.textContent.trim().toLowerCase();
    document.querySelectorAll('.es').forEach(el => el.style.display = lang === 'es' ? 'inline' : 'none');
    document.querySelectorAll('.en').forEach(el => el.style.display = lang === 'en' ? 'inline' : 'none');
  });
});
