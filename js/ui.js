// ===============================
// ESTADO GLOBAL
// ===============================
let idioma = localStorage.getItem("idioma") || "es";

// ===============================
// TEXTOS
// ===============================
const textos = {
  es: {
    titulo: "Calculadora Laboral México 🇲🇽",
    subtitulo: "Herramientas",
    btnSueldo: "Calcular Sueldo Neto"
  },
  en: {
    titulo: "Work Calculator Mexico 🇲🇽",
    subtitulo: "Tools",
    btnSueldo: "Calculate Net Salary"
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
}

function setIdioma(id) {
  idioma = id;
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
}

// ===============================
// MODO OSCURO
// ===============================
function toggleModo() {
  document.body.classList.toggle("dark");

  const modo = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("modo", modo);
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
};
