// ==========================================================
// CONFIGURAÇÃO DO FIREBASE
// ==========================================================
// 1. Vá a https://console.firebase.google.com
// 2. Crie um projeto gratuito (ex: "matimeles-services")
// 3. No menu do projeto: Compilação > Authentication > Sign-in method
//    -> ative "E-mail/senha"
// 4. No menu do projeto: Compilação > Firestore Database
//    -> crie o banco de dados (modo de teste para começar)
// 5. Em Configurações do projeto (ícone de engrenagem) > Geral,
//    role até "Seus aplicativos" > clique em "</>" (Web) para
//    registar um app e copiar os valores abaixo.
// ==========================================================

const firebaseConfig = {
  apiKey: "COLOQUE_AQUI_A_SUA_API_KEY",
  authDomain: "COLOQUE_AQUI_O_SEU_PROJETO.firebaseapp.com",
  projectId: "COLOQUE_AQUI_O_SEU_PROJECT_ID",
  storageBucket: "COLOQUE_AQUI_O_SEU_PROJETO.appspot.com",
  messagingSenderId: "COLOQUE_AQUI_O_SENDER_ID",
  appId: "COLOQUE_AQUI_O_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
