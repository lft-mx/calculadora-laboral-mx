let modoCalculo = "bruto";
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
  // document.getElementById("ad-text").innerText = textos[idioma].ad;
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
  if (btn) {
    btn.innerText = modoGuardado === "dark" ? "☀️" : "🌙";
  }

};

// ===============================
// CÁLCULO DE SUELDO
// ===============================
function calcularSueldo() {

  // ===============================
  // MODO NETO (PRIMERO)
  // ===============================
  if (modoCalculo === "neto") {
    const neto = parseFloat(document.getElementById("netoInput").value) || 0;

    // estimación inversa simple
    const ingresoTotal = neto / 0.85;

    const isr = ingresoTotal * 0.1;
    const imss = ingresoTotal * 0.03;
    const infonavit = 0;

    renderGrafica(isr, imss, infonavit, neto);

    document.getElementById("resultado").innerHTML = `
      <p><strong>Estimación sueldo bruto:</strong> $${ingresoTotal.toLocaleString()}</p>
      <p>ISR estimado: $${isr.toLocaleString()}</p>
      <p>IMSS estimado: $${imss.toLocaleString()}</p>
      <h3>Recibes: $${neto.toLocaleString()}</h3>
    `;

    return;
  }

  // ===============================
  // MODO BRUTO (EL ORIGINAL)
  // ===============================
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const salarioInput = parseFloat(document.getElementById("salario").value) || 0;
  const bonos = parseFloat(document.getElementById("bonos").value) || 0;
  const infonavit = parseFloat(document.getElementById("infonavit").value) || 0;
  const dias = parseFloat(document.getElementById("dias").value) || 15;
  const periodo = document.getElementById("periodo").value;
  
  // 🎯 Convertir salario a diario según periodo
  let salarioDiario = 0;
  
  if (periodo === "mensual") salarioDiario = salarioInput / 30;
  if (periodo === "quincenal") salarioDiario = salarioInput / 15;
  if (periodo === "semanal") salarioDiario = salarioInput / 7;
  
  // 🔥 ingreso real basado en días trabajados
  const salarioReal = salarioDiario * dias;
  
  const ingresoTotal = salarioReal + bonos;

  let isr = 0;

  // 💡 Simulación más real (tipo nómina)
  if (ingresoTotal > 3000) {
    isr = ingresoTotal * 0.08;
  }
  if (ingresoTotal > 5000) {
    isr = ingresoTotal * 0.10;
  }

  const imss = ingresoTotal * 0.03;

  const deducciones = isr + imss + infonavit;

  const neto = ingresoTotal - deducciones;

  renderGrafica(isr, imss, infonavit, neto);

    document.getElementById("resultado").innerHTML = `
      <p><strong>💰 Ingreso calculado:</strong> $${ingresoTotal.toLocaleString()}</p>
      <p>📅 Periodo: <strong>${periodo}</strong></p>
      <p>👷 Días trabajados: <strong>${dias}</strong></p>
      <p>🧾 <strong>ISR:</strong> $${isr.toLocaleString()} <br><small>Estimado con lógica tipo nómina</small></p>
      <p>🏥 <strong>IMSS:</strong> $${imss.toLocaleString()}</p>
      <p>🏠 <strong>Infonavit:</strong> $${infonavit.toLocaleString()}</p>
      <hr>
      <h3>💵 Recibes: $${neto.toLocaleString()}</h3>
      <br>
      <small>⚠️ Nota: Aunque existen tablas quincenales, muchas empresas calculan el ISR con base mensual y luego lo ajustan por periodo.</small>
      <br><br>
      <button onclick="verDetalle()" class="btn">Ver cálculo detallado →</button>
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
      data: data,
      backgroundColor: [
        "#ff4d4d",  // ISR rojo
        "#ffa500",  // IMSS naranja
        "#4da6ff",  // Infonavit azul
        "#00c853"   // Neto verde
      ]
    }]
  },
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ": " + context.raw.toFixed(1) + "%";
          }
        }
      }
    }
  }
});
}
  
function verDetalle() {
  alert("Aquí irá la versión avanzada (siguiente paso)");
}
function cambiarModo(modo) {
  modoCalculo = modo;

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(t => t.classList.remove("active"));

  if (modo === "bruto") {
    tabs[0].classList.add("active");
    document.getElementById("salario").style.display = "block";
    document.getElementById("bonos").style.display = "block";
    document.getElementById("infonavit").style.display = "block";
    document.getElementById("netoInput").style.display = "none";
    
    // Mostrar labels
    const labels = document.querySelectorAll("label");
    if (labels[0]) labels[0].style.display = "block";
    if (labels[1]) labels[1].style.display = "block";
  } else {
    tabs[1].classList.add("active");
    document.getElementById("salario").style.display = "none";
    document.getElementById("bonos").style.display = "none";
    document.getElementById("infonavit").style.display = "none";
    document.getElementById("netoInput").style.display = "block";
    
    // Ocultar labels
    const labels = document.querySelectorAll("label");
    if (labels[0]) labels[0].style.display = "none";
    if (labels[1]) labels[1].style.display = "none";
  }
}
