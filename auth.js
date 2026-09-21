// ==========================================================
// AUTENTICAÇÃO E PERFIL DO CLIENTE — Matimeles Services
// Depende de: firebase-config.js (carregado antes deste arquivo)
// ==========================================================

// ---------- REGISTO ----------
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nome = document.getElementById('reg-nome').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const negocio = document.getElementById('reg-negocio').value.trim();
    const senha = document.getElementById('reg-senha').value;
    const msg = document.getElementById('registerMsg');

    auth.createUserWithEmailAndPassword(email, senha)
      .then((cred) => {
        // Guarda os dados extra do perfil no Firestore, ligados ao uid do utilizador
        return db.collection('perfis').doc(cred.user.uid).set({
          nome: nome,
          email: email,
          negocio: negocio,
          criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => cred.user.updateProfile({ displayName: nome }));
      })
      .then(() => {
        msg.classList.remove('error');
        msg.classList.add('success');
        msg.textContent = 'Conta criada com sucesso! A redirecionar para o seu perfil...';
        setTimeout(() => { window.location.href = 'perfil.html'; }, 1200);
      })
      .catch((err) => {
        msg.classList.remove('success');
        msg.classList.add('error');
        msg.textContent = traduzErro(err.code);
      });
  });
}

// ---------- LOGIN ----------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const msg = document.getElementById('loginMsg');

    auth.signInWithEmailAndPassword(email, senha)
      .then(() => {
        msg.classList.remove('error');
        msg.classList.add('success');
        msg.textContent = 'Login efetuado com sucesso! A redirecionar...';
        setTimeout(() => { window.location.href = 'perfil.html'; }, 900);
      })
      .catch((err) => {
        msg.classList.remove('success');
        msg.classList.add('error');
        msg.textContent = traduzErro(err.code);
      });
  });
}

// ---------- LOGOUT ----------
function sairDaConta() {
  auth.signOut().then(() => { window.location.href = 'login.html'; });
}

// ---------- PROTEGER A PÁGINA DE PERFIL ----------
// Chame protegerPagina() no <script> da página perfil.html
function protegerPagina() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    db.collection('perfis').doc(user.uid).get().then((doc) => {
      const dados = doc.exists ? doc.data() : {};
      const elNome = document.getElementById('perfil-nome');
      const elEmail = document.getElementById('perfil-email');
      const elNegocio = document.getElementById('perfil-negocio');
      if (elNome) elNome.textContent = dados.nome || user.displayName || '—';
      if (elEmail) elEmail.textContent = dados.email || user.email || '—';
      if (elNegocio) elNegocio.textContent = dados.negocio || '—';
    });
  });
}

// ---------- MENSAGENS DE ERRO EM PORTUGUÊS ----------
function traduzErro(code) {
  const mapa = {
    'auth/email-already-in-use': 'Este e-mail já está registado. Tente entrar.',
    'auth/invalid-email': 'O e-mail indicado não é válido.',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
    'auth/user-not-found': 'Não existe conta com este e-mail.',
    'auth/wrong-password': 'Senha incorreta.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.'
  };
  return mapa[code] || 'Ocorreu um erro. Tente novamente.';
}
