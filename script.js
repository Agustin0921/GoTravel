// ==============================
// GoTravel - Script Unificado
// ==============================
document.addEventListener('DOMContentLoaded', () => {

  /* ==== MENU RESPONSIVE ==== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav_link');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });
  }

  /* ==== NAVBAR FIJA CON SCROLL ==== */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ==== CONTADOR ANIMADO ==== */
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const speed = 150;
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
      if (!statsSection) return;
      const sectionTop = statsSection.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 100;
      if (!animated && sectionTop < triggerPoint) {
        animateCounters();
        animated = true;
      }
    });
  }

  /* ==== GALERÍA MODAL ==== */
  const imagenes = document.querySelectorAll('.img-destino');
  const modal = document.getElementById('modalDestino');
  const modalTitulo = document.getElementById('modalTitulo');
  const modalDescripcion = document.getElementById('modalDescripcion');
  const galeria = document.getElementById('galeria');
  const cerrar = document.querySelector('.cerrar');

  const infoDestinos = {
    paris: {
      titulo: "París, Francia",
      descripcion: "Descubrí la magia de París: paseos por el Sena, arte en el Louvre y la inconfundible Torre Eiffel. Ideal para escapadas románticas y cultura.",
      imagenes: ["img/paris1.jpg", "img/paris2.jpg", "img/paris3.jpg"]
    },
    maldivas: {
      titulo: "Islas Maldivas",
      descripcion: "Un paraíso tropical con aguas turquesa, arena blanca y hoteles sobre el mar. Perfecto para lunas de miel y relax total.",
      imagenes: ["img/maldivas1.jpg", "img/maldivas2.jpg", "img/maldivas3.jpg"]
    },
    ny: {
      titulo: "Nueva York, EE.UU.",
      descripcion: "Vibrante, moderna e inolvidable. Caminá por Times Square, visitá Central Park y sentite parte de una película.",
      imagenes: ["img/ny1.jpg", "img/ny2.jpg", "img/ny3.jpg"]
    }
  };

  imagenes.forEach(img => {
    img.addEventListener('click', () => {
      const destinoId = img.dataset.id;
      const destino = infoDestinos[destinoId];
      modalTitulo.textContent = destino.titulo;
      modalDescripcion.textContent = destino.descripcion;
      galeria.innerHTML = destino.imagenes
        .map(src => `<img src="${src}" alt="${destino.titulo}">`)
        .join("");
      modal.style.display = 'flex';
    });
  });

  if (cerrar && modal) {
    cerrar.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  /* ==== FILTROS DE DESTINOS ==== */
  const filtroRegion = document.getElementById('filtro-region');
  const filtroTipo = document.getElementById('filtro-tipo');
  const cards = document.querySelectorAll('.destino-avanzado');

  function filtrarDestinos() {
    const region = filtroRegion ? filtroRegion.value : 'all';
    const tipo = filtroTipo ? filtroTipo.value : 'all';
    cards.forEach(card => {
      const matchRegion = region === 'all' || card.dataset.region === region;
      const matchTipo = tipo === 'all' || card.dataset.tipo === tipo;
      card.style.display = (matchRegion && matchTipo) ? 'block' : 'none';
    });
  }

  if (filtroRegion) filtroRegion.addEventListener('change', filtrarDestinos);
  if (filtroTipo) filtroTipo.addEventListener('change', filtrarDestinos);

  /* ==== CÁLCULO DE PRECIO ==== */
  function calcularPrecioEnCard(card) {
    const base = parseFloat(card.dataset.base || '0');
    const inputs = card.querySelectorAll('input[type="date"]');
    const totalEl = card.querySelector('.total');
    if (inputs.length < 2 || !totalEl) return;

    const valIda = inputs[0].value;
    const valVuelta = inputs[1].value;
    if (!valIda || !valVuelta) {
      totalEl.textContent = "Seleccioná ambas fechas.";
      return;
    }

    const fechaIda = new Date(valIda);
    const fechaVuelta = new Date(valVuelta);
    const dias = (fechaVuelta - fechaIda) / (1000 * 60 * 60 * 24);

    if (isNaN(dias) || dias <= 0) {
      totalEl.textContent = "La fecha de vuelta debe ser posterior a la de ida.";
      return;
    }

    const precioPorDia = 80;
    const precioTotal = base + (dias * precioPorDia);
    totalEl.textContent = `Precio total: $${precioTotal.toFixed(2)} USD (${dias} días)`;
  }

  const botonesCalcular = document.querySelectorAll('.btn-calcular');
  botonesCalcular.forEach(boton => {
    boton.addEventListener('click', () => {
      const card = boton.closest('.card');
      if (card) calcularPrecioEnCard(card);
    });
  });

  /* ==== AGREGAR AL ITINERARIO ==== */
  const botonesItinerario = document.querySelectorAll('.btn-itinerario');
  botonesItinerario.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      if (!card) return;
      const titulo = card.querySelector('h3')?.textContent || 'Destino';
      const itinerario = JSON.parse(localStorage.getItem('gotravel_itinerario') || '[]');
      itinerario.push(titulo);
      localStorage.setItem('gotravel_itinerario', JSON.stringify(itinerario));
      alert(`"${titulo}" se agregó a tu itinerario 🧳`);
    });
  });

});
