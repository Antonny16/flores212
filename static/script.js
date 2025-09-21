// script.js
window.addEventListener("load", () => {
  const startBtn = document.getElementById("startBtn");
  const overlay = document.getElementById("overlay");
  const audio = document.getElementById("audio");
  const ramo = document.getElementById("ramo");
  const floresContainer = document.getElementById("flores-container");
  const video = document.getElementById("video-final");
  const mensaje = document.getElementById("mensaje-final");

  // Segundos: inicio y fin del fragmento
  const START_SEC = 47;
  const STOP_SEC = 60;

  // función para arrancar toda la experiencia cuando el usuario haga click
  function startExperience() {
    // ocultar overlay
    overlay.style.display = "none";

    // Asegurarse que el audio está listo: poner tiempo y reproducir
    audio.currentTime = START_SEC;
    const playPromise = audio.play();
    // Algunos navegadores devuelven una promesa
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // si falla el autoplay, mostramos nuevamente el botón
        overlay.style.display = "flex";
        alert("Por favor toca de nuevo el botón para reproducir el audio.");
      });
    }

    // al iniciar la reproducción, subir ramo y crear flores
    audio.addEventListener("playing", () => {
      // Subir ramo
      setTimeout(() => ramo.classList.add("subir"), 250); // pequeña demora si quieres
      // Crear un ramo de partículas/flores
      crearFloresAnimadas(8);
    }, { once: true });

    // parar justo en STOP_SEC
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime >= STOP_SEC) {
        audio.pause();
        audio.dispatchEvent(new Event("ended"));
      }
    });

    // cuando termina el fragmento -> reproducir video (archivo ya sin audio)
    audio.addEventListener("ended", () => {
      // mostrar video y reproducir
      video.style.display = "block";
      video.play().catch(()=>{/* si autoplay bloqueado, el usuario puede pulsar en play */});
    });
  }

  // Al acabar el video, mostramos el mensaje final
  video.addEventListener("ended", () => {
    mensaje.classList.add("show");
  });

  // Crear pequeñas flores (partículas) que suben desde abajo con posiciones aleatorias
  function crearFloresAnimadas(cantidad = 6) {
    for (let i = 0; i < cantidad; i++) {
      const el = document.createElement("div");
      el.className = "flower";
      // posición horizontal aleatoria
      const left = Math.random() * 80 + 10; // entre 10% y 90%
      el.style.left = left + "%";
      // retrasos y duración: variar la animación con estilos inline
      const delay = Math.random() * 600; // ms
      el.style.animationDelay = delay + "ms";
      el.style.width = (30 + Math.random() * 40) + "px";
      el.style.height = el.style.width;
      floresContainer.appendChild(el);
      // remover después de la animación
      setTimeout(() => { el.remove(); }, 3500 + delay);
    }
  }

  // start button listener
  startBtn.addEventListener("click", startExperience);
});
