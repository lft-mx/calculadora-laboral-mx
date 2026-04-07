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
