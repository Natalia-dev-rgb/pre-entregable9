// ============================================================
// PRE-ENTREGA 9: Asincronismo y manejo de errores
// Pegá este bloque en tu js/main.js (al final) y adaptá los
// nombres marcados con "ADAPTAR" a los de tu simulador.
// ============================================================

// ---------- 1. TEMPORIZADOR CON setTimeout ----------
// Muestra un consejo del maestro unos segundos después de entrar,
// sin bloquear la interfaz (el usuario puede seguir usando el simulador).

const consejosMaestro = [
  "Practicá la postura base 10 minutos antes de cada entrenamiento.",
  "La paciencia es la técnica más difícil de dominar.",
  "Respirá profundo: la fuerza nace del control, no de la prisa.",
  "Un golpe perfecto vale más que cien apurados.",
];

const mostrarAviso = (mensaje, tipo = "info") => {
  // Usa (o crea) un contenedor de avisos en el DOM
  let contenedor = document.querySelector("#avisos");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "avisos";
    document.body.prepend(contenedor);
  }
  const aviso = document.createElement("p");
  aviso.className = `aviso aviso--${tipo}`;
  aviso.textContent = mensaje;
  contenedor.appendChild(aviso);

  // El aviso desaparece solo a los 6 segundos (otro setTimeout)
  setTimeout(() => aviso.remove(), 6000);
};

const mostrarConsejoDelDia = () => {
  const indice = Math.floor(Math.random() * consejosMaestro.length);
  mostrarAviso(`🥋 Consejo del maestro: ${consejosMaestro[indice]}`, "info");
};

// Se ejecuta 3 segundos después de cargar la página
setTimeout(mostrarConsejoDelDia, 3000);


// ---------- 2. TRY - CATCH - FINALLY ----------
// ADAPTAR: es el submit de tu formulario de "agregar ítem".
// Reemplazá #form-agregar, #nombre, #nivel, "alumnos" y renderizar()
// por lo que uses en tu proyecto.

const formAgregar = document.querySelector("#form-agregar");
const botonAgregar = formAgregar?.querySelector("button[type='submit']");

formAgregar?.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const nombre = document.querySelector("#nombre").value.trim();
    const nivel = parseInt(document.querySelector("#nivel").value);

    // Validaciones: si algo está mal, "lanzamos" un error propio
    if (nombre === "") {
      throw new Error("El nombre no puede estar vacío.");
    }
    if (isNaN(nivel) || nivel < 1 || nivel > 10) {
      throw new Error("El nivel debe ser un número entre 1 y 10.");
    }

    // ADAPTAR: acá va tu lógica real (crear objeto, push al array, guardar, renderizar)
    // alumnos.push(new Alumno(nombre, nivel));
    // localStorage.setItem("alumnos", JSON.stringify(alumnos));
    // renderizar();

    mostrarAviso("✅ Se agregó correctamente.", "ok");
    formAgregar.reset();
  } catch (error) {
    // Se ejecuta SOLO si algo falló dentro del try
    mostrarAviso(`⚠️ No se pudo procesar la operación: ${error.message}`, "error");
  } finally {
    // Se ejecuta SIEMPRE, haya error o no
    if (botonAgregar) botonAgregar.disabled = false;
    document.querySelector("#nombre")?.focus();
    console.log("Operación finalizada (finally)");
  }
});


// ---------- 3. (Opcional) try-catch al leer localStorage ----------
// JSON.parse puede fallar si el dato está corrupto: buen lugar para otro try-catch.
const cargarDatos = (clave) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? [];
  } catch (error) {
    mostrarAviso("⚠️ Los datos guardados estaban dañados, se reiniciaron.", "error");
    return [];
  }
};
