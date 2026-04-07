// ===============================
// ESTADO GLOBAL
// ===============================
let idioma = localStorage.getItem("idioma") || "es";

// ===============================
// TEXTOS
// ===============================
const textos = {
  es: {
    titulo: "Calculadora Laboral México",
    subtitulo: "Herramientas",
    btnSueldo: "Calcular Sueldo Neto",
    ad: "Espacio publicitario"
  },
  en: {
    titulo: "Work Calculator Mexico",
    subtitulo: "Tools",
    btnSueldo: "Calculate Net Salary",
    ad: "Ad space"
  }
};

// ===============================
// IDIOMA
// ===============================
function aplicarIdioma() {
  document.getElementById("titulo").innerText = textos[idioma].titulo;
  document.getElementById("subtitulo").innerText = textos[idioma].subtitulo;
  document.getElementById("btnSueldo").innerText = textos[idioma].btnSueldo;

  const switchLang = document.querySelector(".lang-switch");
  if (switchLang) {
    switchLang.classList.toggle("en", idioma === "en");
  }
  document.getElementById("ad-text").innerText = textos[idioma].ad;
}

function setIdioma(id) {
  idioma = id;
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
}

function toggleIdioma() {
  idioma = idioma === "es" ? "en" : "es";
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
}

// ===============================
// MODO OSCURO
// ===============================
function toggleModo() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("modo-btn");
  const isDark = document.body.classList.contains("dark");

  btn.innerText = isDark ? "☀️" : "🌙";

  localStorage.setItem("modo", isDark ? "dark" : "light");
}

// ===============================
// INICIALIZACIÓN
// ===============================
window.onload = () => {
  aplicarIdioma();

  const modoGuardado = localStorage.getItem("modo");
  
  if (modoGuardado === "dark") {
    document.body.classList.add("dark");
  }
  const btn = document.getElementById("modo-btn");
btn.innerText = modoGuardado === "dark" ? "☀️" : "🌙";

};
