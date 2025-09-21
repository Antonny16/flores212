document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startBtn");
    const audio = document.getElementById("miAudio");
    const ramo = document.getElementById("ramo");
    const videoDiv = document.getElementById("videoFinal");
    const video = document.getElementById("miVideo");
    const finalMsg = document.getElementById("finalMsg");

    startBtn.addEventListener("click", () => {
        // Ocultar el botón
        startBtn.style.display = "none";

        // Reproducir la música
        audio.play();

        // Mostrar el ramo después de 1 segundo
        setTimeout(() => {
            ramo.style.display = "block";
            ramo.classList.add("animar-ramo");
        }, 1000);

        // Cuando termine el audio, pasar al video
        audio.addEventListener("ended", () => {
            ramo.style.display = "none";
            videoDiv.style.display = "block";
            video.play();
        });

        // Cuando termine el video, mostrar el mensaje final
        video.addEventListener("ended", () => {
            videoDiv.style.display = "none";
            finalMsg.style.display = "block";
        });
    });
});

