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
    salario: "Salario mensual",
    bonos: "Bonos / comisiones (opcional)",
    infonavit: "Descuento Infonavit (opcional)",
    calcular: "Calcular",
    ad: "Espacio publicitario"
  },
  en: {
    titulo: "Work Calculator Mexico",
    subtitulo: "Tools",
    salario: "Monthly salary",
    bonos: "Bonuses / commissions (optional)",
    infonavit: "Infonavit deduction (optional)",
    calcular: "Calculate",
    ad: "Ad space"
  }
};

// ===============================
// IDIOMA
// ===============================
function aplicarIdioma() {
  document.getElementById("titulo").innerText = textos[idioma].titulo;
  document.getElementById("subtitulo").innerText = textos[idioma].subtitulo;
  //document.getElementById("btnSueldo").innerText = textos[idioma].btnSueldo;

  const switchLang = document.querySelector(".lang-switch");
  if (switchLang) {
    switchLang.classList.toggle("en", idioma === "en");
  }
  document.getElementById("ad-text").innerText = textos[idioma].ad;
  document.getElementById("salario").placeholder = textos[idioma].salario;
  document.getElementById("bonos").placeholder = textos[idioma].bonos;
  document.getElementById("infonavit").placeholder = textos[idioma].infonavit;
  
  const btn = document.querySelector(".btn");
  if (btn) btn.innerText = textos[idioma].calcular;
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

// ===============================
// CÁLCULO DE SUELDO
// ===============================
function calcularSueldo() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const bonos = parseFloat(document.getElementById("bonos").value) || 0;
  const infonavit = parseFloat(document.getElementById("infonavit").value) || 0;

  const ingresoTotal = salario + bonos;

  // ISR aproximado
  let isr = 0;
  if (ingresoTotal > 10000) {
    isr = ingresoTotal * 0.1;
  }

  // IMSS aproximado
  const imss = ingresoTotal * 0.03;

  // Total deducciones
  const deducciones = isr + imss + infonavit;

  // Sueldo neto
  const neto = ingresoTotal - deducciones;
  renderGrafica(isr, imss, infonavit, neto);

  document.getElementById("resultado").innerHTML = `
    <p><strong>Ingreso total:</strong> $${ingresoTotal.toLocaleString()}</p>
  
    <p>
      <strong>ISR:</strong> $${isr.toLocaleString()} 
      <br><small>Impuesto sobre tu ingreso</small>
    </p>
  
    <p>
      <strong>IMSS:</strong> $${imss.toLocaleString()}
      <br><small>Seguro social obligatorio</small>
    </p>
  
    <p><strong>Infonavit:</strong> $${infonavit.toLocaleString()}</p>
  
    <hr>
  
    <h3>Sueldo neto: $${neto.toLocaleString()}</h3>
  
    <br>
  
    <button onclick="verDetalle()" class="btn">
      Ver cálculo detallado →
    </button>
  `;
}
function renderGrafica(isr, imss, infonavit, neto) {
  const total = isr + imss + infonavit + neto;

  const data = [
    (isr / total) * 100,
    (imss / total) * 100,
    (infonavit / total) * 100,
    (neto / total) * 100
  ];

  const ctx = document.getElementById("grafica").getContext("2d");

  if (window.chart) {
    window.chart.destroy();
  }

  window.chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["ISR", "IMSS", "Infonavit", "Neto"],
      datasets: [{
        data: data
      }]
    }
  });
}
function verDetalle() {
  alert("Aquí irá la versión avanzada (siguiente paso)");
}
