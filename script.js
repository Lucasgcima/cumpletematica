const EVENT_DATE = new Date(2025, 11, 6, 21, 0, 0);

const dEl = document.getElementById('d');
const hEl = document.getElementById('h');
const mEl = document.getElementById('m');
const sEl = document.getElementById('s');

function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  dEl.textContent = String(days).padStart(2, '0');
  hEl.textContent = String(hours).padStart(2, '0');
  mEl.textContent = String(mins).padStart(2, '0');
  sEl.textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx6ScXlzCvXgp-SRtw0ViQZTC0ThoJLHQg9bZiO_JoXxnY21rhJx_paeCfrcSsipqP_/exec";

const form = document.querySelector('.asist-form');
const formMsg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const asistencia = document.getElementById('asiste').value;
    const nombre = document.getElementById('nombre').value.trim();

    if (!nombre) {
      formMsg.textContent = "⚠ Ingresá tu nombre antes de enviar.";
      return;
    }

    const datos = {
      nombre,
      asiste: asistencia,
      userAgent: navigator.userAgent
    };

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      formMsg.textContent = asistencia === "si"
        ? `✅ ¡Genial ${nombre}! Te esperamos 🎉`
        : `😢 Una lástima, ${nombre}. ¡Gracias por avisar!`;

      form.reset();

    } catch (err) {
      formMsg.textContent = "⚠ Hubo un problema, intentá de nuevo.";
    }
  });
}

const audio = document.getElementById('bgAudio');
const playBtn = document.getElementById('playMusic');

function userPlay() {
  if (audio) {
    audio.volume = 1;
    audio.play();
    playBtn.textContent = "⏸️ Pausar música";
  }
}

if (playBtn) {
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      userPlay();
    } else {
      audio.pause();
      playBtn.textContent = "▶ Reproducir música";
    }
  });
}



