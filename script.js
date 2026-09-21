// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Formulário de Contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const msg = document.getElementById('contactMsg');
    msg.classList.add('success');
    msg.textContent = 'Mensagem enviada com sucesso! Entraremos em contacto em breve.';
    setTimeout(() => { msg.classList.remove('success'); }, 4000);
    this.reset();
  });
}
