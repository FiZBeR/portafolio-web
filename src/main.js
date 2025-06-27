// Crear partículas animadas
function createParticles() {
  const particles = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posición aleatoria
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Delay de animación aleatorio
      particle.style.animationDelay = Math.random() * 6 + 's';
      
      // Duración aleatoria
      particle.style.animationDuration = (3 + Math.random() * 4) + 's';
      
      particles.appendChild(particle);
  }
}

// Efecto parallax suave
function parallaxEffect() {
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const particles = document.querySelectorAll('.particle');
      
      particles.forEach((particle, index) => {
          const speed = (index % 3 + 1) * 0.5;
          particle.style.transform = `translateY(${scrolled * speed}px)`;
      });
  });
}

// JavaScript para la animación del nombre
function handleTitleAnimation() {
    const mainTitle = document.getElementById('mainTitle');
    const navBrand = document.getElementById('navBrand');
    const titleRect = mainTitle.getBoundingClientRect();
    
    // Cuando el título principal sale de la vista (menos de 100px del top)
    if (titleRect.top < 100) {
        navBrand.classList.add('visible');
    } else {
        navBrand.classList.remove('visible');
    }
}

// Event listener para ejecutar en scroll
window.addEventListener('scroll', handleTitleAnimation);

// Animación de entrada para las tarjetas
function observeCards() {
  const cards = document.querySelectorAll('.project-card, .skill');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });

  cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
  });
}

// Efecto de escritura para el título
function typeWriter() {
  const title = document.querySelector('.hero h1');
  const text = title.textContent;
  title.textContent = '';
  
  let i = 0;
  function type() {
      if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
      }
  }
  
  setTimeout(type, 500);
}

// Smooth scroll mejorado
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
}

// Inicializar efectos
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  parallaxEffect();
  observeCards();
  observeTimeline();
  typeWriter();
  smoothScroll();
});

// Animación para el timeline
function observeTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-content');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0) scale(1)';
          }
      });
  }, { threshold: 0.3 });

  timelineItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px) scale(0.95)';
      item.style.transition = `all 0.6s ease ${index * 0.2}s`;
      observer.observe(item);
  });
}

 // Toggle tema oscuro/claro
 function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}


// Cursor personalizado
// document.addEventListener('mousemove', (e) => {
//   const cursor = document.createElement('div');
//   cursor.style.cssText = `
//       position: fixed;
//       left: ${e.clientX}px;
//       top: ${e.clientY}px;
//       width: 20px;
//       height: 20px;
//       background: radial-gradient(circle, rgba(100,255,218,0.3) 0%, transparent 70%);
//       border-radius: 50%;
//       pointer-events: none;
//       z-index: 9999;
//       animation: cursorFade 0.5s ease-out forwards;
//   `;
  
//   document.body.appendChild(cursor);
  
//   setTimeout(() => {
//       cursor.remove();
//   }, 500);
// });

// CSS para el cursor
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes cursorFade {
//       from { opacity: 1; transform: scale(1); }
//       to { opacity: 0; transform: scale(2); }
//   }
// `;
// document.head.appendChild(style);

function openModal(projectTitle) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    modalTitle.textContent = projectTitle;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Evitar scroll del body
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

// Event listeners para cerrar modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Cerrar modal clickeando fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}