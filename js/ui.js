let modoCalculo = "bruto";
let idioma = localStorage.getItem("idioma") || "es";
let chartInstance = null;

const textos = {
  es: {
    titulo: "Calculadora Laboral México",
    subtitulo: "Herramientas",
    salario: "Salario mensual",
    bonos: "Bonos / comisiones (opcional)",
    infonavit: "Descuento Infonavit (opcional)",
    calcular: "Calcular",
    neto: "¿Cuánto te depositan?"
  },
  en: {
    titulo: "Work Calculator Mexico",
    subtitulo: "Tools",
    salario: "Monthly salary",
    bonos: "Bonuses / commissions (optional)",
    infonavit: "Infonavit deduction (optional)",
    calcular: "Calculate",
    neto: "How much do you receive?"
  }
};

function aplicarIdioma() {
  document.getElementById("titulo").innerText = textos[idioma].titulo;
  document.getElementById("subtitulo").innerText = textos[idioma].subtitulo;
  document.getElementById("salario").placeholder = textos[idioma].salario;
  document.getElementById("bonos").placeholder = textos[idioma].bonos;
  document.getElementById("infonavit").placeholder = textos[idioma].infonavit;
  document.getElementById("netoInput").placeholder = textos[idioma].neto;
  
  const btn = document.querySelector(".btn");
  if (btn) btn.innerText = textos[idioma].calcular;
  
  // Actualizar el switch visual
  const langSwitch = document.querySelector(".lang-switch");
  if (langSwitch) {
    if (idioma === "en") {
      langSwitch.classList.add("en");
    } else {
      langSwitch.classList.remove("en");
    }
  }
}

function toggleIdioma() {
  idioma = idioma === "es" ? "en" : "es";
  localStorage.setItem("idioma", idioma);
  aplicarIdioma();
}

function toggleModo() {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("modo-btn");
  const isDark = document.body.classList.contains("dark");
  btn.innerText = isDark ? "☀️" : "🌙";
  localStorage.setItem("modo", isDark ? "dark" : "light");
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
  } else {
    tabs[1].classList.add("active");
    document.getElementById("salario").style.display = "none";
    document.getElementById("bonos").style.display = "none";
    document.getElementById("infonavit").style.display = "none";
    document.getElementById("netoInput").style.display = "block";
  }
}

function renderGrafica(isr, imss, infonavit, neto) {
  const total = isr + imss + infonavit + neto;
  
  if (total === 0) return;

  const data = [
    (isr / total) * 100,
    (imss / total) * 100,
    (infonavit / total) * 100,
    (neto / total) * 100
  ];

  const ctx = document.getElementById("grafica").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["ISR", "IMSS", "Infonavit", "Neto"],
      datasets: [{
        data: data,
        backgroundColor: ["#ff4d4d", "#ffa500", "#4da6ff", "#00c853"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
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
  alert("📊 Versión avanzada en desarrollo...\nPróximamente: desglose completo de deducciones por ley (LFT México)");
}

function calcularSueldo() {
  if (modoCalculo === "neto") {
    const neto = parseFloat(document.getElementById("netoInput").value) || 0;
    
    if (neto === 0) {
      document.getElementById("resultado").innerHTML = `<p style="color: red;">⚠️ Ingresa el monto que recibes</p>`;
      return;
    }
    
    const ingresoTotal = neto / 0.85;
    const isr = ingresoTotal * 0.1;
    const imss = ingresoTotal * 0.03;
    const infonavit = 0;

    renderGrafica(isr, imss, infonavit, neto);

    document.getElementById("resultado").innerHTML = `
      <p><strong>📊 Estimación sueldo bruto:</strong> $${ingresoTotal.toLocaleString()}</p>
      <p>💰 ISR estimado: $${isr.toLocaleString()}</p>
      <p>🏥 IMSS estimado: $${imss.toLocaleString()}</p>
      <hr>
      <h3>💵 Recibes en mano: $${neto.toLocaleString()}</h3>
    `;
    return;
  }

  // MODO BRUTO
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const bonos = parseFloat(document.getElementById("bonos").value) || 0;
  const infonavit = parseFloat(document.getElementById("infonavit").value) || 0;

  if (salario === 0) {
    document.getElementById("resultado").innerHTML = `<p style="color: red;">⚠️ Ingresa tu salario mensual</p>`;
    return;
  }

  const ingresoTotal = salario + bonos;

  // Cálculo ISR simplificado (escalas reales aproximadas)
  let isr = 0;
  if (ingresoTotal > 10371) {
    isr = (ingresoTotal - 10371) * 0.1 + 0;
    if (ingresoTotal > 20742) isr = (ingresoTotal - 20742) * 0.16 + 1037;
    if (ingresoTotal > 32482) isr = (ingresoTotal - 32482) * 0.21 + 2915;
    if (ingresoTotal > 43579) isr = (ingresoTotal - 43579) * 0.27 + 5274;
  }

  const imss = ingresoTotal * 0.03;
  const deducciones = isr + imss + infonavit;
  const neto = ingresoTotal - deducciones;

  renderGrafica(isr, imss, infonavit, neto);

  document.getElementById("resultado").innerHTML = `
    <p><strong>💰 Ingreso total:</strong> $${ingresoTotal.toLocaleString()}</p>
    <p><strong>📉 ISR:</strong> $${isr.toLocaleString()} 
    <br><small>Impuesto sobre la renta</small></p>
    <p><strong>🏥 IMSS:</strong> $${imss.toLocaleString()}
    <br><small>Seguro social (3%)</small></p>
    <p><strong>🏠 Infonavit:</strong> $${infonavit.toLocaleString()}</p>
    <hr>
    <h3>💵 Sueldo neto: $${neto.toLocaleString()}</h3>
    <br>
    <button onclick="verDetalle()" class="btn" style="background: #0077ff;">
      📋 Ver cálculo detallado →
    </button>
  `;
}

// Inicialización al cargar la página
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
  
  // Inicializar el switch de idioma visualmente
  const langSwitch = document.querySelector(".lang-switch");
  if (langSwitch && idioma === "en") {
    langSwitch.classList.add("en");
  }
};
