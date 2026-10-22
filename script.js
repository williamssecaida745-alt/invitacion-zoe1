

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

/* ✨ EFECTOS ADICIONALES PARA LA INVITACIÓN DE ZOÉ */
(() => {
  // Evita duplicar los efectos si el bloque se ejecuta otra vez.
  if (window.efectosMagicosZoeInstalados) return;
  window.efectosMagicosZoeInstalados = true;

  // 1. Destellos alrededor del botón que abre la invitación.
  // El botón deberá tener la clase "boton-abrir-magico".
  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".boton-abrir-magico");
    if (!boton) return;

    const rect = boton.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    const simbolos = ["✦", "✧", "✨", "★", "♡"];

    for (let i = 0; i < 18; i++) {
      const destello = document.createElement("span");
      destello.className = "destello-zoe";
      destello.textContent =
        simbolos[Math.floor(Math.random() * simbolos.length)];

      const angulo = Math.random() * Math.PI * 2;
      const distancia = 25 + Math.random() * 100;

      destello.style.left =
        (centroX + Math.cos(angulo) * distancia) + "px";
      destello.style.top =
        (centroY + Math.sin(angulo) * distancia) + "px";
      destello.style.setProperty(
        "--brillo-tamano",
        (14 + Math.random() * 18) + "px"
      );

      document.body.appendChild(destello);
      setTimeout(() => destello.remove(), 1000);
    }
  });

  // 2. Confeti cuando se pulsa el enlace de WhatsApp.
  // No bloquea ni reemplaza el enlace que ya tienes.
  document.addEventListener("click", (evento) => {
    const enlace = evento.target.closest("a[href]");
    if (!enlace) return;

    const destino = enlace.getAttribute("href") || "";
    if (!/wa\.me|whatsapp\.com/i.test(destino)) return;

    const colores = [
      "#ff86bd",
      "#8edbff",
      "#ffe17a",
      "#c9a5ff",
      "#a8edc2",
      "#ffffff"
    ];

    for (let i = 0; i < 65; i++) {
      const pieza = document.createElement("span");
      pieza.className = "confeti-zoe";

      pieza.style.setProperty(
        "--confeti-x",
        Math.random() * 100 + "vw"
      );
      pieza.style.setProperty(
        "--confeti-color",
        colores[Math.floor(Math.random() * colores.length)]
      );
      pieza.style.setProperty(
        "--confeti-tiempo",
        (1.5 + Math.random() * 2) + "s"
      );

      document.body.appendChild(pieza);
      setTimeout(() => pieza.remove(), 3700);
    }
  });
})();

