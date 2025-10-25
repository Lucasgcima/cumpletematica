// Fecha del evento (formato ISO con zona horaria Argentina -03:00)
const EVENT_DATE = new Date('2025-12-06T21:00:00-03:00');

// Countdown
const dEl = document.getElementById('d');
const hEl = document.getElementById('h');
const mEl = document.getElementById('m');
const sEl = document.getElementById('s');

function updateCountdown(){
  const now = new Date();
  const diff = EVENT_DATE - now;

  if(diff <= 0){
    dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
    return;
  }

  const sec = Math.floor(diff/1000);
  const days = Math.floor(sec/86400);
  const hours = Math.floor((sec%86400)/3600);
  const mins = Math.floor((sec%3600)/60);
  const secs = sec%60;

  dEl.textContent = String(days).padStart(2,'0');
  hEl.textContent = String(hours).padStart(2,'0');
  mEl.textContent = String(mins).padStart(2,'0');
  sEl.textContent = String(secs).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown,1000);

// Música
const audio = document.getElementById('bgAudio');
const overlay = document.getElementById('overlay');
const overlayBtn = document.getElementById('overlayBtn');
const playBtn = document.getElementById('playMusic');

function userPlay(){
  audio.volume = 1;
  audio.play();
  overlay.style.display='none';
  playBtn.textContent='⏸️ Pausar música';
}

overlayBtn.addEventListener('click', userPlay);

playBtn.addEventListener('click', () => {
  if(audio.paused){
    userPlay();
  } else {
    audio.pause();
    playBtn.textContent='▶ Reproducir "Blind"';
  }
});

// Intento autoplay en silencio
document.addEventListener('DOMContentLoaded', ()=>{
  audio.volume = 0;
  audio.play().then(()=>{
    setTimeout(()=>{ audio.volume = 1; overlay.style.display='none'; }, 300);
  }).catch(()=>{
    console.log('Autoplay bloqueado');
  });
});
