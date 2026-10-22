

const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const botonAbrir = document.getElementById("abrirInvitacion");

const musica = document.getElementById("musica");
const controlMusica = document.getElementById("controlMusica");
const confirmar = document.getElementById("confirmar");

// Número de WhatsApp con código de Guatemala (502).
// Conserva aquí el número que ya tenías configurado.
const numeroWhatsApp = "50235804695";

// Fecha del cumpleaños: 25 de octubre de 2026, a las 2:00 p. m.
const fechaEvento = new Date(2026, 9, 25, 14, 0, 0);

let temporizador = null;

// Abrir la invitación
botonAbrir.addEventListener("click", async () => {
  portada.classList.add("oculta");
  invitacion.classList.add("visible");

  controlMusica.hidden = false;
  actualizarContador();

  if (temporizador === null) {
    temporizador = setInterval(actualizarContador, 1000);
  }

  try {
    await musica.play();
    controlMusica.textContent = "♫ Pausar música";
  } catch (error) {
    controlMusica.textContent = "♫ Activar música";
  }
});

// Reproducir o pausar la música
controlMusica.addEventListener("click", async () => {
  if (musica.paused) {
    try {
      await musica.play();
      controlMusica.textContent = "♫ Pausar música";
    } catch (error) {
      alert(
        "No se pudo reproducir la música. " +
        "Comprueba que musica.mp3 esté en el repositorio."
      );
    }
  } else {
    musica.pause();
    controlMusica.textContent = "♫ Activar música";
  }
});

// Cuenta regresiva
function actualizarContador() {
  const diferencia = fechaEvento.getTime() - Date.now();

  if (diferencia <= 0) {
    ["dias", "horas", "minutos", "segundos"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });

    if (temporizador !== null) {
      clearInterval(temporizador);
      temporizador = null;
    }

    return;
  }

  const valores = {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor(diferencia / 3600000) % 24,
    minutos: Math.floor(diferencia / 60000) % 60,
    segundos: Math.floor(diferencia / 1000) % 60
  };

  Object.entries(valores).forEach(([id, valor]) => {
    document.getElementById(id).textContent =
      String(valor).padStart(2, "0");
  });
}

// Confirmación por WhatsApp
const mensajeWhatsApp =
  "¡Hola! Confirmo mi asistencia al cumpleaños de Zoé " +
  "el domingo 25 de octubre de 2026 a las 2:00 p. m. 💙🎀";

if (/^502\d{8}$/.test(numeroWhatsApp)) {
  confirmar.href =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(mensajeWhatsApp);

  confirmar.target = "_blank";
  confirmar.rel = "noopener noreferrer";
} else {
  confirmar.addEventListener("click", evento => {
    evento.preventDefault();
    alert("Revisa el número de WhatsApp configurado en script.js.");
  });
}


/* 💖 Corazones, estrellas y burbujas flotantes */
(() => {
  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) {
    return;
  }

  const capa = document.createElement("div");
  capa.className = "efectos-flotantes";
  capa.setAttribute("aria-hidden", "true");
  document.body.appendChild(capa);

  const tipos = [
    { clase: "corazon", simbolo: "♥" },
    { clase: "corazon", simbolo: "♡" },
    { clase: "estrella", simbolo: "★" },
    { clase: "estrella", simbolo: "✦" },
    { clase: "burbuja", simbolo: "" }
  ];

  function crearParticula() {
    // Evita acumular demasiadas partículas
    if (capa.childElementCount >= 18) return;

    const tipo = tipos[
      Math.floor(Math.random() * tipos.length)
    ];

    const particula = document.createElement("span");
    particula.className =
      "particula-magica " + tipo.clase;

    if (tipo.simbolo) {
      particula.textContent = tipo.simbolo;
    }

    const tamano = tipo.clase === "burbuja"
      ? 10 + Math.random() * 20
      : 14 + Math.random() * 18;

    const duracion = 7 + Math.random() * 6;

    particula.style.setProperty(
      "--posicion",
      Math.random() * 96 + "%"
    );

    particula.style.setProperty(
      "--tamano",
      tamano + "px"
    );

    particula.style.setProperty(
      "--duracion",
      duracion + "s"
    );

    capa.appendChild(particula);

    setTimeout(() => {
      particula.remove();
    }, duracion * 1000 + 200);
  }

  // Crear partículas poco a poco
  crearParticula();
  setInterval(crearParticula, 750);
})();

