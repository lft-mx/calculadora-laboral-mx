function toggleModo() {
  document.body.classList.toggle("dark");
}
let idioma = "es";

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

function aplicarIdioma() {
  document.getElementById("titulo").innerText = textos[idioma].titulo;
  document.getElementById("subtitulo").innerText = textos[idioma].subtitulo;
  document.getElementById("btnSueldo").innerText = textos[idioma].btnSueldo;
}

function toggleIdioma() {
  idioma = idioma === "es" ? "en" : "es";
  aplicarIdioma();
}

window.onload = aplicarIdioma;
let idioma = localStorage.getItem("idioma") || "es";

function setIdioma(id) {
  idioma = id;
  localStorage.setItem("idioma", idioma);
  actualizarUI();
}

function actualizarUI() {
  const titulo = document.getElementById("titulo");
  const switchLang = document.querySelector(".lang-switch");

  if (idioma === "en") {
    titulo.innerText = "Work Calculator Mexico 🇲🇽";
    switchLang.classList.add("en");
  } else {
    titulo.innerText = "Calculadora de Sueldo México 🇲🇽";
    switchLang.classList.remove("en");
  }
}

function toggleModo() {
  document.body.classList.toggle("dark");

  const modo = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("modo", modo);
}

window.onload = () => {
  actualizarUI();

  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "dark") {
    document.body.classList.add("dark");
  }
};
