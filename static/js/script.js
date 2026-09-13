/* =========================================================
   ELEMENTOS
========================================================= */

const inicio = document.getElementById("inicio");
const principal = document.getElementById("principal");

const entrar = document.getElementById("entrar");
const volver = document.getElementById("volver");

const cancion1 = document.getElementById("cancion1");
const cancion2 = document.getElementById("cancion2");

const rosa = document.getElementById("rosa");

const fotoV = document.getElementById("fotoV");
const mensajeV = document.getElementById("mensajeV");

const particulas = document.getElementById("particulas");


/* =========================================================
   VOLUMEN
========================================================= */

cancion1.volume = 0.55;
cancion2.volume = 0.55;


/* =========================================================
   ENTRAR A LA SEGUNDA PANTALLA
========================================================= */

entrar.addEventListener("click", function () {

    /* detener canción 1 */

    cancion1.pause();
    cancion1.currentTime = 0;

    /* preparar canción 2 */

    cancion2.currentTime = 0;

    /* animación de salida */

    inicio.classList.add("salida");


    setTimeout(function () {

        /* ocultar inicio */

        inicio.classList.add("oculto");


        /* mostrar segunda pantalla */

        principal.classList.remove("oculto");

        principal.classList.remove("salida");

        principal.classList.add("entrada");


        /* reproducir segunda canción */

        cancion2.play().catch(function () {

            console.log(
                "El navegador necesita interacción para reproducir el audio."
            );

        });


        /* crear partículas */

        crearParticulas();

    }, 650);

});


/* =========================================================
   VOLVER A LA PANTALLA INICIAL
========================================================= */

volver.addEventListener("click", function () {

    /* detener canción 2 */

    cancion2.pause();

    cancion2.currentTime = 0;


    /* preparar canción 1 */

    cancion1.currentTime = 0;


    /* animación de salida */

    principal.classList.add("salida");


    setTimeout(function () {

        /* ocultar segunda pantalla */

        principal.classList.add("oculto");

        principal.classList.remove("entrada");

        principal.classList.remove("salida");


        /* mostrar inicio */

        inicio.classList.remove("oculto");

        inicio.classList.remove("salida");

        inicio.classList.add("entrada-inicio");


        /* reproducir primera canción */

        cancion1.play().catch(function () {

            console.log(
                "Autoplay bloqueado por el navegador."
            );

        });

    }, 650);

});


/* =========================================================
   INTERACCIÓN CON V
========================================================= */

let vActivado = false;


fotoV.addEventListener("click", function () {

    if (!vActivado) {

        mensajeV.textContent =
            "Y sí... como no enmarcar al BIAS 💜";

        fotoV.classList.add("v-click");

        vActivado = true;

    } else {

        mensajeV.textContent =
            "Tenía que estar él.";

        fotoV.classList.remove("v-click");

        vActivado = false;

    }

});


/* =========================================================
   INTERACCIÓN 3D CON LA ROSA
========================================================= */

rosa.addEventListener("mousemove", function (evento) {

    const rect = rosa.getBoundingClientRect();

    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;

    const centroX = rect.width / 2;
    const centroY = rect.height / 2;

    const rotacionY = (x - centroX) / 18;
    const rotacionX = -(y - centroY) / 18;


    rosa.style.transform =
        `rotateX(${rotacionX}deg)
         rotateY(${rotacionY}deg)
         scale(1.04)`;

});


rosa.addEventListener("mouseleave", function () {

    rosa.style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";

});


/* =========================================================
   PARTÍCULAS
========================================================= */

function crearParticulas() {

    particulas.innerHTML = "";

    const cantidad = 35;


    for (let i = 0; i < cantidad; i++) {

        const particula =
            document.createElement("div");

        particula.className = "particula";


        const simbolos = [
            "✦",
            "✧",
            "♡",
            "💜",
            "•"
        ];


        particula.textContent =
            simbolos[
                Math.floor(
                    Math.random() * simbolos.length
                )
            ];


        particula.style.left =
            Math.random() * 100 + "%";


        particula.style.animationDuration =
            (5 + Math.random() * 8) + "s";


        particula.style.animationDelay =
            Math.random() * 5 + "s";


        particula.style.fontSize =
            (8 + Math.random() * 12) + "px";


        particulas.appendChild(particula);

    }

}


/* =========================================================
   AUTOPLAY
========================================================= */

window.addEventListener("load", function () {

    /* Crear partículas desde el inicio */
    crearParticulas();


    /* Intentar reproducir la primera canción */

    cancion1.play().catch(function () {

        console.log(
            "Autoplay bloqueado por el navegador."
        );

    });

});