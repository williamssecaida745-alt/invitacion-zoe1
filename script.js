
const portada = document.getElementById("portada");
const invitacion = document.getElementById("invitacion");
const botonAbrir = document.getElementById("abrirInvitacion");

const musica = document.getElementById("musica");
const controlMusica = document.getElementById("controlMusica");
const confirmar = document.getElementById("confirmar");

// Reemplaza este número por el número de WhatsApp
// con código de Guatemala (502), sin el signo +.
const numeroWhatsApp = "502XXXXXXXX";

// 25 de octubre de 2026 a las 2:00 p. m.
const fechaEvento = new Date(2026, 9, 25, 14, 0, 0);

let temporizador;

// Abrir invitación
botonAbrir.addEventListener("click", async () => {
  portada.classList.add("oculta");
  invitacion.classList.add("visible");

  controlMusica.hidden = false;
  actualizarContador();

  temporizador = setInterval(actualizarContador, 1000);

  try {
    await musica.play();
    controlMusica.textContent = "♫ Pausar música";
  } catch {
    controlMusica.textContent = "♫ Activar música";
  }
});

// Reproducir o pausar música
controlMusica.addEventListener("click", async () => {
  if (musica.paused) {
    try {
      await musica.play();
      controlMusica.textContent = "♫ Pausar música";
    } catch {
      alert("Revisa que el archivo musica.mp3 esté en la carpeta.");
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

    clearInterval(temporizador);
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
confirmar.addEventListener("click", evento => {
  if (!/^502\d{8}$/.test(numeroWhatsApp)) {
    evento.preventDefault();
    alert(
      "Configura el número de WhatsApp en script.js " +
      "antes de utilizar este botón."
    );
    return;
  }

  const mensaje =
    "¡Hola! Confirmo mi asistencia al cumpleaños de Zoé " +
    "el domingo 25 de octubre de 2026 a las 2:00 p. m. 💙";

  confirmar.href =
    "https://wa.me/" +
    numeroWhatsApp +
    "?text=" +
    encodeURIComponent(mensaje);
});
