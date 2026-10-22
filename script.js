

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

