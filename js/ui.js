function toggleModo() {
  document.body.classList.toggle("dark");
}
let idioma = "es";

function toggleIdioma() {
  idioma = idioma === "es" ? "en" : "es";

  if (idioma === "en") {
    document.getElementById("titulo").innerText = "Work Calculator Mexico 🇲🇽";
  } else {
    document.getElementById("titulo").innerText = "Calculadora Laboral México 🇲🇽";
  }
}
